import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrderById } from '../actions/index';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const useStyles = makeStyles((e)=>({
      root:{
        margin: "80px 0"
      },styledTableRow:{
          width:"fit-content    "
      }
  }))

const OrderDetail = (props) => {
    console.log('props',props);
    const dispatch = useDispatch();
    const orderById = useSelector(state => state.orderId); 
    const classes = useStyles()
    console.log('order_detail',props.idOrder)

    
    useEffect(() => {
        console.log('id antes de action',props.idOrder);
        dispatch(getOrderById(props.idOrder));
        // return(async ()=>{
        //     await dispatch(getOrderById(props.idOrder)); 
        // })
    },[dispatch, props.idOrder]);
    

    return (
        
        <TableContainer component={Paper} className={classes.root}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" scope="row">ORDER DETAIL</StyledTableCell>
                </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">
                            Order id: {orderById._id}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">
                            Order status: {orderById.status}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">
                            Order owner: {orderById.owner?.email}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">
                            Created at: {orderById.createdAt}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">
                            Updated at: {orderById.updatedAt}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">
                            Order total: $ {orderById.total}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component="th" scope="row">Order items</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {orderById.items?.map(item => {
                            return (
                                <>
                                    <StyledTableRow 
                                    className={classes.styledTableRow}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell component="th" scope="row">Product id: <Link to={`/detail/${item.product}`}>{item.product}</Link></StyledTableCell>
                                        <StyledTableCell component="th" scope="row">Quantity: {item.quantity}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">Subtotal: $ {item.subTotal}</StyledTableCell>
                                    </StyledTableRow>
                                </>
                            )
                        })}
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrderDetail
