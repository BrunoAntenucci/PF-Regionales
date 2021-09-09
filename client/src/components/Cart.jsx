import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart, removeProductFromCart } from '../actions';

const Cart = () => {
    const dispatch = useDispatch();
    const myCart = useSelector((state) => state.cart );
    const allProd = useSelector((state) => state.products);
    //console.log(myCart);

    const handleAddProductClick = (id, value) => {
        console.log(id,value);
        dispatch(addProductToCart(id, parseInt(value)));
    }
    const handleDeleteProductClick = (id, value) => {
        console.log(id,value);
        dispatch(removeProductFromCart(id, parseInt(value)));
    }

    return (
        <div>
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
            <button>Pagar</button>
            
               
           
        </div>
    )
}

export default Cart