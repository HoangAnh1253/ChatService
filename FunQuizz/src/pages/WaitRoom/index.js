import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalStorageService from '~/Services/LocalStorageService';
import LoginModalContext from '~/Context/LoginModalContext';
// import io from 'socket.io-client';
import { UserRole } from '~/Enums/UserRole';
import { EmitType } from '~/Enums/EmitType';
import { ListenType } from '~/Enums/ListenType';
import UserContext from '~/Context/UserContext';
import SocketService from '~/Services/SocketService';

// const socket = io.connect('http://acme.com');
// console.log(socket)




const WaitRoom = () => {
    const { user, setUser } = React.useContext(UserContext);
   

    const { setOpenSignInModal } = React.useContext(LoginModalContext);
    const [roomId, setRoomId] = React.useState('');
    const navigate = useNavigate();
    const params = useParams();
    const userRole = params.userRole;
    const paramId = params.id; // be careful of this paramId (it can be examId or roomId) hehe (kinda dirty but work)

    // socket.on(ListenType.SERVER_UPDATE_USER, ({ room, users }) => {
    //     console.log(`room: ${room} has users:`);
    //     console.log(users);
    // });

    React.useEffect(() => {
        if (paramId === null) {
            navigate('/');
            setOpenSignInModal(true);
            return;
        }
        

        //User join room success
        const socketService = new SocketService(user);
        socketService.connectToSocket()
        
        switch (userRole) {
            case UserRole.GUEST:
                socketService.joinRoom(paramId)
                // socket.emit(EmitType.JOIN_ROOM, { email: user.email, roomId: paramId });
                // setRoomId(paramId);
                break;
            case UserRole.HOST:
                socketService.createRoom(paramId)
                // socket.emit(EmitType.CREATE_ROOM, { email: user.email, examId: paramId });
                // socket.on(ListenType.CREATE_ROOM_SUCCESS, (message) => {
                //     setRoomId(message.roomId);
                //     socket.emit(EmitType.JOIN_ROOM, { email: user.email, roomId: message.roomId });
                // });
                break;
        }

        return socketService.disconnect();
    }, []);

    
    return (
        <React.Fragment>
            <Button startIcon={<ArrowBackIosIcon />} sx={{ my: 2, textTransform: 'none' }} component={Link} to="/">
                Home
            </Button>
            <Typography>
                {user.email} is {userRole} of room: {roomId}
            </Typography>
        </React.Fragment>
    );
};

export default WaitRoom;
