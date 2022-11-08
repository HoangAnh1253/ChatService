import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import { Link, useLocation } from 'react-router-dom';
import { Alert, AppBar, Button, Grid, Grow, IconButton, Stack, TextField, Toolbar } from '@mui/material';
import ExamService from '~/Services/ExamService';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import QuestionService from '~/Services/QuestionService';
import { AnswerType } from '~/Enums/AnswerType';

const NewQuestion = () => {
    const location = useLocation();
    const instance = location.state.data;
    const [showAlert, setShowAlert] = React.useState(false);
    const [editName, setEditName] = React.useState(false);
    const [examName, setExamName] = React.useState(instance.name);
    const [answerA, setAnswerA] = React.useState('');
    const [answerB, setAnswerB] = React.useState('');
    const [answerC, setAnswerC] = React.useState('');
    const [answerD, setAnswerD] = React.useState('');
    const [question, setQuestion] = React.useState('');
    const [correctAnswer, setCorrectAnswer] = React.useState(AnswerType.A);

    const isAnyNullField =
        examName === '' ||
        question === '' ||
        answerA === '' ||
        answerB === '' ||
        answerC === '' ||
        answerD === '' ||
        correctAnswer === '';
    const handleChangeExamName = (e) => {
        setExamName(e.target.value);
    };

    const handleEditName = () => {
        if (editName) {
            setEditName(!editName);
            let payload = { name: examName };
            ExamService.update(instance.id, payload);
        } else {
            setEditName(!editName);
        }
    };

    const handleChangeAnswer = (event, answer) => {
        switch (answer.type) {
            case AnswerType.A:
                setAnswerA(event.target.value);
                break;
            case AnswerType.B:
                setAnswerB(event.target.value);
                break;
            case AnswerType.C:
                setAnswerC(event.target.value);
                break;
            case AnswerType.D:
                setAnswerD(event.target.value);
                break;
        }
    };

    const handleChooseCorrectAnswer = (answerType) => {
        setCorrectAnswer(answerType);
    };

    const handleSave = () => {
        let payload = {
            content: question,
            options: [
                {
                    content: answerA,
                    isCorrect: correctAnswer == AnswerType.A,
                },
                {
                    content: answerB,
                    isCorrect: correctAnswer == AnswerType.B,
                },
                {
                    content: answerC,
                    isCorrect: correctAnswer == AnswerType.C,
                },
                {
                    content: answerD,
                    isCorrect: correctAnswer == AnswerType.D,
                },
            ],
        };
        QuestionService.create(
            instance.id,
            payload,
            (response) => {
                resetAll();
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
                console.log('response', response);
            },
            (error) => {},
        );
    };

    const resetAll = () => {
        setQuestion('');
        setAnswerA('');
        setAnswerB('');
        setAnswerC('');
        setAnswerD('');
        setCorrectAnswer(AnswerType.A);
    };

    const answers = [
        {
            type: AnswerType.A,
            placeholderText: 'Type your question A here...',
        },
        {
            type: AnswerType.B,
            placeholderText: 'Type your question B here...',
        },
        {
            type: AnswerType.C,
            placeholderText: 'Type your question C here...',
        },
        {
            type: AnswerType.D,
            placeholderText: 'Type your question D here...',
        },
    ];

    return (
        <React.Fragment>
            <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 2, width: '100%' }}>
                <Toolbar variant="regular">
                    <Link to="/">
                        <img
                            src={process.env.PUBLIC_URL + '/FunQuizz_logo.png'}
                            width="150px"
                            style={{ marginRight: 25 }}
                        />
                    </Link>

                    <TextField
                        size="small"
                        value={examName}
                        disabled={!editName}
                        onChange={handleChangeExamName}
                    ></TextField>
                    <IconButton size="small" color="primary" onClick={handleEditName} sx={{ ml: 1 }}>
                        {editName ? <SaveIcon fontSize="small" /> : <CreateIcon fontSize="small" />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <TextField
                variant="outlined"
                placeholder="Type your question here..."
                multiline
                rows={5}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                fullWidth
                sx={{ mt: 2 }}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <Grid container spacing={1.5}>
                {answers.map((answer) => (
                    <Grid item xs={3} key={answer.type}>
                        <Stack>
                            <TextField
                                variant="outlined"
                                placeholder="Type your question here..."
                                multiline
                                rows={5}
                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                fullWidth
                                sx={{ mt: 2 }}
                                onChange={(event) => handleChangeAnswer(event, answer)}
                            />
                            <Button
                                variant={correctAnswer == answer.type ? 'contained' : 'outlined'}
                                onClick={() => handleChooseCorrectAnswer(answer.type)}
                                sx={{ textTransform: 'none' }}
                                disableElevation
                            >
                                {correctAnswer == answer.type ? 'Correct Answer' : 'Choose'}
                            </Button>
                        </Stack>
                    </Grid>
                ))}
            </Grid>

            <Grid container justifyContent="flex-end" spacing={1} mt={2}>
                <Grid item>
                    <Button component={Link} to="/" variant="outlined">
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" startIcon={<SaveIcon />} disabled={isAnyNullField} onClick={handleSave}>
                        Save
                    </Button>
                </Grid>
            </Grid>
            <Grow in={showAlert}>
                <Alert
                    variant="filled"
                    severity="success"
                    sx={{ mb: 2, position: 'fixed', top: '20px', right: '20px' }}
                >
                    Create question successfully
                </Alert>
            </Grow>
        </React.Fragment>
    );
};

export default NewQuestion;
