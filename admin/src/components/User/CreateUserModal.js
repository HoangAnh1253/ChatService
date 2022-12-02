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

// import LockOpenIcon from '@mui/icons-material/LockOpen';
import Avatar from '@mui/material/Avatar';
import CredentialService from '../../Services/CredentialService';

const CreateUserModal = (props) => {
  const { openModal, handleCloseModal, handleSubmit } = props;
  const PASSWORD_NOT_MATCH = { confirmPassword: "Password doesn't match" };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState({});
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const isFormNotValid = () => email === '' || password === '' || confirmPassword === '' || 'confirmPassword' in error;

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPass();
  };

  const onSubmit = (_) => {
    CredentialService.register(
      email,
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
    clearText();
    setError({});
    setShowSuccessAlert(false);
  }, [openModal]);

  const checkPass = () => {
    if (confirmPassword !== password) {
      setError(PASSWORD_NOT_MATCH);
    } else {
      setError({});
    }
  };

  function clearText() {
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
              Your account has been created!
            </Alert>
          )}
          <Typography sx={labelStyle}> Email </Typography>
          <TextField
            placeholder="Email"
            variant="outlined"
            size="small"
            name="email"
            fullWidth
            required
            autoFocus
            helperText={'email' in error ? error.email : ''}
            error={'email' in error}
            onChange={handleEmailChange}
          />

          <Typography sx={labelStyle}> Password </Typography>
          <TextField
            placeholder="Ex: Nlh0@ng4nH"
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

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="contained" color="info" sx={signUpButtonStyle} onClick={handleCloseModal} disableElevation>
              Close
            </Button>
            <Button variant="contained" color="primary" sx={signUpButtonStyle} onClick={onSubmit} disableElevation>
              Create user
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

export default CreateUserModal;
