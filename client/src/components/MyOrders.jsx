import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetail } from '../actions';
import { useEffect } from 'react';

const MyOrders = () => {
    const user = useSelector(state => state.user);
    const orderDetail = useSelector(state => state.orderDetail);
    const stores = useSelector(state => state.stores)
    const storesId = stores.map((el)=> {
        return el._id
    })
    console.log(storesId, 'storeId')
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
                       <p>Tienda {stores.map(store => {
                           return (
                               <p>{store._id}</p>
                           )
                       })} </p>
                       <Link to={`/store/${storesId}/review`}>Dejar review</Link>
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
