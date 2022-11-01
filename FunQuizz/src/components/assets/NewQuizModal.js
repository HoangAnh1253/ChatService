/* Created by Hau Nguyen */

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import { styled, alpha } from '@mui/material';

const NewQuizModal = (props) => {
    const {open, setOpen} = props;

    const [name, setName] = React.useState('');
    const lengthNameMax = 64;
    const [tags, setTags] = React.useState([
        'Mathematics',
        'English',
        'World Languages',
        'Science',
        'Physics',
        'Chemistry',
        'Biology',
        'Social',
        'Studies',
        'Geography',
        'History',
        'Arts',
        'Computers',
        'Physical Ed',
        'Fun',
        'Professional',
        'Development',
        'Architecture',
        'Business',
        'Design',
        'Education',
        'Instructional Technology',
        'Journalism',
        'Life Skills',
        'Moral',
        'Science',
        'Philosophy',
        'Performing Arts',
        'Religious Studies',
        'Special Education',
        'Specialty',
        'Other',
    ]);

    const [chooseTags, setChooseTags] = React.useState([]);

    const removeTag = (beTag) => {
        var tagsCopy = [...chooseTags];
        var tagsCopy1 = tagsCopy.filter((tag) => {
            return tag !== beTag;
        });
        setChooseTags(tagsCopy1);
    };

    const addTag = (beTag) => {
        var tagsCopy = [...chooseTags];
        tagsCopy.push(beTag);
        setChooseTags(tagsCopy);
    };

    const handleClickTag = (beTag) => {
        var check = false;
        chooseTags.map((tag) => {
            if (tag === beTag) {
                removeTag(beTag);
                check = true;
            }
        });
        if (!check) addTag(beTag);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                alignItems: 'center',
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ width: 40, height: 40 }}
                                alt="Tom&Jerry"
                                src="https://toigingiuvedep.vn/wp-content/uploads/2021/11/hinh-anh-jerry-hinh-anh-tom-and-jerry-ngo-nghinh-dang-yeu-nhat-1.jpg"
                            />
                            <Stack>
                                <Tittle id="transition-modal-title" component="h6" variant="inherit">
                                    Create a quiz
                                </Tittle>
                                <Description id="transition-modal-description" variant="caption">
                                    Great for training and engagement activities
                                </Description>
                            </Stack>
                        </Stack>

                        <SubTittle id="transition-modal-description" variant="caption">
                            1. Name this quiz
                        </SubTittle>
                        <TextField
                            label={
                                <Typography variant="subtitle2" component="p">
                                    Enter a quiz name
                                </Typography>
                            }
                            id="outlined-start-adornment"
                            size="small"
                            value={name}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">{`${name.length}/${lengthNameMax}`}</InputAdornment>
                                ),
                            }}
                            onChange={(e) => setName(e.target.value)}
                            inputProps={{ maxLength: `${lengthNameMax}`, style: { fontSize: 15 } }}
                            sx={{
                                width: '100%',
                                mt: 1,
                                mb: 2,
                                fontSize: '10px',
                            }}
                        ></TextField>
                        <SubTittle id="transition-modal-description" variant="caption">
                            2. Choose relevant subjects
                        </SubTittle>
                        {chooseTags.length >= 3 ? (
                            <MDTypography id="transition-modal-description" variant="caption" sx={{ ml: 2 }}>
                                Maximum 3 subjects
                            </MDTypography>
                        ) : (
                            ''
                        )}

                        <Stack direction={'row'} sx={{ display: 'inherit', mb: 3}}>
                            {tags.map((tag, index) => {
                                var disabled = false;
                                if (chooseTags.length === 3 && !chooseTags.includes(tag)) disabled = true;
                                return (
                                    <Checkbox
                                        key={index}
                                        value={tag}
                                        icon={<Chip label={tag} size="small" />}
                                        checkedIcon={<Chip label={tag} color="primary" size="small" />}
                                        sx={{ padding: 0.5 }}
                                        onClick={(e) => handleClickTag(e.target.value)}
                                        disabled={disabled}
                                    />
                                );
                            })}
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ justifyContent: 'right' }}>
                            <MDButton size={'small'} onClick={() => setOpen(false)}>
                                Cancel
                            </MDButton>
                            <Button
                                size={'small'}
                                color={'primary'}
                                variant="contained"
                                sx={{ textTransform: 'none' }}
                            >
                                Next
                            </Button>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: 2.5,
};

const Tittle = styled(Typography)(() => ({
    fontFamily: 'Open Sans, sans-serif, Helvetica, Arial, Symbola',
    fontSize: '18px',
    fontWeight: '600px',
}));

const Description = styled(Typography)(() => ({
    color: '#6D6D6D',
}));

const SubTittle = styled(Typography)(() => ({
    fontSize: '12px',
    color: '#6D6D6D',
    fontFamily: 'Open Sans, sans-serif, Helvetica, Arial, Symbola',
    fontWeight: 500,
}));

const MDTypography = styled(Typography)(() => ({
    fontSize: '12px',
    color: 'red',
    fontFamily: 'Open Sans, sans-serif, Helvetica, Arial, Symbola',
    fontWeight: 500,
}));

const MDButton = styled(Button)(() => ({
    fontSize: '14px',
    color: '#222222',
    background: '#0909090D',
    borderColor: 'none',
    fontFamily: 'Open Sans, sans-serif, Helvetica, Arial, Symbola',
    textTransform: 'none',
}));

export default NewQuizModal;
