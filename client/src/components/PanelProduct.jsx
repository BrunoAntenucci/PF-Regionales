import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUsers, getProducts, modifyProducts, deleteProducts } from '../actions/index';
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
    { id: 'category', label: 'Categoria', minWidth: 100, align: 'center' },
    {
      id: 'id',
      label: 'Product Id',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'quantity',
      label: 'Stock',
      minWidth: 10,
      align: 'center',
    },

    {
      id: 'button',
      label: 'Aumentar Stock',
      minWidth: 100,
      align: 'center',
    },

    {
      id: 'button2',
      label: 'Eliminar',
      minWidth: 100,
      align: 'center',
    },
    
    
    { id: 'image', label: 'img', minWidth: 170, align: 'center' },
    
  ];
  

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

const PanelProduct = () => {
    const dispatch = useDispatch();
    const allProduct = useSelector(state => state.products)
    const allUsers = useSelector(state => state.users);
    
    
    useEffect(async() => {
     dispatch(getProducts())
      
    }, []);


    const handleDelete = async (id) => {
        await dispatch(deleteUser(id));
        await dispatch(getAllUsers());
    }

    const handleStock = async (id, product) => {
       product.quantity = product.quantity + 1
       console.log(product, "panelpro")
        await dispatch(modifyProducts(id, product))
        await dispatch(getProducts())

    }

    const handleStockM = async (id, product) => {
      product.quantity = product.quantity - 1
      console.log(product, "panelpro")
       await dispatch(modifyProducts(id, product))
       await dispatch(getProducts())

   }

   const handleDeleteProd = async (id, product) => {
    
    console.log(product, "panelpro")
     await dispatch(deleteProducts(id, product))
     await dispatch(getProducts())

   }

    let arr = [];
    allProduct.forEach(product => {
      
        arr.push({
            image: product.image,
            id: product._id, 
            name: product.name, 
            category: [product.category[0]._id, product.category[0].name],
            quantity:  product.quantity,
            price: product.price,
            description: product.description
            });
    });
    

    function createData(name, category, id, quantity, button, image, button2) {
     category = category[1]
        return {name, category, id, quantity, button, image, button2};
      }

    let rows = [];
    for (let i = 0; i < arr.length; i++) {
      var pro = {
        image: arr[i].image,
        id: arr[i]._id, 
        name: arr[i].name, 
        category: arr[i].category[0]._id,
        quantity:  arr[i].quantity,
        price: arr[i].price,
        description: arr[i].description
       }
        rows.push(createData(
            arr[i].name, 
            arr[i].category, 
            arr[i].id, 
            arr[i].quantity, 
           
            <Button variant="outlined" color="error" onClick={() => handleStock(arr[i].id, pro)}>+1</Button>,
            <img alt='img not found' width='50px' height='50px' src={arr[i].image}></img>,
            <Button variant="outlined" color="error" onClick={() => handleDeleteProd(arr[i].id, arr[i])}>BORRAR</Button>,
            // <Button variant="outlined" color="error" onClick={() => handleStockM(arr[i].id, arr[i])}>-1</Button>,
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

export default PanelProduct