import React from 'react';
//import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetail } from '../actions';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((e) => ({
    root: {
        width: "95%",
        margin: "0 auto"
    }, productDes: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },list:{
        color:e.palette.primary.dark,
        background: "linear-gradient(60deg, #ffffff 0%, "+e.palette.primary.light+" 75%, rgba(255,253,253,1) 75%,  rgba(255,253,253,1) 76%, "+e.palette.primary.light+" 76%, "+e.palette.primary.light+ " 78%, rgba(255,253,253,1) 78%)",
    }, orders: {
        
        display: "flex",
        margin: "20px",
        flexWrap:"wrap"
    }, orderN: {
        maxWidth: "600px",
        margin: "0px 20px 100px",
        padding:"20px", 
        background: "#eee",
    }, products: {
        overflow: "auto",
        height: "200px"
    }
    , divItems: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }, itemsP: {
        width: "115px",
    }, pName: {
        color: e.palette.secondary.main

    }, total: {
        fontWeight: "800",
        fontSize:"1.4em"
    },
    divExtra: {
        textAlign: "center"
    }
    , extra: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }, numOfOrder: {
        maxWidth: "600px",
        height: "fit-content"
    }
}))
const MyOrders = () => {
    const user = useSelector(state => state.user);
    const orderDetail = useSelector(state => state.orderDetail);
    const stores = useSelector(state => state.stores)
    const storesId = stores.map((el)=> {
        return el._id
    })
    console.log(storesId, 'storeId')
    const dispatch = useDispatch();
    const classes = useStyles()
    useEffect(() => {
        dispatch(getOrderDetail());
    }, [])

    return (
        <>
            {/* <Button
                style={{ height: "min-content" }}
                variant="contained" color="primary">
                <Link to='/products' style={{ textDecoration: "none", color: "white" }}>Volver</Link>
            </Button>
            <div className={classes.root}>
                <Typography variant="h2"
                 className={classes.list}
                 >Mis compras</Typography>

                <Typography variant="h6"
                
                >Listado de Ordenes</Typography> */}
                <div className={classes.orders}>
                    {
                        orderDetail?.map(order => {
                            return (
                                <>
                                    <div className={classes.orderN}>
                                        <hr></hr>
                                        <div className={classes.productDes}>
                                            <p className={classes.itemsP}>Productos </p>
                                            <p className={classes.itemsP}>cantidad </p>
                                            <p className={classes.itemsP}>subtotal </p>

                                        </div>
                                        <hr></hr>
                                        <div className={classes.products}>
                                            {order.items.map(item => {
                                                return (


                                                    <div className={classes.divItems}>
                                                        <p
                                                            className={classes.itemsP + " " + classes.pName}>
                                                            <Link to={`/detail/${item.product._id}`}
                                                                style={{ textDecoration: "none", color: "inherit" }}
                                                            >{item?.product?.name}</Link>
                                                        </p >
                                                        <p className={classes.itemsP}>
                                                            {item.quantity}</p>
                                                        <p className={classes.itemsP}>
                                                            {item.subTotal}
                                                        </p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <hr />
                                        <div className={classes.divItems}>
                                            <p className={classes.total} >total</p>
                                            <p className={classes.total} >{order.total}</p>
                                        </div>
                                        <hr />
                                        <div className={classes.divExtra}>

                                           
                                                <p style={{fontWeight:"600"}}
                                                >
                                                    número de Orden</p>
                                                <p >
                                                    {order._id}
                                                </p>
                                           
                                                <p style={{fontWeight:"600"}}
                                                >status:</p>
                                            {order.status=="Procesando"?
                                             <p style={{color:"#aa4"}}>
                                                  {order.status}</p>:
                                             <p> {order.status}</p> }

                                                <p style={{fontWeight:"600"}}
                                                >Fecha y hora de la compra:</p>
                                                <p> {order.createdAt}</p>
                                            {order.status=="Completa"?
                                            <Link to={`/${storesId}/reviews`}>
                                            <p>Tienda</p>
                                            </Link>
                                            :null}
                                          
                                         
                                        </div>
                                        <hr></hr>
                                    </div>
                                </>
                            )
                        }
                        )
                    }
                </div>
            
        </>
    )
}


export default MyOrders
