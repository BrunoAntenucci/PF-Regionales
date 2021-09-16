import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUsers } from '../actions/index';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const columns = [
    { id: 'first_name', label: 'First Name', minWidth: 170, align: 'center' },
    { id: 'last_name', label: 'Last Name', minWidth: 170, align: 'center' },
    {
      id: 'id',
      label: 'User Id',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'role',
      label: 'Role',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'button',
      label: 'Eliminar',
      minWidth: 100,
      align: 'center',
    },
  ];
  

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

const Users = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.users);

    const handleDelete = async (id) => {
        await dispatch(deleteUser(id));
        await dispatch(getAllUsers());
    }

    let arr = [];
    allUsers.forEach(user => {
        arr.push({
            id: user._id, 
            firstName: user.first_name, 
            lastName: user.last_name, 
            role: user?.role});
    });
    console.log(arr);

    function createData(first_name, last_name, id, role, button) {
        return { first_name, last_name, id, role, button };
      }

    let rows = [];
    for (let i = 0; i < arr.length; i++) {
        rows.push(createData(
            arr[i].firstName, 
            arr[i].lastName, 
            arr[i].id, 
            arr[i].role, 
            <Button variant="outlined" color="error" onClick={() => handleDelete(arr[i].id)}>Eliminar</Button>
        ));
    }
    console.log(rows);

    const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


    return (
        <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    )
}

export default Users
