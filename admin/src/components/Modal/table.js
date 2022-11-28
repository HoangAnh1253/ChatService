import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, question, answer, totaltime, averagetime) {
  return { id, question, answer, totaltime, averagetime };
}

const rows = [
  createData(1, 'Question 1', 1, 2, 15.2),
  createData(2, 'Question 2', 1, 2, 2.3),
  createData(3, 'Question 3', 1, 2, 12.5),
  createData(4, 'Question 4', 1, 2, 5.4),
];

function TableModal(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Question</TableCell>
            <TableCell align="right">Answer</TableCell>
            <TableCell align="right">Total time</TableCell>
            <TableCell align="right">Average Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.question}</TableCell>
              <TableCell align="right">{row.answer}</TableCell>
              <TableCell align="right">{row.totaltime}</TableCell>
              <TableCell align="right">{row.averagetime}s</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableModal;
