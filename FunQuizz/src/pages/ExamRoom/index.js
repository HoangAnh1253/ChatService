import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ListenType } from '~/Enums/ListenType';
import SocketContext from '~/Context/SocketContext';
import NotificationDialog from './Components/NotificationDialog';
import ExamRoomToolBar from './Components/ToolBar';
import ExamRoomRanking from './Components/Ranking';
import './style.scss';
import Ranking from './Components/Ranking';
import { useLocation } from 'react-router-dom';
import TimeHelper from '~/Helpers/TimeHelper';
import { sleep } from '~/Helpers/GlobalHelper';
import CorrectAnswerDialog from './Components/CorrectAnswerDialog';
import WrongAnswerDialog from './Components/WrongAnswerDialog';

const ExamRoom = () => {
    const location = useLocation();
    const firstTimestamp = location.state.timestamp;
    const [currentQuestionTimestamp, setCurrentQuestionTimestamp] = React.useState(firstTimestamp);

    const colors = ['#306dae', '#2c9ca6', '#eca82b', '#d4546a'];
    const socketService = React.useContext(SocketContext);
    const [score, setScore] = React.useState(0);
    const [yourAnswerChosen, setYourAnswerChosen] = React.useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [colorWhenChooseAnswer, setColorWhenChooseAnswer] = React.useState(null);
    const [finish, setFinish] = React.useState(false);
    const [answerClassName, setAnswerClassName] = React.useState('');
    const [correctAnswerId, setCorrectAnswerId] = React.useState(null);
    const [isShowNotificationDialog, setIsShowNotificationDialog] = React.useState(false);
    const [isShowCorrectAnswerDialog, setIsShowCorrectAnswerDialog] = React.useState(false);
    const [isShowWrongAnswerDialog, setIsShowWrongAnswerDialog] = React.useState(false);
    const [examResult, setExamResult] = React.useState(null);
    const [timestampFromServer, setTimestampFromServer] = React.useState(firstTimestamp);
    const [remainingTime, setRemainingTime] = React.useState(TimeHelper.getRemainingTime(firstTimestamp, 10));

    const exam = React.useMemo(() => socketService.exam, []);
    const timeLimit = React.useMemo(() => exam.questions[currentQuestionIndex].timeLimit, [currentQuestionIndex]);

    const handleCloseWrongAnswerDialog = () => setIsShowWrongAnswerDialog(false);
    const handleCloseCorrectAnswerDialog = () => setIsShowCorrectAnswerDialog(false);

    let timer;
    React.useEffect(() => {
        timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    setAnswerClassName('disable');
                    setYourAnswerChosen({ id: -1 });
                    setColorWhenChooseAnswer('green');
                    nextQuestion();
                    return timeLimit;
                }
                // return TimeHelper.getRemainingTime(currentQuestionTimestamp, timeLimit);
                return prev - 1;
            });
        }, 1000);
        // localStorage.setItem("timerId", timer.toString());

        return () => {
            clearInterval(getTimerId());
        };
    }, [currentQuestionIndex]);

    React.useEffect(() => {
        socketService.socket.on(ListenType.EXAM_RESULT, (data) => {
            console.log('exam result: ', data);
            const result = data.users.sort((a, b) => b.totalScore - a.totalScore);
            setExamResult(result);
        });
    }, []);

    React.useEffect(() => {
        socketService.startExam();
    }, []);

    React.useEffect(() => {
        socketService.socket.on(ListenType.START_QUESTION_SUCCESS, (data) => {
            clearInterval(getTimerId());
            console.log('Time: ', data);
            setTimestampFromServer(data);
            setCurrentQuestionTimestamp(data.startTime);
            nextQuestion();
        });

        return () => {
            socketService.socket.off(ListenType.START_QUESTION_SUCCESS);
        };
    }, [currentQuestionIndex]);

    React.useEffect(() => {
        socketService.socket.on(ListenType.CORRECT_ANSWER, (response) => {
            clearInterval(getTimerId());
            setIsShowCorrectAnswerDialog(true);
            console.log('correct answer: ', response);
            setScore(response.totalScore);
            setColorWhenChooseAnswer('green');
            // socketService.nextQuestion();
        });
    }, []);

    React.useEffect(() => {
        socketService.socket.on(ListenType.CORRECT_ANSWER_BY_SOE, (response) => {
            console.log('correct answer by someone: ', response);
            setCorrectAnswerId(response.correctAnswer);
            setYourAnswerChosen({ id: response.correctAnswer });
            setAnswerClassName('disable');
            setColorWhenChooseAnswer('green');
            setIsShowNotificationDialog(true);
        });
    }, []);

    React.useEffect(() => {
        socketService.socket.on(ListenType.WRON_ANSWER, (response) => {
            setIsShowWrongAnswerDialog(true);
            console.log('wrong answer: ', response);
            setColorWhenChooseAnswer('red');
        });
    }, []);

    const getTimerId = () => {
        // return parseInt(localStorage.getItem("timerId"));
        return timer;
    };

    const handleChooseAnswer = (answer) => (_) => {
        setAnswerClassName('');
        setYourAnswerChosen(answer);
        const totalTime = (Date.now() - currentQuestionTimestamp) / 1000;
        socketService.chooseAnswer(exam.questions[currentQuestionIndex].id, answer.id, totalTime);
    };

    function nextQuestion() {
        setCurrentQuestionTimestamp(Date.now());
        sleep(1500).then(() => {
            setColorWhenChooseAnswer(null);
            setAnswerClassName('');
            sleep(200).then(() => {
                setYourAnswerChosen(null);
                setIsShowNotificationDialog(false);
                setIsShowCorrectAnswerDialog(false);
                setIsShowWrongAnswerDialog(false);
                setRemainingTime(exam.questions[currentQuestionIndex].timeLimit);

                setCurrentQuestionIndex((prev) => {
                    if (prev + 1 >= exam.questions.length) {
                        setFinish(true);
                        socketService.submitExam();
                        return prev;
                    }
                    return prev + 1;
                });
            });
        });
    }

    return (
        <React.Fragment>
            <Paper sx={{ width: 1, height: '100vh', bgcolor: 'black', p: 2, borderRadius: 0 }}>
                <ExamRoomToolBar
                    exam={exam}
                    currentScore={score}
                    currentQuestionIndex={currentQuestionIndex}
                    remainingTime={remainingTime}
                />

                <Paper
                    sx={{
                        width: 1,
                        height: finish ? '90%' : '50%',
                        bgcolor: '#461a42',
                        borderRadius: 4,
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {finish ? (
                        examResult !== null && <Ranking examResult={examResult} />
                    ) : (
                        <Typography variant="body1" fontSize={30} align="center" color="white">
                            {exam.questions[currentQuestionIndex].content}
                        </Typography>
                    )}
                </Paper>
                {!finish && (
                    <Grid container item height="30%" mt={0.1} spacing={1}>
                        {exam.questions[currentQuestionIndex].options.map((answer, index) => {
                            const optionsLength = exam.questions[currentQuestionIndex].options.length;
                            const color = colors[index % colors.length];
                            const bgColor =
                                yourAnswerChosen != null && yourAnswerChosen.id === answer.id
                                    ? colorWhenChooseAnswer
                                    : color;
                            const opacity = yourAnswerChosen === null ? 1 : yourAnswerChosen.id === answer.id ? 1 : 0.3;
                            const isDisabled = yourAnswerChosen != null;

                            return (
                                <Grid item xs={12 / optionsLength} sx={{ height: '100%' }}>
                                    <Button
                                        onClick={handleChooseAnswer(answer)}
                                        fullWidth
                                        sx={{
                                            height: '100%',
                                            backgroundColor: bgColor,
                                            borderRadius: 3,
                                            opacity: opacity,
                                            textTransform: 'none',
                                            '&:hover': { bgcolor: color, opacity: 0.8 },
                                        }}
                                        className={
                                            correctAnswerId === answer.id ? 'correct-and-disable' : answerClassName
                                        }
                                        disabled={isDisabled}
                                    >
                                        <Typography color="white">{answer.content}</Typography>
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Paper>
            <NotificationDialog open={isShowNotificationDialog} />
            <CorrectAnswerDialog open={isShowCorrectAnswerDialog} handleClose={handleCloseCorrectAnswerDialog} />
            <WrongAnswerDialog open={isShowWrongAnswerDialog} handleClose={handleCloseWrongAnswerDialog} />
        </React.Fragment>
    );
};

export default ExamRoom;
