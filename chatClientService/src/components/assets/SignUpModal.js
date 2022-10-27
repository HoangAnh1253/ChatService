import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

const SignUpModal = (props) => {
    const { openSignUpModal, handleCloseSignUpModal,handleOpenSignInModal } = props;

    return (
        <Modal open={openSignUpModal} onClose={handleCloseSignUpModal}>
            <Box sx={containerStyle}>
                <Avatar sx={avatarStyle}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={signinStyle}>
                    Sign up
                </Typography>
                <img src={process.env.PUBLIC_URL + '/banner_form.png'} width="100%" />

                <Typography sx={labelStyle}> Email </Typography>
                <TextField
                    placeholder="Email Address"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    name="email"
                    required
                    autoFocus
                />

                <Typography sx={labelStyle} marginTop={2}>
                    Full name
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    name="fullname"
                    placeholder="Full name"
                    required
                />

                <Typography sx={labelStyle} marginTop={2}>
                    Password
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    fullWidth={true}
                    name="password"
                    placeholder="Password"
                />

                <Button variant="contained" fullWidth={true} color="primary" sx={signUpButtonStyle} disableElevation>
                    Sign Up
                </Button>

                <Divider style={{ width: '100%' }} />

                <Grid container direction="row" justifyContent="center" alignItems="center" marginTop={4}>
                    <Typography sx={noAccountTextStyle}>Already have an account?</Typography>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ marginLeft: 2 }}
                        disableElevation
                        onClick={() => {
                            handleCloseSignUpModal();
                            handleOpenSignInModal();
                        }}
                    >
                        Sign in
                    </Button>
                </Grid>
            </Box>
        </Modal>
    );
};

const containerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    border: '1px solid #F6F6F6',
    borderRadius: 2,
    boxShadow: 5,
    p: 4,
    paddingX: 10,
};

const labelStyle = {
    color: '#6d6d6d',
    fontSize: 13,
    fontWeight: 600,
    mb: '2px',
};

const noAccountTextStyle = {
    color: '#6d6d6d',
    fontSize: 14,
};

const signUpButtonStyle = {
    color: '#FFFFFF',
    p: 1,
    marginTop: 3,
};

const avatarStyle = {
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
};

const signinStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
};

export default SignUpModal;
