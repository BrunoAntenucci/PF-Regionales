import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetail } from '../actions';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core/styles/createTypography';

const useStyles = makeStyles(()=>({
    root:{
        width:"70%",
        margin:"0 auto"
    },productDes:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around"
    },orders:{
        maxWidth:"600px"
    }
    ,divItems:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around"
    },itemsP:{
        width:"150px",
    },pName:{
        
       
    },total:{
        fontWeight:"800"
    },
    divExtra:{
       textAlign:"center"
    }
    ,extra:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center" 
    },numOfOrder:{
        maxWidth:"600px",
        height:"fit-content"
    }
}))
const MyOrders = () => {
    const user = useSelector(state => state.user);
    const orderDetail = useSelector(state => state.orderDetail);
    const dispatch = useDispatch();
   const classes = useStyles()
    useEffect(() => {
        dispatch(getOrderDetail());
    },[])
    
    return (
        <div className={classes.root}>
            <h1>Mis compras</h1>
            <Button
            style={{height:"min-content"}}
                 variant="contained" color="primary">
                   <Link to='/products' style={{textDecoration:"none", color:"white"}}>Volver</Link>
                    </Button>
            <h3>Listado de Ordenes</h3>
            <div className={classes.orders}>
           {
               orderDetail.map(order => {
                   return(
                       <>
                       <hr></hr>
                       <div className={classes.productDes}> 
                       <p className={classes.itemsP}>Productos: </p>
                       <p className={classes.itemsP}>cantidad: </p>
                       <p className={classes.itemsP}>subtotal: </p>
                    
                       </div>
                       <hr></hr>
                            {order.cart?.items.map(item => {return(
                       
                           
                           <div className={classes.divItems}>
                               <p className={classes.itemsP +" "+classes.pName}>
                            <Link to={`/detail/${item.product._id}`}>{item?.product?.name}</Link>
                            </p >
                            <p className={classes.itemsP}>
                                {item.quantity}</p>
                                <p className={classes.itemsP}>
                                {item.subTotal}
                                </p>
                           </div>
                       )} )}
                      <hr/>
                      <div className={classes.divItems}>
                      <p className={classes.total} >total</p>
                        <p className={classes.total} >{order.cart.total}</p>
                        </div>
                      <hr/>
                      <div className={classes.divExtra}>

                      <div className={classes.extra}>
                      <p>
                           número de Orden</p>
                            <p >
                           { order._id}
                           </p>
                           </div>
                           <div className={classes.extra}>
                           <p>Fecha y hora de la compra:</p>
                       <p> {order.createdAt}</p>
                       </div>
                       </div>
                       <hr></hr>
                        </>
                    )
                }
               )
            }
            </div>
        </div>
               )
}


export default MyOrders
