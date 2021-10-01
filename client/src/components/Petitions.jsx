import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getAllPetitions, acceptPetition, denyPetition } from '../actions';
import Notification from './Notification';
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
    { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
    { id: 'about', label: 'About', minWidth: 100, align: 'center' },
    {
      id: 'id',
      label: 'Petition Id',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'accept_button',
      label: '',
      minWidth: 100,
      align: 'center',
    },
    {
        id: 'deny_button',
        label: '',
        minWidth: 100,
        align: 'center',
      }
  ];

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });


const Petitions = () => {

    const allPetitions = useSelector(state => state.petitions);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const dispatch = useDispatch();

    const handleAccept = async (id) => {
        await dispatch(acceptPetition(id));
        setNotify({
          isOpen: true,
          message: 'Petición aceptada',
          type: 'success'
      })
        await dispatch(getAllPetitions());
    }

    const handleDeny = async (id) => {
        await dispatch(denyPetition(id));
        setNotify({
          isOpen: true,
          message: 'Petición rechazada',
          type: 'error'
      })
        await dispatch(getAllPetitions());
    }

    let arr = [];
    allPetitions.forEach(petition => {
        arr.push({
            name: petition.dataStore?.name || petition.dataProduct?.name || petition.dataCategory?.name, 
            about: petition.about, 
            id: petition._id, 
            status: petition.status});
    });
    console.log(arr);


    function createData(name, about, id, status, accept_button, deny_button) {
        return { name, about, id, status, accept_button, deny_button };
      }

    let rows = [];
    for (let i = 0; i < arr.length; i++) {
        rows.push(createData(
            arr[i].name, 
            arr[i].about, 
            arr[i].id, 
            arr[i].status, 
            <Button variant="outlined" color="success" onClick={() => handleAccept(arr[i].id)}>Aceptar</Button>,
            <Button variant="outlined" color="error" onClick={() => handleDeny(arr[i].id)}>Rechazar</Button>
        ));
    }
    console.log('rows', rows);

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
      </Paper>
    )
}

export default Petitions
