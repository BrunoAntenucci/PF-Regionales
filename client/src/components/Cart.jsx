import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { addProductToCart, getCartByUser, postOrder, removeProductFromCart } from '../actions';
import Loading from './Loading'
import { useMercadopago } from "react-sdk-mercadopago";
import axios from 'axios';


const useStyles = makeStyles((e)=>({
    root:{
       
            display:"flex",
            padding:"30px",
            
            flexDirection:"row",
           
            justifyContent:"space-between",
    },
    carts:{
        width:"50%",
        margin:"50px",
        padding:"30px",
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
        background:e.palette.secondary.light,
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
        margin:"0 40px",
        height:"min-content",
        alignContent:"center",
        flexDirection:"column",
        justifyContent:"space-evenly"
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
    }

}))
const Cart = () => {
    const mercadopago = useMercadopago.v2('TEST-585c1527-f870-4d86-8b32-bf639ae06253', {
        locale: 'en-US'
    });
    const dispatch = useDispatch();
    const myCart = useSelector((state) => state.cart );
    const allProd = useSelector((state) => state.products);
    const [loading,setLoading] = useState({
        boolean:false,
        id:""
    })
    const infoUser = useSelector((state) => state.user)
    const mercData = useSelector((state) => state.mercData)
    const classes = useStyles()
    const [user,setUser]= useState({
        cartId:"",
        country:"",
        city:"",
        postal_code:"",
        address_name:"",
        address_number:""
    })

    // React.useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "https://sdk.mercadopago.com/js/v2";

    //     script.async = true;
    //     document.body.appendChild(script);

    //     script.onload(() => {
    //     const mp = new MercadoPago('TEST-585c1527-f870-4d86-8b32-bf639ae06253', {
    //         locale: 'es-AR'
    //     });
    //     })
    // }, [])

    // React.useEffect(() => {
    //     dispatch(getCartByUser())
    //     handlerUserOrder()
    //     setUser({
    //         cartId:myCart._id
    //     })
    // },[])
    
    React.useEffect(() => {
        
        // setLoading(false) 
        setLoading({
            boolean:false,
            id:""
        }) 
    },[myCart])


    console.log("my cart: ", myCart);

    const handleAddProductClick = async(id, value) => {
        setLoading({
            boolean:true,
            id
        })
        console.log(id,value);
        await dispatch(getCartByUser())
        await dispatch(addProductToCart(id, parseInt(value)));
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
    const handlerUserOrder =()=>{
        if(infoUser?.ship_info?.length>0){
            setUser({
                country:infoUser.ship_info.country,
                city:infoUser.ship_info.city,
                postal_code:infoUser.ship_info.postal_code,
                address_name: infoUser.ship_info.address_number,
                address_number:infoUser.ship_info.address_name
            })    
        } 
    }
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
        setUser((prevState) => {
            // if(evento.target.name == "nombre"){
            //     return {
            //         ...prevState,
            //         nombre: capitalizarPrimeraLetra(evento.target.value)
            // }
        // }else{
            return {
                ...prevState,
                cartId: myCart._id,
                [e.target.name]: e.target.value
            }
        })
    }

console.log(user)
console.log("info user", infoUser)
    return (
        <div className={classes.root}>
           {/* {loading&&<Loading/>}  */}
           <div className={classes.carts} >
            <Typography  variant="h3" component="h4" color="secondary">Mi carrito</Typography>
           {
               myCart.items?.map(item => {
                   return (
                       <div className={classes.cart}>
                        <div className={classes.imageDiv}>

                       <img src={item.product?.image} className={classes.image}/>
                        </div>
                        <div className={classes.quantity}>
                       <Button variant="outlined" className={classes.ButtonQua} variant="h6"
                        onClick = {() => handleDeleteProductClick(item?.product?._id, item?.product?.price)}>-</Button>
                       <p>{item.quantity}</p>
                       <Button variant="outlined" className={classes.ButtonQua} variant="h6"
                       onClick = {() => handleAddProductClick(item?.product?._id, item?.product?.price)}>+</Button>
                       {loading.boolean && loading.id == item?.product?._id
                       &&
                       <Loading/>
                       }
                       </div>   
                        <div  className={classes.data}>
                         <div>
                       <Typography variant="h6" component="p" >Subtotal </Typography>
                       <Typography variant="h6" component="p" > ${item.subTotal}</Typography>
                            </div>
                            <div>
                       <Button variant="contained" color="secondary" >Eliminar producto</Button>
                            </div>
                           
                        </div>
                       </div>
                   )
               })
            }
            </div>
            <p>Total: {myCart.total}</p>

             <div>
                <h4>info de envío</h4>     
                <form onSubmit={handlerOnSubmit}>
                 <section>
                     {/* <label htmlFor="cartId"></label>
                     <input name="cartId"/>
                     
                     <label htmlFor="shipInfoId"></label>
                     <input name="shipInfoId"/> */}

                     <label htmlFor="country">country</label>
                     <input name="country" onChange={handlerOnChange}/>

                     <label htmlFor="city">city</label>
                     <input name="city" onChange={handlerOnChange}/>

                     <label htmlFor="postal_code">postal code</label>
                     <input name="postal_code" onChange={handlerOnChange}/>

                     <label htmlFor="address_name">address name</label>
                     <input name="address_name" onChange={handlerOnChange}/>

                     <label htmlFor="address_number">address number</label>
                     <input name="address_number" onChange={handlerOnChange}/>
                    </section>
                    <button type="submit">Pagar</button>
                    </form>
                    
            </div>
            <Button
            style={{height:"min-content"}}
                className={classes.buttonBack}
                 variant="contained" color="primary">
                   <Link to='/products' style={{textDecoration:"none", color:"white"}}>volver</Link>
                    </Button>
               
           
        </div>
    )
}

export default Cart