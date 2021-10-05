import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart, getCartByUser, removeItemFromCart, removeProductFromCart} from '../actions';
import Loading from './Loading'
import { useMercadopago } from "react-sdk-mercadopago";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((e)=>({
    root:{
       
            display:"flex",
            padding:"30px",
            
            flexDirection:"row",
           
            justifyContent:"space-between",
    },
    carts:{
        width:"50%",
        margin:"0 50px",
        padding:"0 30px",
        borderRadius:"10px",
        textAlign:"center",
        
        

       // background:e.palette.primary.light,
        //boxShadow:"5px 5px 13px black",
    },
    cart:{
        display:"flex",
        margin:"30px 10px",
        padding:"30px",
        width:"max-content",
        flexDirection:"row",
        borderRadius:"10px",
        //background:e.palette.secondary.light,
        justifyContent:"space-around",
        background: "linear-gradient(120deg, "+e.palette.secondary.light+" 75%, rgba(255,253,253,1) 75%,  rgba(255,253,253,1) 76%, "+e.palette.secondary.light+" 76%, "+e.palette.secondary.light+ " 78%, rgba(255,253,253,1) 78%)",
        alignContent:"center",
        boxShadow:"2px 2px 5px black"
    },
    image:{
        width: "200px",
        height:"200px",
        borderRadius:"10px",
    },
    quantity:{
        textAlign:"center",
        display: "flex",
        margin:" 40px",
        height:"max-content",
        //  alignContent:"center",
        flexDirection:"column",
        justifyContent:"center"

    },
    ButtonQua:{
        border:"2px solid "+e.palette.secondary.dark,
       color:e.palette.secondary.dark
    },data:{
        display:"flex",
        flexDirection:"column",
        width:"max-content",
        direction:"column",
        flexWrap: "wrap",
        justifyContent:"space-evenly"
    },
    info:{
        color:e.palette.secondary.dark,
        fontSize:"1.3em"
    },
    total:{
      background:"#8881 ",
      textAlign:"center",
      margin:"10px",
      padding:"5px"
    }

}))
const Cart = () => {
    const mercadopago = useMercadopago.v2('TEST-585c1527-f870-4d86-8b32-bf639ae06253', {
        locale: 'en-US'
    });
    const dispatch = useDispatch();
    const myCart = useSelector((state) => state.cart );
    const [loading,setLoading] = useState({
        boolean:false,
        id:""
    });
    const classes = useStyles();
    const [user,setUser]= useState({
        cartId:"",
        country:"",
        city:"",
        postal_code:"",
        address_name:"",
        address_number:""
    });
    
    React.useEffect(() => {
        dispatch(getCartByUser())
        setLoading({
            boolean:false,
            id:""
        }) 
    },[dispatch])

    console.log("my cart: ", myCart);

    const handleAddProductClick = async(id, value) => {
        setLoading({
            boolean:true,
            id
        })
        console.log(id,value);
        await dispatch(addProductToCart(id, parseInt(value)));
        await dispatch(getCartByUser())
    }
    const handleDeleteProductClick = async(id, value) => {
        setLoading({
            boolean:true,
            id
        })
        console.log(id,value);
        await dispatch(removeProductFromCart(id, parseInt(value)));
        await dispatch(getCartByUser())
    }
    const handleRemoveItemClick = async(id, value) => {
        setLoading({
          boolean:true,
          id
        })
        console.log(id,value);
        await dispatch(removeItemFromCart(id, parseInt(value)));
        await dispatch(getCartByUser())
        myCart.items = myCart.items.filter(e => e.product._id !== id)
    }

    // const handlerUserOrder =()=>{
    //     if(infoUser?.ship_info?.length>0){
    //         setUser({
    //             country:infoUser.ship_info.country,
    //             city:infoUser.ship_info.city,
    //             postal_code:infoUser.ship_info.postal_code,
    //             address_name: infoUser.ship_info.address_number,
    //             address_number:infoUser.ship_info.address_name
    //         })    
    //     } 
    // }
    const handlerOnSubmit = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            data: user,
            withCredentials: true,
            url: "http://localhost:3001/order/newOrder"
          })
          .then((res) => {
              console.log("VOLVIO CON: ", res.data)
              if(mercadopago) {
                  console.log("MERCADOPAGO SI")
                  const checkout = mercadopago.checkout({
                      preference: {
                        id: res.data.body.id
                      },
                      autoOpen: true,
                  })
              }
          })
          .catch((err) => {
              console.log(err)
          })
    }
    const handlerOnChange = (e) => {
      console.log(e.target.value)
        setUser((prevState) => {
           
            return {
                ...prevState,
                cartId: myCart._id,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className={classes.root}>
       
           {/* {loading&&<Loading/>}  */}
           <div className={classes.carts} >
            <Typography  variant="h3" component="h4" color="secondary">Mi carrito</Typography>
           {myCart.items?
               myCart.items?.map(item => {
                   return (
                       <div className={classes.cart}>
                        <div className={classes.imageDiv}>

                       <img src={item.product?.image} className={classes.image} alt=''/>
                        </div>
                        <div className={classes.quantity}>
                       <Button variant="outlined" className={classes.ButtonQua} 
                        onClick = {() => handleDeleteProductClick(item?.product?._id, item?.product?.price)}>-</Button>
                       <p className={classes.info} >{item.quantity}</p>
                       <Button variant="outlined" className={classes.ButtonQua} 
                       onClick = {() => handleAddProductClick(item?.product?._id, item?.product?.price)}>+</Button>
                       {loading.boolean && loading.id === item?.product?._id
                       &&
                       <Loading/>
                       }
                       </div>   
                        <div  className={classes.data}>
                         <div>
                       <Typography variant="h6" component="p" className={classes.info} >
                           Subtotal </Typography>
                       <Typography variant="h6" component="p"  >
                         ${item.subTotal}</Typography>
                            </div>
                            <div>
                       <Button variant="contained" color="secondary" 
                       onClick = {() => handleRemoveItemClick(item?.product?._id, item?.product?.price)} >Eliminar producto</Button>
                            </div>
                           
                        </div>
                       </div>
                   )
               })
               :
               <h3>no hay nada en el carrito, o no hay usuario registrado</h3>
            }
</div>
            
        {myCart.items?
      <>
     <div>
    
              <form onSubmit={handlerOnSubmit}>
     <Typography variant="h6" gutterBottom marginTop='0.32em' color="primary">
       Shipping address
     </Typography>
     <Grid container spacing={3}>
       <Grid item xs={12} >
         <TextField
           required
           id="country"
           name="country"
           label="país"
           fullWidth
           onChange={handlerOnChange}
         />
       </Grid>
       <Grid item xs={12} >
         <TextField
           required
           id="city"
           name="city"
           label="ciudad"
           fullWidth
           onChange={handlerOnChange}
         />
       </Grid>
       <Grid item xs={12} sm={4}>
         <TextField
           required
           id="postal_code"
           name="postal_code"
           label="código postal"
           fullWidth
           onChange={handlerOnChange}
         />
       </Grid>
       <Grid item xs={12} sm={4}>
         <TextField
           id="address_name"
           name="address_name"
           label=" dirección"
           fullWidth
           onChange={handlerOnChange}
         />
       </Grid>
       <Grid item xs={12} sm={4}>
         <TextField
           required
           id="address_number"
           name="address_number"
           label="Nº de dirección"
           onChange={handlerOnChange}
         />
       </Grid>
{/*       
       <Grid item xs={12}>
         <FormControlLabel
           control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
           label="dejo esto por las dudas, para un futuro por ahí sirve"
         />
       </Grid> */}
     </Grid>
     <Typography variant="h5" color="primary" className={classes.total} gutterBottom>
      total: ${ myCart.total}</Typography>
     <Button type="submit" color="secondary" variant="outlined"><Typography variant="h6">Pagar</Typography></Button>
     </form>
                 
                </div>
     
     <Button
         style={{height:"min-content"}}
             className={classes.buttonBack}
              variant="contained" color="primary">
                <Link to='/products' style={{textDecoration:"none", color:"white"}}>volver</Link>
                 </Button>

                 </>  
                :<Button
                style={{height:"min-content"}}
                    className={classes.buttonBack}
                     variant="contained" color="primary">
                       <Link to='/products' style={{textDecoration:"none", color:"white"}}>volver</Link>
                        </Button>
  
        }   
          
               
           
     
     
     
        </div>

)}

export default Cart

