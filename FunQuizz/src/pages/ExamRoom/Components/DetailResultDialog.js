import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalStorageService from '~/Services/LocalStorageService';

const DetailResultDialog = (props) => {
    const { open, handleClose, examResult } = props;

    const { email } = LocalStorageService.get();

    console.log('result of exams: ', examResult);

    return (
        <Dialog open={open} onClose={handleClose} fullScreen>
            <DialogContent>
                <Button startIcon={<ArrowBackIosIcon />} sx={{ textTransform: 'none', mb: 2 }} onClick={handleClose}>
                    Back
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#F49D1A' }}>Rank</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Answers
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'orangered' }}>
                                    Streak
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Score
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Bonus
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'green' }}>
                                    Total
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {examResult.map((exam, index) => (
                                <TableRow
                                    key={exam.username}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        bgcolor: email === exam.username ? '#F9F9F9' : 'transparent',
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {exam.username}
                                    </TableCell>
                                    <TableCell align="center">
                                        {exam.answerResults.map((isCorrect) => {
                                            return getStreakIcon(isCorrect);
                                        })}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'orangered' }}>
                                        {exam.maxCorrectStreak}
                                    </TableCell>
                                    <TableCell align="center">{exam.totalScore - exam.totalBonusScore}</TableCell>
                                    <TableCell align="center">{exam.totalBonusScore}</TableCell>
                                    <TableCell align="right" sx={{ color: 'green' }}>
                                        {exam.totalScore}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
};

const getStreakIcon = (isCorrect) => {
    if (isCorrect) {
        return <LocalFireDepartmentIcon sx={{ color: 'orangered' }} />;
    } else {
        return <LocalFireDepartmentIcon sx={{ color: 'grey' }} />;
    }
};

export default DetailResultDialog;
