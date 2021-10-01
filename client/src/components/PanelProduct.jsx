import * as React from 'react';
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { getProducts, modifyProducts, deleteProducts, mailFav } from '../actions/index';

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
    
    { id: 'name', label: 'Nombre', minWidth: 100, align: 'center' },
    { id: 'category', label: 'Categoria', minWidth: 100, align: 'center' },
    {
      id: 'id',
      label: 'Product Id',
      minWidth: 100,
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

    {
      id: 'button3',
      label: 'Modificar',
      minWidth: 100,
      align: 'center',
    },
    
    
    
    { id: 'image', label: 'Imagen', minWidth: 170, align: 'center' },
    
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
    var allProduct = useSelector(state => state.products)
    const allUsers = useSelector(state => state.user);
    allProduct = allProduct.filter(e => e.user === allUsers._id)
    console.log(allProduct, "allproduct SASASA")
    
    console.log(allUsers, "ALLUSER")
    
    useEffect(() => {
     dispatch(getProducts())
    }, [dispatch]);


    const handleSendEmail = async (id, quantity) => {
      
        if(quantity===0){
          
          await dispatch(mailFav(id))};
        
      
    }

    const handleStock = async (id, image, name, category, quantity, price, description  ) => {
       quantity = quantity + 1
       //arr[i].id, arr[i].image, arr[i].name, arr[i].category[0]?.id, arr[i].quantity, arr[i].price, arr[i].description
       var pro = {
        image: image,
        id: id, 
        name: name, 
        category: category,
        quantity:  quantity,
        price: price,
        description: description
       }
        await dispatch(modifyProducts(id, pro))
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
            category: [product.category[0]?._id, product.category[0]?.name],
            quantity:  product.quantity,
            price: product.price,
            description: product.description
            });
    });
    

    function createData(name, category, id, quantity, button, image, button2, button3) {
     category = category[1]
        return {name, category, id, quantity, button, image, button2, button3};
    }

    let rows = [];
    for (let i = 0; i < arr.length; i++) {
      
        rows.push(createData(
            arr[i].name, 
            arr[i].category, 
            <Link to={`/detail/${arr[i].id}`}>{arr[i].id}</Link>,
            arr[i].quantity, 
           
            <Button variant="outlined" color="success" onClick={() => {handleSendEmail(arr[i].id, arr[i].quantity)
               handleStock(arr[i].id, arr[i].image, arr[i].name, arr[i].category[0]?.id, arr[i].quantity, arr[i].price, arr[i].description  )}}>+1</Button>,
            
            <img alt='img not found' width='50px' height='50px' src={arr[i].image}></img>,
            <Button variant="outlined" color="error" onClick={() => handleDeleteProd(arr[i].id, arr[i])}>BORRAR</Button>,
            <Link to={`/modifyProduct/${arr[i].id}`} style={{textDecoration:"none", color:"white"}}><Button variant="outlined" color="secondary">Modificar</Button></Link>,
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