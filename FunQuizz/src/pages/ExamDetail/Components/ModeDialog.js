import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModeDialog = (props) => {
    const MODE = {
        NORMAL: 'normal',
        CHALLENGE: 'challenge',
    };

    const { open, handleClose, roomId } = props;
    const navigate = useNavigate();

    const navigateMultiPlayersRoom = (mode) => {
        navigate(`/quiz/wait-room/host/${roomId}`, { state: { mode } });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle textAlign="center" color="text.secondary">
                Choose mode
            </DialogTitle>
            <DialogContent>
                <Button
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                    fullWidth
                    onClick={() => navigateMultiPlayersRoom(MODE.NORMAL)}
                >
                    Single player
                </Button>
                <Button
                    variant="contained"
                    sx={{ textTransform: 'none', mt: 1 }}
                    fullWidth
                    onClick={() => navigateMultiPlayersRoom(MODE.CHALLENGE)}
                >
                    Multiplayers
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ModeDialog;
