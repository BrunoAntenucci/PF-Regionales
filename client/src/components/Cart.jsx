import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart, getCartByUser, postOrder, removeProductFromCart } from '../actions';
import Loading from './Loading'


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
        flexDirection:"column"
    },
    ButtonQua:{
        borderColor:e.palette.secondary.dark
    }

}))
const Cart = () => {
    const dispatch = useDispatch();
    const myCart = useSelector((state) => state.cart );
    const allProd = useSelector((state) => state.products);
    const [loading,setLoading] = useState(false)
    const infoUser = useSelector((state) => state.user)
    const classes = useStyles()
    const [user,setUser]= useState({
        cartId:"",
        country:"",
        city:"",
        postal_code:"",
        address_name:"",
        address_number:""
    })
    //console.log(myCart);

    const handleAddProductClick = (id, value) => {
        console.log(id,value);
        dispatch(addProductToCart(id, parseInt(value)));
        dispatch(getCartByUser())
        //setLoading(true)
    }
    const handleDeleteProductClick = (id, value) => {
        console.log(id,value);
        dispatch(removeProductFromCart(id, parseInt(value)));
        dispatch(getCartByUser())
        //setLoading(true)
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
        console.log(user)
        dispatch(postOrder(user))
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
                [e.target.name]: e.target.value
            }
        })
    }

    React.useEffect(() => {
        dispatch(getCartByUser())
        handlerUserOrder()
        setUser({
            cartId:myCart._id
        })
    },[])
    
    React.useEffect(() => {
        
        // setLoading(false) 
        setLoading(true) 
    },[myCart])


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
                       <Button variant="outlined" className={classes.ButtonQua}
                        onClick = {() => handleDeleteProductClick(item?.product?._id, item?.product?.price)}>-</Button>
                       <p>{item.quantity}</p>
                       <Button variant="outlined" className={classes.ButtonQua}
                       onClick = {() => handleAddProductClick(item?.product?._id, item?.product?.price)}>+</Button>
                       </div>   
                        <div  className={classes.data}>
                       <p>Subtotal: {item.subTotal}</p>
                       <Button variant="contained" color="secondary" >Eliminar producto</Button>
                           
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
                    <button>Pagar</button>
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