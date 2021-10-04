import * as React from 'react';
// import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { deleteStore, getStoreAll, reviveStore } from '../actions/index';
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
    { id: 'name', 
      label: 'Nombre', 
      minWidth: 170, 
      align: 'center' },
    {
      id: 'id',
      label: 'Store Id',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'owner',
      label: 'Owner',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'active',
      label: 'Status',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'img',
      label: '',
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

const StoresAdmin = () => {
    const dispatch = useDispatch();
    
    const stores = useSelector(state => state.stores);

    const handleDelete = async (id, active) => {
        if(active === 'Active'){
          await dispatch(deleteStore(id));
        }else{
          await dispatch(reviveStore(id))
        }
          await dispatch(getStoreAll());
    }


    let arr = [];
    stores.forEach(store => {
        arr.push({
            id: store._id, 
            name: store.name, 
            img: store.img,
            owner: store.owner,
            active: store.isActive ? 'Active' : 'Inactive'
    })
    });
    console.log(arr);

    function createData(name, id, img, owner, active, button) {
        return { name, id, img, owner, active, button };
      }

    let rows = [];
    for (let i = 0; i < arr.length; i++) {
        rows.push(createData(
            arr[i].name, 
            arr[i].id,
            <img src={arr[i].img} height='40px' width='70px' alt=''/>,
            arr[i].owner, 
            arr[i].active,  
            <Button variant="outlined" color="error" onClick={() => handleDelete(arr[i].id, arr[i].active)}>Activo/Inactivo</Button>,
            // <Button variant="outlined" color="error">
            //     <Link to = {`/modifycategory/${arr[i].id}`}  style={{textDecoration:"none", }}>Modificar</Link>
            // </Button>

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
}; 


export default StoresAdmin;
