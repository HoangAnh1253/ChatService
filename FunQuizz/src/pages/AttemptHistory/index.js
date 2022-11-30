import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AttempService from '~/Services/AttempService';
import IosShareIcon from '@mui/icons-material/IosShare';
import AttempTableBody from './Components/AttempTableBody';
import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

const AttemptHistory = () => {
    const navigate = useNavigate();

    const [attemptHistory, setAttemptHistory] = React.useState([]);

    const handleBackToPrevPage = () => {
        navigate(-1);
    };

    React.useEffect(() => {
        AttempService.fetchAll(
            (response) => {
                const attemptFilter = response.data.data.sort((a, b) => b.id - a.id)
                setAttemptHistory(attemptFilter);
                console.log('--ATTEMP HISTORY: ', response.data.data);
            },
            (error) => console.log(error),
        );
    }, []);

    const exportExcelFile = () => {
        var XLSX = require("xlsx");

        const wb = XLSX.utils.book_new();
        const attemptLength = attemptHistory.length;

        // for( let i = 0; i < attemptLength; i ++) {
            // const _wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(attemptHistory);
            XLSX.utils.sheet_add_aoa(ws, [["Name", "Birthday"]], { origin: "A1" });

            // XLSX.utils.book_append_sheet(wb, ws, `sheet ${1}`);
            wb.Sheets[`sheet ${1}`] = ws
            console.log(ws);
        // }
        // attemptHistory.map((attempt, index) => {
        //     const ws = XLSX.utils.json_to_sheet(attempt);

        //     XLSX.utils.book_append_sheet(wb, ws, `sheet ${index}`);
        // });

        XLSX.writeFile(wb, 'attempt-history.xlsx');
    };

    return (
        <React.Fragment>
            <Button
                startIcon={<ArrowBackIosIcon />}
                sx={{ m: 2, textTransform: 'none' }}
                onClick={handleBackToPrevPage}
            >
                Back
            </Button>
            <Stack direction="row" justifyContent="space-between" mx={2} mb={2}>
                <Typography variant="h5" color="text.secondary" gutterBottom fontWeight="bold">
                    Attempt history
                </Typography>
                <Button
                    startIcon={<IosShareIcon />}
                    variant="contained"
                    color="success"
                    disableElevation
                    sx={{ textTransform: 'none' }}
                    onClick={exportExcelFile}
                >
                    Export to Excel
                </Button>
            </Stack>
            <Box mx={2} mb={5}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                    #
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                    Topic
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                                    Exam
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Author
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Number of question
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Time limit (min)
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'orangered' }}>
                                    Streak
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#009EFF' }}>
                                    Bonus
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'green' }}>
                                    Total
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attemptHistory.map((attempt, index) => (
                                <AttempTableBody attempt={attempt} rowIndex={index + 1} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    );
};

export default AttemptHistory;
