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
import ExamService from '../../Services/ExamService';

const ExamModal = (props) => {
  const { openModal, handleCloseModal, handleSubmit, topics, users, isEdit, listItem, index } = props;

  const [name, setName] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [error, setError] = React.useState({});
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleTopicChange = (e) => setTopic(e.target.value);
  const isFormNotValid = () => name === '' || author === '' || topic === '';

  const onSubmit = (_) => {
    if (isEdit) {
      ExamService.patch(
        name,
        author,
        topic,
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
    ExamService.create(
      name,
      author,
      topic,
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

  //   useEffect(() => {
  //     if (isEdit) {
  //       console.log({ isEdit });
  //       console.log('asasd');
  //       setName(listItem[index].name);
  //       setAuthor(listItem[index].authorEmail);
  //       setTopic(listItem[index].topic);
  //     }
  //     console.log('not selected');
  //   }, [isEdit]);

  useEffect(() => {
    clearText();
    setError({});
    setShowSuccessAlert(false);
    if (isEdit) {
      console.log({ isEdit });
      console.log('asasd');
      setName(listItem[index].name);
      setAuthor(listItem[index].authorEmail);
      setTopic(listItem[index].topic);
    }
    console.log(isEdit);
  }, [openModal]);

  function clearText() {
    setName('');
    setAuthor('');
    setTopic('');
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
          />
          <FormControl fullWidth>
            <Typography sx={labelStyle}> Author </Typography>
            <Select
              labelId="form-select"
              id="demo-simple-select"
              value={author}
              label="Name"
              onChange={handleAuthorChange}
              defaultValue=""
            >
              {users.map((user) => (
                <MenuItem value={user.email} key={user.email}>
                  {user.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Typography sx={labelStyle}> Topic </Typography>
            <Select
              labelId="form-select"
              id="demo-simple-select2"
              value={topic}
              label="Name"
              onChange={handleTopicChange}
              defaultValue=""
            >
              {topics.map((topic) => (
                <MenuItem value={topic.id} key={topic.id}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="contained" color="info" sx={signUpButtonStyle} onClick={handleCloseModal} disableElevation>
              Close
            </Button>
            <Button variant="contained" color="primary" sx={signUpButtonStyle} onClick={onSubmit} disableElevation>
              Create exam
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

export default ExamModal;
