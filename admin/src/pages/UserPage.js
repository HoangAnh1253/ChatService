import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useConfirm } from 'material-ui-confirm';
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
  Alert,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import UserService from '../Services/UserService';
import UserModal from '../components/User/UserModal';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstName', label: 'First Name', alignRight: false },
  { id: 'lastName', label: 'Last Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'roles', label: 'Roles', alignRight: false },
  { id: 'temp', alignRight: false },
];

const dialogProps = {
  title: 'Confirm delete',
  content: 'Delete user',
  titleProps: { sx: { fontWeight: 700 } },
  confirmationButtonProps: { color: 'error', variant: 'outlined', sx: { fontWeight: 700 } },
  cancellationButtonProps: { variant: 'outlined', sx: { fontWeight: 700 } },
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
    return filter(array, (_user) => {
      return _user.firstName !== null && _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(-1);
  const [openModal, setOpenModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const confirm = useConfirm();
  const handleOpenModal = () => {
    setOpenModal(true);
    setSelectedUser(-1);
  };
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  }, [showSuccessAlert]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    UserService.getAll(
      (response) => {
        setListUser(response.data.data);
        console.log(listUser);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleOpenMenu = (id) => (event) => {
    setOpen(event.currentTarget);
    setSelectedUser(id);
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
      const newSelecteds = filteredUsers.map((n, index) => index);
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

  const handleSubmit = () => {
    getAllUser();
    console.log('handle submit');
  };

  const handleEditModal = () => {
    setOpenModal(true);
  };

  const handleDeleteModal = () => {
    confirm(dialogProps)
      .then(() => {
        UserService.delete(
          selectedUser,
          (response) => {
            setShowSuccessAlert(true);
            const index = listUser.findIndex((user) => user.id === selectedUser);
            listUser.splice(index, 1);
            handleCloseMenu();
          },
          (error) => {
            console.log(error);
          }
        );
      })
      .catch(() => {});
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listUser.length) : 0;

  const filteredUsers = applySortFilter(listUser, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
            New User
          </Button>
        </Stack>
        {showSuccessAlert && (
          <Alert severity="success" color="info" sx={{ mb: 2 }}>
            Success
          </Alert>
        )}

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listUser.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { id, firstName, lastName, email, roles } = row;
                    const selectedUser = selected.indexOf(index) !== -1;

                    return (
                      <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, index)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={firstName} src="" />
                            <Typography variant="subtitle2" noWrap>
                              {firstName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{lastName}</TableCell>
                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">
                          {roles.map((role) => (
                            <div key={role.name}>{role.name}</div>
                          ))}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu(id)}>
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
            count={listUser.length}
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
        <Button onClick={handleEditModal} startIcon={<Iconify icon="eva:edit-fill" />} sx={{ mr: 2 }} fullWidth>
          Edit
        </Button>
        <Button
          onClick={handleDeleteModal}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
          sx={{ mr: 2, color: 'error.main' }}
          fullWidth
        >
          Delete
        </Button>
      </Popover>

      <UserModal
        selectedUser={selectedUser}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        listUser={listUser}
      />
    </>
  );
}
