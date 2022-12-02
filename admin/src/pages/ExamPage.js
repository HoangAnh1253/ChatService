import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Navigate, Link } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
  Fade,
  Backdrop,
  Box,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import ExamModal from '../components/Exam/ExamModal';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { jsonData } from './data';
import { data } from '../_mock/exam';
import UserService from '../Services/UserService';
import TableModal from '../components/Modal/table';
import ExamService from '../Services/ExamService';
import TopicService from '../Services/TopicService';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'authorEmail', label: 'Author', alignRight: false },
  { id: 'topic', label: 'Topic', alignRight: false },
  { id: 'option', label: 'Option', alignRight: true },
];

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_item) => _item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ExamPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listItem, setListItem] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [topic, setTopic] = useState([]);
  const [exam, setExam] = useState([]);
  const [user, setUser] = useState([]);
  const [modalItemSelected, setModalItemSelected] = useState(null);
  const [openModalItem, setOpenModalItem] = useState(false);
  let isEdit = false;
  const handleOpenModalItem = (id) => (e) => {
    setOpenModalItem(true);
    setModalItemSelected(id);
  };

  useEffect(() => {
    getAllExam();
    getAllTopic();
    getAllUser();
    console.log('get all exam');
  }, []);

  const getAllExam = () => {
    ExamService.get(
      (response) => {
        setListItem(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAllUser = () => {
    UserService.getAll(
      (response) => {
        setUser(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAllTopic = () => {
    TopicService.get(
      (response) => {
        setTopic(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleEdit = () => {
    setOpenModal(true);
  };

  const handleDelete = () => {
    console.log('delete');
    ExamService.delete(
      modalItemSelected,
      () => {
        getAllExam();
      },
      () => {}
    );
  };
  const handleSubmit = () => {
    getAllExam();
    console.log('handle submit');
  };

  const handleCloseModalItem = () => setOpenModalItem(false);

  useEffect(() => {
    setListItem(data);
    console.log(listItem);
  }, [data]);

  const handleOpenMenu = (id) => (event) => {
    setOpen(event.currentTarget);
    isEdit = true;
    setModalItemSelected(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listItem.map((n, index) => index);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listItem.length) : 0;

  const filteredItem = applySortFilter(listItem, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredItem.length && !!filterName;

  const convertToDate = (string) => {
    const date = new Date(string);
    const dateString = `${date.getUTCFullYear()}/${
      date.getUTCMonth() + 1
    }/${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
    return date.toLocaleString();
  };

  return (
    <>
      <Helmet>
        <title> Exam </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Exam
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
            Create new exam
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listItem.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredItem.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { name, authorEmail, topic } = row;
                    const selectedItem = selected.indexOf(index) !== -1;

                    return (
                      <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedItem}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedItem} onChange={(event) => handleClick(event, index)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              <Link to={'/dashboard/attempt/1'}>{name}</Link>
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{authorEmail}</TableCell>

                        <TableCell align="left">{topic}</TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu(index)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listItem.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <IconButton size="small" onClick={handleEdit}>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
            Edit
          </IconButton>
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <IconButton size="small" onClick={handleDelete}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
            Delete
          </IconButton>
        </MenuItem>
      </Popover>

      <ExamModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        topics={topic}
        users={user}
        isEdit={isEdit}
        listItem={listItem}
        index={modalItemSelected}
      />
    </>
  );
}
