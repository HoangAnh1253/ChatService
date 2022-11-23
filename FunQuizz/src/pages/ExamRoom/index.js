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

const ExamRoom = () => {
    const location = useLocation();
    const firstTimestamp = location.state.timestamp;
    const [currentQuestionTimestamp, setCurrentQuestionTimestamp] = React.useState(firstTimestamp);

    const colors = ['#306dae', '#2c9ca6', '#eca82b', '#d4546a'];
    const socketService = React.useContext(SocketContext);
    const [score, setScore] = React.useState(0);
    const [yourAnswerChosen, setYourAnswerChosen] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [colorWhenChooseAnswer, setColorWhenChooseAnswer] = React.useState(null);
    const [finish, setFinish] = React.useState(false);
    const [answerClassName, setAnswerClassName] = React.useState('');
    const [correctAnswerId, setCorrectAnswerId] = React.useState(null);
    const [isShowNotificationDialog, setIsShowNotificationDialog] = React.useState(false);
    const [examResult, setExamResult] = React.useState(null);
    const [remainingTime, setRemainingTime] = React.useState(TimeHelper.getRemainingTime(firstTimestamp, 10));

    const exam = React.useMemo(() => socketService.exam, []);

    const handleCloseNotificationDialog = () => setIsShowNotificationDialog(false);

    let remainingTimer;
    React.useEffect(() => {
        clearInterval(remainingTimer);
        
        remainingTimer = setInterval(() => {
            setRemainingTime((prev) => {
                console.log('prev ', prev);
                console.log('currentQuestionIndex ', currentQuestionIndex);

                console.log('start at set RemainingTime ', currentQuestionTimestamp);

                if (prev <= 0) {
                    clearInterval(remainingTimer);
                    setAnswerClassName('disable');
                    setYourAnswerChosen({ id: -1 });
                    setColorWhenChooseAnswer('green');
                    console.log('before nextQuestion() ', currentQuestionTimestamp);
                    nextQuestion();
                    console.log('after nextQuestion() ', currentQuestionTimestamp);
                    return TimeHelper.getRemainingTime(Date.now(), 10);
                }

                return TimeHelper.getRemainingTime(currentQuestionTimestamp, 10);
            });
        }, 100);

        return () => {
            clearInterval(remainingTimer);
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
        socketService.socket.on(ListenType.START_QUESTION_SUCCESS, (data) => {
            // setRemainingTime(10);
            clearInterval(remainingTimer);
            console.log('Time: ', data);
            nextQuestion();
            setRemainingTime(TimeHelper.getRemainingTime(data.startTime, 10));
            setCurrentQuestionTimestamp(data.startTime);
        });
    }, []);

    React.useEffect(() => {
        socketService.socket.on(ListenType.CORRECT_ANSWER, (response) => {
            console.log('correct answer: ', response);
            clearInterval(remainingTimer);
            setScore(response.totalScore);
            setColorWhenChooseAnswer('green');
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
            //nextQuestion();
        });
    }, []);

    React.useEffect(() => {
        socketService.socket.on(ListenType.WRON_ANSWER, (response) => {
            console.log('wrong answer: ', response);
            setColorWhenChooseAnswer('red');
        });
    }, []);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleChooseAnswer = (answer) => (_) => {
        setAnswerClassName('');
        setYourAnswerChosen(answer);

        socketService.chooseAnswer(exam.questions[currentQuestionIndex].id, answer.id);
    };

    function nextQuestion() {
        sleep(1500).then(() => {
            setColorWhenChooseAnswer(null);
            setAnswerClassName('');
            sleep(200).then(() => {
                setCurrentQuestionTimestamp(Date.now());

                setYourAnswerChosen(null);
                setIsShowNotificationDialog(false);

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
            <NotificationDialog open={isShowNotificationDialog} handleClose={handleCloseNotificationDialog} />
        </React.Fragment>
    );
};

export default ExamRoom;
