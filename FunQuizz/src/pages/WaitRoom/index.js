import React from 'react';
import { Box, Button, Card, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalStorageService from '~/Services/LocalStorageService';
import LoginModalContext from '~/Context/LoginModalContext';
import { UserRole } from '~/Enums/UserRole';
import SocketContext from '~/Context/SocketContext';
import { ListenType } from '~/Enums/ListenType';
import KeyIcon from '@mui/icons-material/Key';
import { useLocation } from 'react-router-dom';

const WaitRoom = () => {
    const socketService = React.useContext(SocketContext);
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const userRole = params.userRole;
    const mode = location.state.mode;
    const paramId = params.id; // be careful of this paramId (it can be examId or roomId) hehe (kinda dirty but work)
    const { email } = LocalStorageService.get();

    const { setOpenSignInModal } = React.useContext(LoginModalContext);

    const [usersInRoom, setUsersInRoom] = React.useState([]);

    React.useEffect(() => {
        if (paramId === null) {
            socketService.disconnect();
            navigate('/');
            setOpenSignInModal(true);
            return;
        }

        switch (userRole) {
            case UserRole.GUEST:
                socketService.joinRoom(paramId);
                break;
            case UserRole.HOST:
                socketService.createRoom(paramId);
                break;
        }
    }, []);

    React.useEffect(() => {
        socketService.socket.on(ListenType.SERVER_UPDATE_USER, ({ room, users }) => {
            socketService.roomMembers = users;
            setUsersInRoom(users);

            console.log('user in room: ', users);
        });
    }, []);

    React.useEffect(() => {
        if (!socketService.isConnected()) {
            socketService.reconnect();
        }
    }, []);

    React.useEffect(() => {
        socketService.socket.on(ListenType.START_EXAM_SUCCESS, (examState) => {
            console.log('first timestamp: ', examState);
            navigate('/examRoom', {
                state: {
                    mode: examState.mode,
                    timestamp: examState.startTime,
                },
            });
        });
    }, []);

    const handleStartQuiz = () => {
        socketService.startExam(mode);
    };

    const handleBackToPrevPage = () => {
        socketService.disconnect();
        navigate(-1);
    };
    return (
        <React.Fragment>
            <Button
                startIcon={<ArrowBackIosIcon />}
                sx={{ m: 2, textTransform: 'none' }}
                onClick={handleBackToPrevPage}
            >
                {userRole === UserRole.HOST ? 'Exam detail' : 'Home'}
            </Button>

            <Paper sx={{ width: '50%', mx: 'auto', p: 1, mb: 2 }} variant="outlined">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        {userRole === UserRole.HOST && (
                            <Box
                                sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 1, display: 'inline-flex' }}
                                component="span"
                            >
                                <KeyIcon sx={{ color: 'white' }} fontSize="small" />
                            </Box>
                        )}

                        <Typography component="span" variant="h5" fontSize={20} p={1} fontWeight="bold">
                            Room ID:
                        </Typography>
                        <Typography component="span">
                            {userRole === UserRole.HOST ? socketService.roomId : paramId}
                        </Typography>
                    </Box>
                    {userRole === UserRole.HOST && (
                        <Button
                            endIcon={<ArrowForwardIosIcon />}
                            variant="outlined"
                            disableElevation
                            sx={{ textTransform: 'none' }}
                            onClick={handleStartQuiz}
                        >
                            Start
                        </Button>
                    )}
                    {userRole === UserRole.GUEST && (
                        <Typography variant="caption" fontStyle="italic" color="primary.main">
                            Waiting host to start
                        </Typography>
                    )}
                </Stack>
            </Paper>
            <Paper sx={{ width: '50%', mx: 'auto', p: 1, mt: 1 }}>
                <Typography
                    variant="h5"
                    fontSize={20}
                    p={2}
                    color="primary"
                    fontWeight="bold"
                    align="center"
                    sx={{ textDecoration: 'underline' }}
                >
                    Members
                </Typography>
                <Box sx={{ mt: 2, px: 1 }}>
                    {usersInRoom.map((user) => (
                        <Box
                            width={1}
                            mb={1}
                            p={1}
                            bgcolor={user.username === email ? '#F1F1F1' : 'transparent'}
                            borderRadius={2}
                            border={user.username === email ? '1px solid grey' : ''}
                        >
                            <Grid container justifyContent="center" alignItems="center">
                                <Typography
                                    variant="h5"
                                    fontSize={20}
                                    p={2}
                                    color="black"
                                    fontWeight={email === user.username ? 'bold' : ''}
                                >
                                    {user.username}
                                </Typography>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </React.Fragment>
    );
};

const cardStyle = {
    minWidth: 400,
    borderRadius: 4,
    boxShadow: 'rgba(33, 35, 38, 0.1) 10px 10px 10px 0px;',
};

export default WaitRoom;
