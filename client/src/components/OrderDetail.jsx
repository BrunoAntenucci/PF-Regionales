import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getOrderById } from '../actions/index';

const OrderDetail = (props) => {
    const dispatch = useDispatch();
    const orderById = useSelector(state => state.orderId); 

    console.log('order_detail',orderById)

    useEffect(() => {
        console.log('id antes de action',props.match.params.id);
        dispatch(getOrderById(props.match.params.id));
    },[]);

    return (
        <div>
            <h1>Detalle de la orden</h1>
            {
                <>
                <p>Order id: {orderById._id}</p>
                <p>Order status: {orderById.status}</p>
                <p>Order owner: {orderById.owner.email}</p>
                <p>Created at: {orderById.createdAt}</p>
                <p>Updated at: {orderById.updatedAt}</p>
                <p>Order total: $ {orderById.total}</p>
                <p>Order items: {orderById.items.map(item => {
                    return (
                        <>
                            <p>Product id: {item.product}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Subtotal: $ {item.subTotal}</p>
                        </>
                    )
                })}</p>
                </>
            }
        </div>
    )
}

export default OrderDetail
