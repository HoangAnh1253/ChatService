import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalStorageService from '~/Services/LocalStorageService';
import LoginModalContext from '~/Context/LoginModalContext';
import { UserRole } from '~/Enums/UserRole';
import UserContext from '~/Context/UserContext';
import SocketContext from '~/Context/SocketContext';

// const socket = io.connect('http://acme.com');
// console.log(socket)




const WaitRoom = () => {
    const { user, setUser } = React.useContext(UserContext);
    const socketService = React.useContext(SocketContext);

    const { setOpenSignInModal } = React.useContext(LoginModalContext);
    const [roomId, setRoomId] = React.useState('');
    const navigate = useNavigate();
    const params = useParams();
    const userRole = params.userRole;
    const paramId = params.id; // be careful of this paramId (it can be examId or roomId) hehe (kinda dirty but work)


    React.useEffect(() => {
        if (paramId === null) {
            socketService.disconnect()
            navigate('/');
            setOpenSignInModal(true);
            return;
        }
        
        if(!socketService.isConnected())
        {
            socketService.reconnect()
        }
   
        
            switch (userRole) {
                case UserRole.GUEST:
                    socketService.joinRoom(paramId)
                    break;
                case UserRole.HOST:
                    socketService.createRoom(paramId);
                    break;
            }

        // return socketService.disconnect;
    }, []);

    const handleReturnHome = ()=>{
        socketService.disconnect()
        navigate('/');
    }
    return (
        <React.Fragment>
            <Button startIcon={<ArrowBackIosIcon />} sx={{ my: 2, textTransform: 'none' }} onClick={handleReturnHome}>
                Home
            </Button>
            <Typography>
                {user.email} is {userRole} of room: {roomId}
            </Typography>
        </React.Fragment>
    );
};

export default WaitRoom;
