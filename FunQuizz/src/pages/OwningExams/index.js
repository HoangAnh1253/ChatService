import React from 'react';
import ExamService from '~/Services/ExamService';
import LocalStorageService from '~/Services/LocalStorageService';
import LoginModalContext from '~/Context/LoginModalContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
    };

    const handleChangeQuestion = (question) => {
        setActiveQuestion(question);
        setAnswers(question.options);
    };

    return (
        <React.Fragment>
            <Button startIcon={<ArrowBackIosIcon />} sx={{ my: 2, textTransform: 'none' }} component={Link} to="/">
                Home
            </Button>
            <Grid container spacing={1} flexGrow={1}>
                <Grid item xs={2}>
                    <Typography gutterBottom variant="h6" pl={1}>
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
                <Divider orientation="vertical" flexItem sx={{ mr: '-1px' }} />
                <Grid item xs={3}>
                    <Typography gutterBottom variant="h6" pl={1}>
                        Questions
                    </Typography>
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
                <Divider orientation="vertical" flexItem sx={{ mr: '-1px' }} />
                <Grid item flexGrow={1}>
                    <Typography gutterBottom variant="h6" pl={1}>
                        Actions
                    </Typography>
                    <Divider />
                    {JsonHelper.isNotEmpty(activeQuestion) && (
                        <TextField size="small" value={activeQuestion.content} fullWidth />
                    )}
                    <Grid container sx={{display: "inline"}}>
                        {answers.map((answer) => (
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    value={answer.content}
                                    fullWidth
                                    sx={{ display: 'inline-block' }}
                                />
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
    borderRadius: 0,
    textTransform: 'none',
};

export default OwningExams;
