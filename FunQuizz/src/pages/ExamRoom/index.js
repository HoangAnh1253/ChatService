import React from 'react';
import { Button, Card, Grid, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

const ExamRoom = () => {
    const colors = ['#306dae', '#2c9ca6', '#eca82b', '#d4546a'];
    const [answerHasChosen, setAnswerHasChosen] = React.useState(null);
    const [isChooseAnswer, setIsChooseAnswer] = React.useState(false);
    const [correctQuestionChoose, setCorrectQuestionChoose] = React.useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [chosenColor, setChosenColor] = React.useState(null);
    const [finish, setFinish] = React.useState(false);
    const [isMusicPlayed, setIsMusicPlayed] = React.useState(true);
    const audioRef = React.useRef();


    const questions = [
        {
            id: 6,
            content: 'Question 1',
            score: 10,
            options: [
                {
                    id: 15,
                    content: 'Answer A',
                    isCorrect: true,
                },
                {
                    id: 16,
                    content: 'Answer B',
                    isCorrect: false,
                },
                {
                    id: 17,
                    content: 'Answer C',
                    isCorrect: false,
                },
                {
                    id: 18,
                    content: 'Answer D',
                    isCorrect: false,
                },
            ],
        },
        {
            id: 7,
            content: 'Question 2',
            score: 10,
            options: [
                {
                    id: 19,
                    content: 'Answer A',
                    isCorrect: false,
                },
                {
                    id: 20,
                    content: 'Answer B',
                    isCorrect: true,
                },
                {
                    id: 21,
                    content: 'Answer C',
                    isCorrect: false,
                },
                {
                    id: 22,
                    content: 'Answer D',
                    isCorrect: false,
                },
            ],
        },
        {
            id: 8,
            content: 'Question 3',
            score: 10,
            options: [
                {
                    id: 23,
                    content: 'A',
                    isCorrect: false,
                },
                {
                    id: 24,
                    content: 'B',
                    isCorrect: false,
                },
                {
                    id: 25,
                    content: 'C',
                    isCorrect: false,
                },
                {
                    id: 26,
                    content: 'D',
                    isCorrect: true,
                },
            ],
        },
        {
            id: 10,
            content: 'Ai dep trai nhat',
            score: 10,
            options: [
                {
                    id: 31,
                    content: 'Le Huynh Duc',
                    isCorrect: true,
                },
                {
                    id: 32,
                    content: 'Duc Le Huynh',
                    isCorrect: false,
                },
                {
                    id: 33,
                    content: 'Huynh Duc Le',
                    isCorrect: false,
                },
                {
                    id: 34,
                    content: 'Yoko39',
                    isCorrect: false,
                },
            ],
        },
        {
            id: 9,
            content: 'Question 5',
            score: 10,
            options: [
                {
                    id: 27,
                    content: 'E',
                    isCorrect: false,
                },
                {
                    id: 28,
                    content: 'A',
                    isCorrect: true,
                },
                {
                    id: 29,
                    content: 'B',
                    isCorrect: false,
                },
                {
                    id: 30,
                    content: 'C',
                    isCorrect: false,
                },
            ],
        },
        {
            id: 28,
            content: 'New english question',
            score: 10,
            options: [
                {
                    id: 104,
                    content: 'I are',
                    isCorrect: false,
                },
                {
                    id: 106,
                    content: 'I were',
                    isCorrect: false,
                },
                {
                    id: 103,
                    content: 'I am',
                    isCorrect: false,
                },
                {
                    id: 105,
                    content: 'I ise',
                    isCorrect: true,
                },
            ],
        },
        {
            id: 29,
            content: 'kube',
            score: 10,
            options: [
                {
                    id: 110,
                    content: 'a',
                    isCorrect: false,
                },
                {
                    id: 107,
                    content: 'a',
                    isCorrect: true,
                },
                {
                    id: 108,
                    content: 'b',
                    isCorrect: false,
                },
                {
                    id: 109,
                    content: 'b',
                    isCorrect: false,
                },
            ],
        },
        {
            id: 30,
            content: 'empty',
            score: 10,
            options: [
                {
                    id: 111,
                    content: 'a',
                    isCorrect: true,
                },
                {
                    id: 112,
                    content: 'b',
                    isCorrect: false,
                },
                {
                    id: 113,
                    content: 'c',
                    isCorrect: false,
                },
                {
                    id: 114,
                    content: 'd',
                    isCorrect: false,
                },
            ],
        },
    ];

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleChooseAnswer = (answer) => (_) => {
        setAnswerHasChosen(answer);

        sleep(500).then(() => {
            if (answer.isCorrect) {
                setCorrectQuestionChoose((prev) => prev + 1);
                setChosenColor('green');
            } else {
                setChosenColor('red');
            }
        });

        sleep(1000).then(() => {
            setChosenColor(null);
            sleep(100).then(() => {
                setAnswerHasChosen(null);
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex((prev) => prev + 1);
                } else {
                    setFinish(true);
                }
            });
        });
    };

    const handleResetQuestions = () => {
        setCurrentQuestionIndex(0);
        setCorrectQuestionChoose(0);
        setFinish(false);
    };

    const handlePausePlayClick = () => {
        if(isMusicPlayed) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsMusicPlayed(!isMusicPlayed);
    }

    return (
        <Paper sx={{ width: 1, height: '100vh', bgcolor: 'black', p: 2, borderRadius: 0 }}>
            <Stack direction="row" spacing={1}>
                <Paper component="span" sx={{ backgroundColor: '#1a1a1a', borderRadius: 2, px: 2, py: 1.1 }}>
                    <Typography
                        component="span"
                        variant="body1"
                        color="white"
                        fontSize={20}
                        sx={{ backgroundColor: 'transparent' }}
                    >
                        {currentQuestionIndex + 1}
                    </Typography>
                    <Typography component="span" variant="body1" color="white" fontSize={13}>
                        /{questions.length}
                    </Typography>
                </Paper>
                <Paper component="span" sx={{ backgroundColor: '#1a1a1a', borderRadius: 2, px: 1.5, py: 1.1 }}>
                    <IconButton size="small" sx={{color: "white"}} onClick={handlePausePlayClick}>
                        {
                            isMusicPlayed ? <MusicOffIcon /> : <MusicNoteIcon />
                        }
                    </IconButton>
                </Paper>
                <audio ref={audioRef} autoPlay>
                    <source type="audio/mp3" src={process.env.PUBLIC_URL + 'audio/music.mp3'} />
                </audio>
            </Stack>

            <Paper
                sx={{
                    width: 1,
                    height: '50%',
                    bgcolor: '#461a42',
                    borderRadius: 4,
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {finish ? (
                    <Button variant="outlined" onClick={handleResetQuestions}>
                        Reset
                    </Button>
                ) : (
                    <Typography variant="body1" fontSize={30} align="center" color="white">
                        {questions[currentQuestionIndex].content}
                    </Typography>
                )}
            </Paper>
            {!finish && (
                <Grid container item height="30%" mt={0.1} spacing={1}>
                    {questions[currentQuestionIndex].options.map((answer, index) => {
                        const optionsLength = questions[currentQuestionIndex].options.length;
                        const color = colors[index % colors.length];
                        const opacity = answerHasChosen === null ? 1 : answerHasChosen.id === answer.id ? 1 : 0;
                        const isDisabled = answerHasChosen != null;

                        return (
                            <Grid item xs={12 / optionsLength} sx={{ height: '100%' }}>
                                <Button
                                    onClick={handleChooseAnswer(answer)}
                                    fullWidth
                                    sx={{
                                        height: '100%',
                                        backgroundColor: chosenColor !== null ? chosenColor : color,
                                        borderRadius: 3,
                                        opacity: opacity,
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: color, opacity: 0.8 },
                                    }}
                                    disabled={isDisabled}
                                >
                                    <Typography color="white">{answer.content}</Typography>
                                </Button>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
            {finish && (
                <Paper
                    sx={{
                        width: 1,
                        height: '30%',
                        bgcolor: colors[0],
                        borderRadius: 4,
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body1" fontSize={20} align="center" color="white">
                        You has chosen {correctQuestionChoose} questions correctly.
                    </Typography>
                </Paper>
            )}
        </Paper>
    );
};

export default ExamRoom;
