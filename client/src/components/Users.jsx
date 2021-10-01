import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, reviveUser, getUsers } from '../actions/index';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
//-----Alert-----------------------------
import Notification from './Notification';
import ConfirmDialog from './ConfirmDialog';
import ActionButton from './ActionButton';
//---------------------------------------
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
    { id: 'first_name', label: 'Nombre', minWidth: 170, align: 'center' },
    { id: 'last_name', label: 'Apellido', minWidth: 170, align: 'center' },
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
      id: 'active',
      label: 'Status',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'button',
      label: '',
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

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.users);

    const handleDelete = async (id, active) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
      if(active === 'Active'){
        await dispatch(deleteUser(id));
        setNotify({
          isOpen: true,
          message: 'User deactivated successfully',
          type: 'success'
      })
      }else{
        await dispatch(reviveUser(id));
        setNotify({
          isOpen: true,
          message: 'User activated successfully',
          type: 'success'
      })
      }
        await dispatch(getUsers());
    }

    let arr = [];
    allUsers.forEach(user => {
        arr.push({
            id: user._id, 
            firstName: user.first_name, 
            lastName: user.last_name, 
            role: user?.role,
            active: user.isActive ? 'Active' : 'Inactive'
          })
    });
    console.log(arr);

    function createData(first_name, last_name, id, role, active, button) {
        return { first_name, last_name, id, role, active, button };
      }

    let rows = [];
    for (let i = 0; i < arr.length; i++) {
        rows.push(createData(
            arr[i].firstName, 
            arr[i].lastName, 
            arr[i].id, 
            arr[i].role,
            arr[i].active, 
            arr[i].active === 'Active' ? 
            <ActionButton
              color="secondary"
              onClick={() => {
                  setConfirmDialog({
                      isOpen: true,
                      title: 'Are you sure you want to deactivate this user?',
                      subTitle: "",
                      onConfirm: () => { handleDelete(arr[i].id, arr[i].active) }
                  })
              }}
            >Active | Inactive</ActionButton>
            : 
            <ActionButton
              color="secondary"
              onClick={() => {
                  setConfirmDialog({
                      isOpen: true,
                      title: 'Are you sure you want to activate this user?',
                      subTitle: "",
                      onConfirm: () => { handleDelete(arr[i].id, arr[i].active) }
                  })
              }}
            >Active | Inactive</ActionButton>
        ));
    }
    

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
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
      />
    </Paper>
    
    )
}

export default Users
