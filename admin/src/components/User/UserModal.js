import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';

import CredentialService from '../../Services/CredentialService';
import UserService from '../../Services/UserService';

const UserModal = (props) => {
  const { openModal, handleCloseModal, handleSubmit, selectedUser, listUser } = props;
  const PASSWORD_NOT_MATCH = { confirmPassword: "Password doesn't match" };
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState({});
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const isFormNotValid = () => email === '' || password === '' || confirmPassword === '' || 'confirmPassword' in error;

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPass();
  };

  const onSubmit = (_) => {
    console.log({ selectedUser });
    if (selectedUser !== -1) {
      UserService.update(
        selectedUser,
        email,
        firstName,
        lastName,
        (response) => {
          setShowSuccessAlert(true);
          handleSubmit();
        },
        (error) => {
          console.log(error.response);
          setError(error.response.data);
        }
      );
      return;
    }
    CredentialService.register(
      email,
      firstName,
      lastName,
      password,
      (response) => {
        clearText();
        setShowSuccessAlert(true);
        handleSubmit();
      },
      (error) => {
        console.log(error.response);
        setError(error.response.data);
      }
    );
  };

  useEffect(() => {
    checkPass();
  }, [password, confirmPassword]);

  useEffect(() => {
    setError({});
    setShowSuccessAlert(false);
    if (selectedUser !== -1) {
      const user = listUser.find((element) => element.id === selectedUser);
      console.log('set states');
      if (user.firstName !== null) {
        setFirstName(user.firstName);
      }
      if (user.lastName !== null) {
        setLastName(user.lastName);
      }
      if (user.email !== null) {
        setEmail(user.email);
      }
      return;
    }
    clearText();
  }, [openModal]);

  const checkPass = () => {
    if (confirmPassword !== password) {
      setError(PASSWORD_NOT_MATCH);
    } else {
      setError({});
    }
  };

  function clearText() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Box component="form" sx={containerStyle}>
          {showSuccessAlert && (
            <Alert severity="success" color="info" sx={{ mb: 2 }}>
              Success
            </Alert>
          )}
          <Typography variant="h3">{selectedUser === -1 ? 'Create user' : 'Update user'}</Typography>
          <Typography sx={labelStyle}> Firstname </Typography>
          <TextField
            variant="outlined"
            size="small"
            name="firstname"
            fullWidth
            autoFocus
            onChange={handleFirstNameChange}
            value={firstName}
          />

          <Typography sx={labelStyle}> Lastname </Typography>
          <TextField
            variant="outlined"
            size="small"
            name="lastname"
            fullWidth
            autoFocus
            onChange={handleLastNameChange}
            value={lastName}
          />
          <Typography sx={labelStyle}> Email </Typography>
          <TextField
            variant="outlined"
            size="small"
            name="email"
            fullWidth
            required
            autoFocus
            helperText={'email' in error ? error.email : ''}
            error={'email' in error}
            onChange={handleEmailChange}
            value={email}
          />
          {selectedUser === -1 && (
            <>
              <Typography sx={labelStyle}> Password </Typography>
              <TextField
                variant="outlined"
                size="small"
                type="password"
                name="password"
                fullWidth
                required
                autoFocus
                onChange={handlePasswordChange}
              />

              <Typography sx={labelStyle} marginTop={2}>
                Confirm password
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                type="password"
                fullWidth
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                helperText={'confirmPassword' in error ? error.confirmPassword : ''}
                error={'confirmPassword' in error}
              />
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="contained" color="info" sx={signUpButtonStyle} onClick={handleCloseModal} disableElevation>
              Close
            </Button>
            <Button variant="contained" color="primary" sx={signUpButtonStyle} onClick={onSubmit} disableElevation>
              {selectedUser !== -1 ? 'Update user' : 'Create user'}
            </Button>
          </Box>
        </Box>
      </Fade>
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
  width: '100%',
};

const signUpButtonStyle = {
  color: '#FFFFFF',
  p: 1,
  marginTop: 3,
};

export default UserModal;
