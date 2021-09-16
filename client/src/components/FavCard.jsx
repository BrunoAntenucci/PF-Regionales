import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteFav } from "../actions";

const FavCard = ({id}) => {
   
    const wishlist = useSelector(state => state.wishlist)
    const dispatch = useDispatch();
    
    const deleteOfList =  (e) => {
        dispatch(deleteFav(id))
        //  console.log(idProd, 'id')
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
                    <button onClick={()=>deleteOfList(p.product?._id)}>Eliminar</button>
                    <div>
                    
            <Link to={`/detail/${p.product?._id}`}>
            <button>Ver detalle</button>
            </Link> 
        </div>
                    </div>
                )
            })}
        </div>
       
        </div>
    )
}

export default FavCard;
