import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteFav } from "../actions";

const FavCard = ({name, description, image, _id, price}) => {
    // const userId = window.localStorage.getItem('userId');
    const wishlist = useSelector(state => state.wishlist)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const deleteOfList = async (id) => {
        await dispatch(deleteFav(id))
    }
    
    console.log('wishFav', wishlist)

    return(
        <div>
        <div>
            {wishlist?.map(p =>{
                return(
                    <div>
                    <img src ={p.product?.image} />
                    <div>{p.product?.name}</div>
                    <div>{p.product?.description}</div>
                    <div>{p.product?.price}</div>
                    <div>{p.product?._id}</div>
                    <button onClick={() => deleteOfList(p.product?._id)}>Eliminar</button>
                    </div>
                )
            })}
        </div>
        <div>
            <Link to={`/detail/${_id}`}>
            <button>Ver detalle</button>
            </Link> 
        </div>
        </div>
    )
}

export default FavCard;
