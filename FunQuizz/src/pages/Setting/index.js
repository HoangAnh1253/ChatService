import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import React from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UserContext from '~/Context/UserContext';
import axios from 'axios';
import UserService from '~/Services/UserService';
import CredentialService from '~/Services/CredentialService';

const Setting = () => {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState('');
    const { user } = React.useContext(UserContext);
    const [settingList, setSettingList] = React.useState([]);
    const [modal, setModal] = React.useState('Set username');
    const [saveValue, setSaveValue] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);

    const handleOpen = React.useCallback(
        (modalText, modalType) => () => {
            setOpen(true);
            setModal(modalText);
            setType(modalType);
        },
        [],
    );

    const handleChangeForm = (event) => {
        setSaveValue(event.target.value);
    };

    const handleSave = () => {
        UserService.update(
            type,
            saveValue,
            (response) => {
                let data = response.data.data;
                setSaveValue(data[type]);
                console.log(data);
                setShowAlert(true);
            },
            (error) => {
                console.log(error);
            },
        );
    };

    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        setSettingList([
            {
                name: 'email',
                description: user.email,
                modalText: 'Enter email',
                codeName: 'email',
            },
            {
                name: 'first name',
                description: user.firstName || 'empty',
                modalText: 'Set First Name',
                codeName: 'firstname',
            },
            {
                name: 'last name',
                description: user.lastName || 'empty',
                modalText: 'Set Last Name',
                codeName: 'lastname',
            },
            {
                name: 'password',
                description: 'Change password',
                modalText: 'Enter password',
                codeName: 'password',
            },
        ]);
    }, [user]);

    return (
        <Box sx={settingContainer}>
            <Typography variant="h5">Settings</Typography>

            {showAlert && (
                <Alert
                    severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setShowAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ my: 2 }}
                >
                    Your info has been updated!
                </Alert>
            )}
            <Card sx={{ width: '500px', boxShadow: 1 }}>
                <CardContent>
                    <React.Fragment>
                        <Typography component="div" sx={{ fontSize: 14 }} color="text.secondary">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ManageAccountsIcon color="warning" sx={{ fontSize: 18, mr: 1 }} />
                                <Box sx={{ fontSize: 16, fontWeight: 400, mr: 1 }}>Profile</Box>
                            </Box>
                        </Typography>
                        {settingList.map((setting, index) => (
                            <Box
                                onClick={index != 0 ? handleOpen(setting.modalText, setting.codeName) : undefined}
                                sx={settingItem}
                                key={setting.name}
                            >
                                <Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: 16, textTransform: 'capitalize' }}>
                                        {setting.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        {setting.description}
                                    </Typography>
                                </Box>
                                {index != 0 && <ChevronRightIcon sx={{ color: '#9d9da4' }} fontSize="small" />}
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
                                    onChange={handleChangeForm}
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
                                    <Button variant="contained" onClick={handleSave}>
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                    </React.Fragment>
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
