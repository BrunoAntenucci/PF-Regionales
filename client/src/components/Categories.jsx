import * as React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { deleteCategory, getCategories } from '../actions/index';
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
    { id: 'name', label: 'Nombre', minWidth: 170, align: 'center' },
    {
      id: 'id',
      label: 'Category Id',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'buttonD',
      label: '',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'buttonM',
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

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);

    const handleDelete = async (id) => {
        await dispatch(deleteCategory(id));
        await dispatch(getCategories());
    }


    let arr = [];
    categories.forEach(cat => {
        arr.push({
            id: cat._id, 
            name: cat.name, 

    })
    });
    console.log(arr);

    function createData(name, id, buttonD, buttonM) {
        return { name, id, buttonD, buttonM};
      }

    let rows = [];
    for (let i = 0; i < arr.length; i++) {
        rows.push(createData(
            arr[i].name, 
            arr[i].id, 
            <Button variant="outlined" color="error" onClick={() => handleDelete(arr[i].id)}>Eliminar</Button>,
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


export default Categories;
