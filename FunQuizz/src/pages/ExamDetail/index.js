// @ts-nocheck
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ExamService from '~/Services/ExamService';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Card, CardActions, CardContent, Grid, Typography, Stack } from '@mui/material';

const ExamDetail = () => {
    const params = useParams();
    const [exam, setExam] = React.useState({
        questions: [],
    });
    const [score, setScore] = React.useState(0);

    React.useEffect(() => {
        ExamService.getById(
            params.id,
            (response) => {
                let _exam = response.data.data;
                setExam(_exam);
                console.log(_exam);

                let scores = _exam.questions.reduce((pre, cur) => pre.score + cur.score, 0);
                setScore(scores);
            },
            (_) => {},
        );
    }, []);

    const getCorrectAnswerQuantity = (question) => {
        return question.options.filter((option) => option.isCorrect === true).length;
    }

    const getTotalScore = (exam) => {
        return exam.questions.reduce((pre, cur) => pre + cur.score, 0);
    }

    return (
        <React.Fragment>
            <Button startIcon={<ArrowBackIosIcon />} sx={{ my: 2, textTransform: 'none' }} component={Link} to="/">
                Home
            </Button>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                sx={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <Card sx={{ minWidth: 400 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" textAlign="center" gutterBottom>
                                Topic: English
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                textAlign="center"
                                textTransform="uppercase"
                            >
                                {exam.name}
                            </Typography>
                            <Stack direction="row" spacing={3} mt={3}>
                                <Typography color="red">{exam.questions.length} questions</Typography>
                                <Typography color="orange">Time limit: {exam.timeLimit} min</Typography>
                                <Typography color="green">Total: {getTotalScore(exam)} score</Typography>
                            </Stack>

                            <Typography variant="body2" mt={2} color="text.secondary">
                                Author: {exam.authorEmail}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid container mt={3} spacing={2}>
                    {exam.questions.map((question) => (
                        <Grid item xs={3}>
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                        {question.score} score
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" fontSize={20}>
                                        {question.content}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mt: 2 }} color="text.secondary">
                                        Total: {question.options.length} options
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        Have: {getCorrectAnswerQuantity(question)} correct answers
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default ExamDetail;
