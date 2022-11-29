import React from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalStorageService from '~/Services/LocalStorageService';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Collapse,
    Dialog,
    DialogContent,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import StringHelper from '~/Helpers/StringHelper';

const DetailResultDialog = (props) => {
    const { open, handleClose, examResult } = props;

    const { email } = LocalStorageService.get();

    const [collapse, setCollapse] = React.useState(false);
    const toggleCollapse = () => setCollapse(!collapse);

    console.log('result of exams: ', examResult);

    // return (
    //     <Dialog open={open} onClose={handleClose} fullScreen>
    //         <DialogContent>
    //             <Button startIcon={<ArrowBackIosIcon />} sx={{ textTransform: 'none', mb: 2 }} onClick={handleClose}>
    //                 Back
    //             </Button>
    //             <TableContainer component={Paper}>
    //                 <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    //                     <TableHead>
    //                         <TableRow>
    //                             <TableCell sx={{ fontWeight: 'bold', color: '#F49D1A' }}>Rank</TableCell>
    //                             <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
    //                             <TableCell align="center" sx={{ fontWeight: 'bold' }}>
    //                                 Answers
    //                             </TableCell>
    //                             <TableCell align="center" sx={{ fontWeight: 'bold', color: 'orangered' }}>
    //                                 Streak
    //                             </TableCell>
    //                             <TableCell align="center" sx={{ fontWeight: 'bold' }}>
    //                                 Score
    //                             </TableCell>
    //                             <TableCell align="center" sx={{ fontWeight: 'bold' }}>
    //                                 Bonus
    //                             </TableCell>
    //                             <TableCell align="right" sx={{ fontWeight: 'bold', color: 'green' }}>
    //                                 Total
    //                             </TableCell>
    //                             <TableCell/>
    //                         </TableRow>
    //                     </TableHead>
    //                     <TableBody>
    //                         {examResult.map((exam, index) => (
    //                             <TableRow
    //                                 key={exam.username}
    //                                 sx={{
    //                                     '&:last-child td, &:last-child th': { border: 0 },
    //                                     bgcolor: email === exam.username ? '#F9F9F9' : 'transparent',
    //                                 }}
    //                             >
    //                                 <TableCell component="th" scope="row">
    //                                     {index + 1}
    //                                 </TableCell>
    //                                 <TableCell component="th" scope="row">
    //                                     {exam.username}
    //                                 </TableCell>
    //                                 <TableCell align="center">
    //                                     {exam.answerResults.map((isCorrect) => {
    //                                         return getStreakIcon(isCorrect);
    //                                     })}
    //                                 </TableCell>
    //                                 <TableCell align="center" sx={{ color: 'orangered' }}>
    //                                     {exam.maxCorrectStreak}
    //                                 </TableCell>
    //                                 <TableCell align="center">{exam.totalScore - exam.totalBonusScore}</TableCell>
    //                                 <TableCell align="center">{exam.totalBonusScore}</TableCell>
    //                                 <TableCell align="right" sx={{ color: 'green' }}>
    //                                     {exam.totalScore}
    //                                 </TableCell>
    //                                 <TableCell>
    //                                     <IconButton aria-label="expand row" size="small" onClick={toggleCollapse}>
    //                                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    //                                     </IconButton>
    //                                 </TableCell>
    //                             </TableRow>
    //                         ))}
    //                     </TableBody>
    //                     <TableRow>
    //                         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
    //                             <Collapse in={open} timeout="auto" unmountOnExit>
    //                                 <Box sx={{ margin: 1 }}>
    //                                     <Typography variant="h6" gutterBottom component="div">
    //                                         History
    //                                     </Typography>
    //                                     <Table size="small" aria-label="purchases">
    //                                         <TableHead>
    //                                             <TableRow>
    //                                                 <TableCell>Date</TableCell>
    //                                                 <TableCell>Customer</TableCell>
    //                                                 <TableCell align="right">Amount</TableCell>
    //                                                 <TableCell align="right">Total price ($)</TableCell>
    //                                             </TableRow>
    //                                         </TableHead>
    //                                         <TableBody>
    //                                             {examResult.map((exam, index) => (
    //                                                 <TableRow
    //                                                     key={exam.username}
    //                                                     sx={{
    //                                                         '&:last-child td, &:last-child th': { border: 0 },
    //                                                         bgcolor:
    //                                                             email === exam.username ? '#F9F9F9' : 'transparent',
    //                                                     }}
    //                                                 >
    //                                                     <TableCell component="th" scope="row">
    //                                                         {index + 1}
    //                                                     </TableCell>
    //                                                     <TableCell component="th" scope="row">
    //                                                         {exam.username}
    //                                                     </TableCell>
    //                                                     <TableCell align="center">
    //                                                         {exam.answerResults.map((isCorrect) => {
    //                                                             return getStreakIcon(isCorrect);
    //                                                         })}
    //                                                     </TableCell>
    //                                                     <TableCell align="center" sx={{ color: 'orangered' }}>
    //                                                         {exam.maxCorrectStreak}
    //                                                     </TableCell>
    //                                                     <TableCell align="center">
    //                                                         {exam.totalScore - exam.totalBonusScore}
    //                                                     </TableCell>
    //                                                     <TableCell align="center">{exam.totalBonusScore}</TableCell>
    //                                                     <TableCell align="right" sx={{ color: 'green' }}>
    //                                                         {exam.totalScore}
    //                                                     </TableCell>
    //                                                     <TableCell>
    //                                                         <IconButton
    //                                                             aria-label="expand row"
    //                                                             size="small"
    //                                                             onClick={toggleCollapse}
    //                                                         >
    //                                                             {open ? (
    //                                                                 <KeyboardArrowUpIcon />
    //                                                             ) : (
    //                                                                 <KeyboardArrowDownIcon />
    //                                                             )}
    //                                                         </IconButton>
    //                                                     </TableCell>
    //                                                 </TableRow>
    //                                             ))}
    //                                         </TableBody>
    //                                     </Table>
    //                                 </Box>
    //                             </Collapse>
    //                         </TableCell>
    //                     </TableRow>
    //                 </Table>
    //             </TableContainer>
    //         </DialogContent>
    //     </Dialog>
    // );

    return (
        <Dialog open={open} onClose={handleClose} fullScreen>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
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
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {examResult.map((result, index) => (
                                <Row userExam={result} index={index} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
};

function Row(props) {
    const { userExam, index } = props;

    const { email } = LocalStorageService.get();

    const [collapse, setCollapse] = React.useState(false);

    const toggleCollapse = () => setCollapse(!collapse);

    console.log('user exam: ', userExam);

    return (
        <React.Fragment>
            <TableRow
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    '&:last-child td, &:last-child th': { border: 0 },
                    bgcolor: email === userExam.username ? '#F9F9F9' : 'transparent',
                }}
            >
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                    {userExam.username}
                </TableCell>
                <TableCell align="center">
                    {userExam.answerResults.map((isCorrect) => {
                        return getStreakIcon(isCorrect);
                    })}
                </TableCell>
                <TableCell align="center" sx={{ color: 'orangered' }}>
                    {userExam.maxCorrectStreak}
                </TableCell>
                <TableCell align="center">{userExam.totalScore - userExam.totalBonusScore}</TableCell>
                <TableCell align="center">{userExam.totalBonusScore}</TableCell>
                <TableCell align="right" sx={{ color: 'green' }}>
                    {userExam.totalScore}
                </TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={toggleCollapse}>
                        {collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={collapse} timeout="auto" unmountOnExit>
                        <Box>
                            <Typography variant="body1" component="div" mt={2}>
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Questions</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Your answer</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', color: 'orangered' }}>
                                            Answer time
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                            Result
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userExam.answers.map((answer, answerIndex) => {
                                        const answerResult = userExam.answerResults[answerIndex];
                                        return (
                                            <TableRow
                                                key={answer.questionId}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {answer.questionId}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {StringHelper.checkNullAndDefault(answer.optionId, "-")}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {StringHelper.checkNullAndDefault(answer.totalTime, "-")}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {getCorrectOrWrongIcon(answerResult)}
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

const getCorrectOrWrongIcon = (isCorrectAnswer) => {
    if(!isCorrectAnswer) {
        return <CloseIcon fontSize='small' color='error' />
    }

    return <CheckIcon fontSize='small' color='success' />
}

const getStreakIcon = (isCorrect) => {
    if (isCorrect) {
        return <LocalFireDepartmentIcon sx={{ color: 'orangered' }} />;
    } else {
        return <LocalFireDepartmentIcon sx={{ color: 'grey' }} />;
    }
};

export default DetailResultDialog;
