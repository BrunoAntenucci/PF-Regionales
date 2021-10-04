import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { getFav, deleteFav } from '../actions/index';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Typography }  from '@material-ui/core';
import Header from "./Header";

const columns = [
  { id: 'name', label: 'Nombre', minWidth: 170, align: 'center' },
  {
    id: 'id',
    label: 'Product Id',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'price',
    label: 'Precio ($)',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'image',
    label: '',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'remove_button',
    label: '',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'detail_button',
    label: '',
    minWidth: 100,
    align: 'center',
  },
];

const useStyles = makeStyles({
  root: {
    width: '95%',
    marginLeft: '40px'
  },
  container: {
    maxHeight: 440,
  },
  goBackBtn: {
    padding: '10px',
    marginLeft: '40px',
    marginBottom: '30px'
  }
});

const Favourites = () => {
 
    const wishlist = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    useEffect(async () => {
     await dispatch(getFav());
      
    }, [dispatch])

    const handleDelete = async (id) => {
      await dispatch(deleteFav(id));
      await dispatch(getFav());
  }


    let arr = [];
    wishlist.forEach(fav => {
          arr.push({
            name: fav.product.name, 
            id: fav.product._id,
            price: fav.product.price,
            image: fav.product.image
          });
      });
      console.log(arr);

    function createData(name, id, price, image, remove_button, detail_button) {
        return { name, id, price, image, remove_button, detail_button };
      }

    let rows = [];
    for (let i = 0; i < arr.length; i++) {
        rows.push(createData(
            arr[i].name, 
            arr[i].id,
            arr[i].price, 
            <img alt='img not found' width='50px' height='50px' src={arr[i].image}></img>,
            <Button variant="outlined" color="success"><Link to={`/detail/${arr[i].id}`} style={{textDecoration:"none",  color:"inherit"}}>Ver detalle</Link></Button>,
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
      <>
          <div marginTop="30px">
          <Header  searchbar={false}/>
          </div>
          <div>
          <Typography 
            variant="h3" 
            component="h4" 
            color="primary" 
            align="center"
            marginTop="30px"
            marginBottom="30px"
          >Mis Favoritos</Typography>
          <Button
                  className={classes.goBackBtn}
                  style={{
                    marginLeft: '40px',
                    marginBottom: '30px'
                  }}
                  variant="outlined" 
                  color="primary" 
          ><Link to={`/products`} style={{textDecoration:"none",  color:"inherit"}}> Volver </Link>
          </Button>
        
      </div>
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
      </>
    );
};

export default Favourites;