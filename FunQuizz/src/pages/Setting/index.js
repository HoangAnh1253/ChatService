import { Button, Card, CardActions, CardContent, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const Setting = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h5">Settings</Typography>
            <Card sx={{ width: '500px', boxShadow: 1 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ManageAccountsIcon color="warning" sx={{ fontSize: 18, mr: 1 }} />
                            <Box sx={{ fontSize: 16, fontWeight: 400, mr: 1 }}>Profile</Box>
                        </Box>
                    </Typography>
                    <Box
                        onClick={handleOpen}
                        sx={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between', mt: 2 }}
                    >
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: 16 }}>
                                Username
                            </Typography>
                            <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                                tomorrow
                            </Typography>
                        </Box>
                        <ChevronRightIcon sx={{ color: '#9d9da4' }} fontSize="small" />
                    </Box>

                    <Box
                        onClick={handleOpen}
                        sx={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between', mt: 0.7 }}
                    >
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: 16 }}>
                                Name
                            </Typography>
                            <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                                tomorrow
                            </Typography>
                        </Box>
                        <ChevronRightIcon sx={{ color: '#9d9da4' }} fontSize="small" />
                    </Box>

                    <Box
                        onClick={handleOpen}
                        sx={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between', mt: 0.7 }}
                    >
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: 16 }}>
                                Grade
                            </Typography>
                            <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                                tomorrow
                            </Typography>
                        </Box>
                        <ChevronRightIcon sx={{ color: '#9d9da4' }} fontSize="small" />
                    </Box>

                    <Modal open={open} onClose={handleClose}>
                        <Box sx={style}>
                            <Typography
                                id="modal-modal-title"
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                component="h2"
                            >
                                Pick a username that's fun and unique!
                            </Typography>
                            <TextField
                                sx={{ my: 2 }}
                                variant="outlined"
                                fullWidth
                                inputProps={{
                                    style: {
                                        padding: '10px 8px',
                                    },
                                }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                                <Button sx={{ mr: 2 }} onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="contained">Save</Button>
                            </Box>
                        </Box>
                    </Modal>
                </CardContent>
            </Card>
        </Box>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: 2,
    px: 4,
    py: 2,
};

export default Setting;
