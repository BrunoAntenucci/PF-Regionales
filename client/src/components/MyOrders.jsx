import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetail } from '../actions';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core/styles/createTypography';

const useStyles = makeStyles(()=>({
    
}))
const MyOrders = () => {
    const user = useSelector(state => state.user);
    const orderDetail = useSelector(state => state.orderDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetail());
    },[])
    
    return (
        <div>
            <h1>Mis compras</h1>
            <Button
            style={{height:"min-content"}}
                 variant="contained" color="primary">
                   <Link to='/products' style={{textDecoration:"none", color:"white"}}>Volver</Link>
                    </Button>
            <h3>Listado de Ordenes</h3>
           {
               orderDetail.map(order => {
                   return(
                       <>
                       <hr></hr>
                       <p>Numero de orden: {orderDetail.map(item => item._id)}</p>
                       <p>Fecha y hora de la compra: {order.createdAt}</p>
                       <p>Productos: {order.cart?.items.map(item => {return(
                           <>
                            <Link to={`/detail/${item.product._id}`}>{item?.product?.name}</Link>
                            <p>Cantidad: {item.quantity}</p>
                            </>
                       )} )}
                       </p>
                       <hr></hr>
                        </>
                    )
                }
               )
            }
        </div>
               )
}


export default MyOrders
