import React, { useEffect } from 'react';
import ExamService from '~/Services/ExamService';
import LocalStorageService from '~/Services/LocalStorageService';
import LoginModalContext from '~/Context/LoginModalContext';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Divider, Grid, Grow, IconButton, Stack, TextField, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import JsonHelper from '~/Helpers/JsonHelper';
import QuestionService from '~/Services/QuestionService';
import DeletedDialog from './Components/DeletedDialog';

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
    const [alert, setAlert] = React.useState({ title: '', isShowed: false });
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

    const handleShowDeleteDialog = () => setShowDeleteDialog(true);
    const handleCloseDeleteDialog = () => setShowDeleteDialog(false);

    React.useEffect(() => {
        if (id === null) {
            navigate('/');
            setOpenSignInModal(true);
            return;
        }

        ExamService.getByEmail(
            email,
            (response) => {
                let newExams = response.data.data;
                setExams(newExams);
                if (newExams.length > 0) {
                    setQuestions(newExams[0].questions);
                    setActiveExam(newExams[0]);
                }
            },
            (_) => {},
        );
    }, []);

    const updateQuestion = () => {
        QuestionService.update(
            activeQuestion.id,
            activeQuestion,
            (_) => {
                setAlert({ title: 'Update question successfully!', isShowed: true });
                setTimeout(() => {
                    setAlert({ title: '', isShowed: false });
                }, 2000);

                const newQuestions = questions.map((question) => {
                    if (question.id === activeQuestion.id) {
                        question.content = activeQuestion.content;
                    }
                    return question;
                });
                setQuestions(newQuestions);
            },
            (error) => {
                console.log('error', error);
            },
        );
    };
    const createQuestion = () => {
        QuestionService.create(
            activeExam.id,
            activeQuestion,
            (_) => {
                setAlert({ title: 'Create new question successfully!', isShowed: true });
                setTimeout(() => {
                    setAlert({ title: '', isShowed: false });
                }, 2000);

                ExamService.getById(
                    activeExam.id,
                    (response) => {
                        console.log(response.data.data);
                        setQuestions(response.data.data.questions);
                        setAnswers([]);
                        setActiveQuestion({});
                    },
                    (error) => console.log(error),
                );
            },
            (error) => {
                console.log('error', error);
            },
        );
    };

    const deleteQuestion = (questionId) => (_) => {
        setShowDeleteDialog(false);
        console.log(questionId);
    };

    const handleChangeExam = (exam) => {
        setActiveExam(exam);
        setQuestions(exam.questions);
        setActiveQuestion({});
        setAnswers([]);
        setIsEditQuestion(false);
    };

    const handleChangeQuestion = (question) => {
        setActiveQuestion(question);
        setAnswers(question.options.sort((a, b) => a.id - b.id));
        setIsEditQuestion(false);
    };

    const handleChangeQuestionContent = (e) => {
        setActiveQuestion((prev) => ({ ...prev, content: e.target.value }));
    };

    const handleChangeAnswerValue = (index) => (e) => {
        let _answers = [...answers];
        _answers[index].content = e.target.value;

        setActiveQuestion((prev) => ({ ...prev, options: _answers }));
    };

    const handleChangeCorrectAnswer = (index) => (_) => {
        let _answers = activeQuestion.options.map((answer) => {
            answer.isCorrect = false;
            return answer;
        });

        _answers[index].isCorrect = true;

        setAnswers(_answers);
    };

    const handleAddQuestion = () => {
        let newQuestion = {
            content: 'empty',
            options: [
                {
                    content: '',
                },
                {
                    content: '',
                },
                {
                    content: '',
                },
                {
                    content: '',
                },
            ],
        };
        setQuestions([...questions, newQuestion]);
        setActiveQuestion(newQuestion);
        setAnswers(newQuestion.options);
    };

    const handleUpdateQuestion = () => {
        updateQuestion();
        setIsEditQuestion(false);
    };

    const isCreatedButtonDisable = () => {
        if (activeQuestion.content === '') return true;
        for (let i = 0; i < activeQuestion.options.length; i++) {
            let answer = activeQuestion.options[i];
            if (answer.content === '') return true;
        }
        for (let i = 0; i < activeQuestion.options.length; i++) {
            let answer = activeQuestion.options[i];
            if (answer.isCorrect) return false;
        }
        return true;
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
                        <IconButton color="success" size="small" onClick={handleAddQuestion}>
                            <AddIcon />
                        </IconButton>
                    </Stack>

                    <Divider />
                    {questions.map((question) => (
                        <Stack direction="row" alignItems="center">
                            <Button
                                key={question.id}
                                variant={question.id === activeQuestion.id ? 'contained' : 'text'}
                                disableElevation
                                fullWidth
                                onClick={() => handleChangeQuestion(question)}
                                sx={buttonStyle}
                            >
                                {question.content}
                            </Button>

                            {question.id === activeQuestion.id && (
                                <IconButton color="error" size="small" onClick={handleShowDeleteDialog}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Stack>
                    ))}
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                <Grid item xs={6.8}>
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" pl={1}>
                            Result
                        </Typography>
                        {activeQuestion.id !== undefined && (
                            <>
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
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="error"
                                            disableElevation
                                            onClick={() => setIsEditQuestion(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<SaveIcon />}
                                            disableElevation
                                            onClick={handleUpdateQuestion}
                                        >
                                            Save
                                        </Button>
                                    </Stack>
                                )}
                            </>
                        )}

                        {JsonHelper.isNotEmpty(activeQuestion) && activeQuestion.id === undefined && (
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AddIcon />}
                                color="success"
                                disableElevation
                                onClick={createQuestion}
                                disabled={isCreatedButtonDisable()}
                            >
                                Create
                            </Button>
                        )}
                    </Stack>
                    <Divider />
                    {JsonHelper.isNotEmpty(activeQuestion) && (
                        <TextField
                            size="small"
                            value={activeQuestion.content}
                            fullWidth
                            disabled={!isEditQuestion && activeQuestion.id !== undefined}
                            rows={4}
                            multiline
                            placeholder="Type your question here..."
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            onChange={handleChangeQuestionContent}
                            sx={{ mt: 1 }}
                        />
                    )}
                    <Grid container mt={1} spacing={1}>
                        {JsonHelper.isNotEmpty(activeQuestion) &&
                            activeQuestion.options.map((answer, index) => (
                                <Grid item xs={3}>
                                    <TextField
                                        size="small"
                                        value={answer.content}
                                        fullWidth
                                        rows={4}
                                        multiline
                                        placeholder="Type an answer option here..."
                                        disabled={!isEditQuestion && activeQuestion.id !== undefined}
                                        inputProps={{ style: { textAlign: 'center' } }}
                                        onChange={handleChangeAnswerValue(index)}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                    <Grid container mt={0.1} spacing={1}>
                        {answers.map((answer, index) => (
                            <Grid item xs={3} key={answer.id}>
                                <Button
                                    variant={answer.isCorrect === true ? 'contained' : 'outlined'}
                                    fullWidth
                                    sx={{ textTransform: 'none' }}
                                    disableElevation
                                    disabled={!isEditQuestion && activeQuestion.id !== undefined}
                                    onClick={handleChangeCorrectAnswer(index)}
                                >
                                    {answer.isCorrect === true ? 'Correct Answer' : 'Choose'}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grow in={alert.isShowed}>
                <Alert
                    variant="filled"
                    severity="success"
                    sx={{ mb: 2, position: 'fixed', top: '20px', right: '20px' }}
                >
                    {alert.title}
                </Alert>
            </Grow>
            <DeletedDialog
                title="Delete question"
                content="Are you sure to delete this question?"
                open={showDeleteDialog}
                handleClose={handleCloseDeleteDialog}
                handleClick={deleteQuestion}
            />
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
