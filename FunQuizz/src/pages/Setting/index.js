import { Button, Card, CardActions, CardContent, Modal, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const Setting = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = useCallback(
        (modalText) => () => {
            setOpen(true);
            setModal(modalText);
        },
        [],
    );

    const handleClose = () => setOpen(false);
    const [modal, setModal] = React.useState('Set username');
    const [settingList, setSettingList] = React.useState([
        {
            name: 'username',
            description: 'nlhoanganh',
            modalText: "Pick a username that's fun and unique!",
        },
        {
            name: 'email',
            description: 'nlhoanganh@gmail.com',
            modalText: 'Enter email',
        },
        {
            name: 'password',
            description: 'Change password',
            modalText: 'Enter password',
        },
    ]);
    return (
        <Box sx={settingContainer}>
            <Typography variant="h5">Settings</Typography>
            <Card sx={{ width: '500px', boxShadow: 1 }}>
                <CardContent>
                    <>
                        <Typography component="div" sx={{ fontSize: 14 }} color="text.secondary">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ManageAccountsIcon color="warning" sx={{ fontSize: 18, mr: 1 }} />
                                <Box sx={{ fontSize: 16, fontWeight: 400, mr: 1 }}>Profile</Box>
                            </Box>
                        </Typography>
                        {settingList.map((setting) => (
                            <Box onClick={handleOpen(setting.modalText)} sx={settingItem} key={setting.name}>
                                <Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: 16, textTransform: 'capitalize' }}>
                                        {setting.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        {setting.description}
                                    </Typography>
                                </Box>
                                <ChevronRightIcon sx={{ color: '#9d9da4' }} fontSize="small" />
                            </Box>
                        ))}

                        <Modal open={open} onClose={handleClose}>
                            <Box sx={style}>
                                <Typography id="modal-modal-title" sx={{ fontSize: 14 }} color="text.secondary">
                                    {modal}
                                </Typography>
                                <TextField
                                    sx={{ my: 2, mb: 2 }}
                                    variant="outlined"
                                    fullWidth
                                    inputProps={{
                                        style: {
                                            padding: '10px 8px',
                                        },
                                    }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Button sx={{ mr: 2 }} onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained">Save</Button>
                                </Box>
                            </Box>
                        </Modal>
                    </>
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

const settingItem = {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'space-between',
    mt: 2,
};

const settingContainer = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
};

export default Setting;
