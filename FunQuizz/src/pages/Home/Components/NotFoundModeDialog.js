import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SocketContext from '~/Context/SocketContext';

const NotFoundModeDialog = (props) => {
  

    const { open, handleClose, roomId } = props;
    const navigate = useNavigate();
    const socketService = React.useContext(SocketContext);

    const navigateMultiPlayersRoom = (mode) => {
        navigate(`/quiz/wait-room/host/${roomId}`, { state: { mode } });
    };

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle textAlign="center" color="text.secondary">
                Choose mode
            </DialogTitle>
            <DialogContent>
                <Button
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                    fullWidth
                    color="warning"
           
                >
                    Room not found
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default NotFoundModeDialog;
