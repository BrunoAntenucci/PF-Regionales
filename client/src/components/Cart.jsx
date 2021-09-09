import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart, getCartByUser, postOrder, removeProductFromCart } from '../actions';
import Loading from './Loading'
const Cart = () => {
    const dispatch = useDispatch();
    const myCart = useSelector((state) => state.cart );
    const allProd = useSelector((state) => state.products);
    const [loading,setLoading] = useState(false)
    const infoUser = useSelector((state) => state.user)
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
        //setLoading(true)
    }
    const handleDeleteProductClick = (id, value) => {
        console.log(id,value);
        dispatch(removeProductFromCart(id, parseInt(value)));
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
        <div>
           {loading&&<Loading/>} 
            <Link to ='/products'>Volver</Link>
            <h1>Mi carrito</h1>
           {
               myCart.items?.map(item => {
                   return (
                       <div>
                       <p>{item.product?.image}</p>
                       <button onClick = {() => handleDeleteProductClick(item?.product?._id, item?.product?.price)}>-</button>
                       <p>{item.quantity}</p>
                       <button onClick = {() => handleAddProductClick(item?.product?._id, item?.product?.price)}>+</button>
                       <p>Subtotal: {item.subTotal}</p>
                       <button>Eliminar producto</button>
                       </div>
                   )
               })
            }
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




         
            
               
           
        </div>
    )
}

export default Cart