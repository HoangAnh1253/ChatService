import React, { useEffect } from 'react';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useRoutes } from 'react-router-dom';
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
import TopicService from '../../Services/TopicService';

const TopicModal = (props) => {
  const { openModal, handleCloseModal, handleSubmit, listItem, index, name, setName } = props;
  const [error, setError] = React.useState({});
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const handleNameChange = (e) => setName(e.target.value);

  const onSubmit = (_) => {
    if (index !== -1) {
      TopicService.patch(
        name,
        listItem[index].id,
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
    TopicService.create(
      name,
      (response) => {
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
    setError({});
    setShowSuccessAlert(false);
  }, [openModal]);

  function clearText() {
    setName('');
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
          <Typography sx={labelStyle}> Name </Typography>
          <TextField
            placeholder="Name"
            variant="outlined"
            size="small"
            name="name"
            fullWidth
            required
            autoFocus
            helperText={'name' in error ? error.name : ''}
            error={'name' in error}
            onChange={handleNameChange}
            value={name}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="contained" color="info" sx={signUpButtonStyle} onClick={handleCloseModal} disableElevation>
              Close
            </Button>
            <Button variant="contained" color="primary" sx={signUpButtonStyle} onClick={onSubmit} disableElevation>
              {index !== -1 ? 'Update exam' : 'Create exam'}
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

export default TopicModal;
