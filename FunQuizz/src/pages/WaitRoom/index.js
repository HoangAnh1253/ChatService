import React from 'react';
import { Box, Button, Card, Grid, Paper, Typography } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalStorageService from '~/Services/LocalStorageService';
import LoginModalContext from '~/Context/LoginModalContext';
import { UserRole } from '~/Enums/UserRole';
import SocketContext from '~/Context/SocketContext';
import { ListenType } from '~/Enums/ListenType';
import UserService from '~/Services/UserService';

const WaitRoom = () => {
    const socketService = React.useContext(SocketContext);

    const { setOpenSignInModal } = React.useContext(LoginModalContext);
    const [roomId, setRoomId] = React.useState('');
    const navigate = useNavigate();
    const params = useParams();
    const userRole = params.userRole;
    const paramId = params.id; // be careful of this paramId (it can be examId or roomId) hehe (kinda dirty but work)
    const { email } = LocalStorageService.get();

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
        socketService.socket.on(ListenType.START_EXAM_SUCCESS, (timestamp) => {
            console.log("first timestamp: ", timestamp);
            navigate('/examRoom', {
                state: {
                    timestamp: timestamp.startTime,
                }
            });
        });
    }, []);

    const handleStartQuiz = () => {
        socketService.startExam();
    };

    const handleReturnHome = () => {
        socketService.disconnect();
        navigate('/');
    };
    return (
        <React.Fragment>
            <Button startIcon={<ArrowBackIosIcon />} sx={{ m: 2, textTransform: 'none' }} onClick={handleReturnHome}>
                Home
            </Button>
            <Box px={2}>
                <Typography>
                    {socketService.currentEmail} is {userRole} of room: {roomId}
                </Typography>
                {userRole === UserRole.GUEST && <Typography>Waiting host to start</Typography>}

                {userRole === UserRole.HOST && (
                    <Button variant="contained" disableElevation onClick={handleStartQuiz}>
                        Start
                    </Button>
                )}
            </Box>
            <Paper sx={{ width: '50%', mx: 'auto', p: 1, mt: 1 }}>
                <Typography variant="h5" fontSize={20} p={2} color="#F49D1A" fontWeight="bold" align="center">
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
