import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StringHelper from '~/Helpers/StringHelper';
import { formatDateTime, getCorrectOrWrongIcon, getStreakIcon } from '~/Helpers/GlobalHelper';
import {
    Box,
    Collapse,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

function AttemptTableBody(props) {
    const { attempt, rowIndex } = props;

    // const { email } = LocalStorageService.get();

    // const { attempt } = React.useContext(ExamContext);

    const [collapse, setCollapse] = React.useState(false);

    const exam = React.useMemo(() => attempt.exam, []);
    const userAnswers = React.useMemo(() => attempt.answers, []);

    const toggleCollapse = () => setCollapse(!collapse);

    const startDateTime = new Date(attempt.startTime);
    const finishDateTime = new Date(attempt.finishTime);

    return (
        <React.Fragment>
            <TableRow
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    '&:last-child td, &:last-child th': { border: 0 },
                }}
            >
                <TableCell align="left" component="th" scope="row">
                    {rowIndex}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                    {exam.topic}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                    {exam.name}
                </TableCell>
                <TableCell align="center">{exam.authorEmail}</TableCell>
                <TableCell align="center">{exam.questions.length}</TableCell>
                <TableCell align="center">{exam.timeLimit}</TableCell>
                <TableCell align="center" sx={{ color: 'orangered' }}>
                    {attempt.maxCorrectStreak}
                </TableCell>
                <TableCell align="center" sx={{ color: '#009EFF' }}>
                    {attempt.totalBonusScore}
                </TableCell>
                <TableCell align="center" sx={{ color: 'green' }}>
                    {attempt.totalScore}
                </TableCell>
                <TableCell width={12}>
                    <IconButton aria-label="expand row" size="small" onClick={toggleCollapse}>
                        {collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={collapse} timeout="auto" unmountOnExit>
                        <Box mt={2}>
                            <Stack direction="row" alignItems="end" mb={1}>
                                <Typography variant="body2" mr={2}>
                                    All answers:{' '}
                                </Typography>
                                {userAnswers.map((userAnswers) => {
                                    return getStreakIcon(userAnswers.option.isCorrect);
                                })}
                            </Stack>
                            <Typography variant="body2" gutterBottom>
                                Start time: {formatDateTime(startDateTime)}
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Finish time: {formatDateTime(finishDateTime)}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Questions</TableCell>
                                        <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                            Your answer
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Answer time (s)
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Score
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Bonus
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Total
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Result
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userAnswers.map((userAnswer) => {
                                        return (
                                            <TableRow
                                                key={userAnswer.question.id}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {userAnswer.question.content}
                                                </TableCell>
                                                <TableCell align="left" component="th" scope="row">
                                                    {StringHelper.checkNullAndDefault(userAnswer.option.content, '-')}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {StringHelper.checkNullAndDefault(userAnswer.totalTime, '-')}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {userAnswer.question.score}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {userAnswer.bonus}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {userAnswer.option.isCorrect ? userAnswer.question.score : 0}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {getCorrectOrWrongIcon(userAnswer.option.isCorrect)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default AttemptTableBody;
