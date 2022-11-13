import React from 'react';
import ExamService from '~/Services/ExamService';
import LocalStorageService from '~/Services/LocalStorageService';
import LoginModalContext from '~/Context/LoginModalContext';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import JsonHelper from '~/Helpers/JsonHelper';

const OwningExams = () => {
    const navigate = useNavigate();
    const { id, email } = LocalStorageService.get();
    const { setOpenSignInModal } = React.useContext(LoginModalContext);
    const [exams, setExams] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [activeExam, setActiveExam] = React.useState({});
    const [activeQuestion, setActiveQuestion] = React.useState({});
    const [isEditQuestion, setIsEditQuestion] = React.useState(false);

    React.useEffect(() => {
        if (id === null) {
            navigate('/');
            setOpenSignInModal(true);
            return;
        }

        ExamService.getByEmail(
            email,
            (response) => {
                let _exams = response.data.data;
                setExams(_exams);
                setActiveExam(_exams[0]);
                setQuestions(_exams[0].questions);
            },
            (_) => {},
        );
    }, []);

    const handleChangeExam = (exam) => {
        setActiveExam(exam);
        setQuestions(exam.questions);
        setActiveQuestion({});
        setAnswers([]);
        setIsEditQuestion(false);
    };

    const handleChangeQuestion = (question) => {
        setActiveQuestion(question);
        setAnswers(question.options);
        setIsEditQuestion(false);
    };

    return (
        <React.Fragment>
            <Button startIcon={<ArrowBackIosIcon />} sx={{ my: 2, textTransform: 'none' }} component={Link} to="/">
                Home
            </Button>
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={2}>
                    <Typography variant="h6" pl={1}>
                        Exams
                    </Typography>
                    <Divider />
                    {exams.map((exam) => (
                        <Button
                            key={exam.id}
                            variant={exam === activeExam ? 'contained' : 'text'}
                            disableElevation
                            fullWidth
                            onClick={() => handleChangeExam(exam)}
                            sx={buttonStyle}
                        >
                            {exam.name}
                        </Button>
                    ))}
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                <Grid item xs={3}>
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" pl={1}>
                            Questions
                        </Typography>
                        <IconButton color="success" size="small">
                            <AddIcon />
                        </IconButton>
                    </Stack>

                    <Divider />
                    {questions.map((question) => (
                        <Button
                            key={question.id}
                            variant={question === activeQuestion ? 'contained' : 'text'}
                            disableElevation
                            fullWidth
                            onClick={() => handleChangeQuestion(question)}
                            sx={buttonStyle}
                        >
                            {question.content}
                        </Button>
                    ))}
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                <Grid item xs={6.8}>
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" pl={1}>
                            Result
                        </Typography>
                        {JsonHelper.isNotEmpty(activeQuestion) && !isEditQuestion && (
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<EditIcon />}
                                onClick={() => setIsEditQuestion(true)}
                            >
                                Edit
                            </Button>
                        )}
                        {JsonHelper.isNotEmpty(activeQuestion) && isEditQuestion && (
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<SaveIcon />}
                                disableElevation
                                onClick={() => setIsEditQuestion(false)}
                            >
                                Save
                            </Button>
                        )}
                    </Stack>
                    <Divider />
                    {JsonHelper.isNotEmpty(activeQuestion) && (
                        <TextField
                            size="small"
                            value={activeQuestion.content}
                            fullWidth
                            disabled={!isEditQuestion}
                            rows={4}
                            multiline
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            sx={{ mt: 1 }}
                        />
                    )}
                    <Grid container mt={1} spacing={1}>
                        {answers.map((answer) => (
                            <Grid item xs={3}>
                            <TextField
                                size="small"
                                value={answer.content}
                                fullWidth
                                rows={4}
                                multiline
                                disabled={!isEditQuestion}
                                inputProps={{ style: { textAlign: 'center' } }}
                            />
                        </Grid>
                        ))}
                    </Grid>
                    <Grid container mt={0.1} spacing={1}>
                        {answers.map((answer) => (
                            <Grid item xs={3}>
                                <Button
                                    variant={answer.isCorrect == true ? 'contained' : 'outlined'}
                                    onClick={() => {}}
                                    fullWidth
                                    sx={{ textTransform: 'none' }}
                                    disableElevation
                                    disabled={!isEditQuestion}
                                >
                                    {answer.isCorrect == true ? 'Correct Answer' : 'Choose'}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

const buttonStyle = {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    borderRadius: 1,
    m: 0.5,
    ml: 0,
    textTransform: 'none',
};

export default OwningExams;
