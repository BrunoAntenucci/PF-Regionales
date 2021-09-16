import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteFav, getFav } from "../actions";

const FavCard = ({name, image, price, _id}) => {
   
    const wishlist = useSelector(state => state.wishlist)
    const dispatch = useDispatch();
    
    const deleteOfList =  (e) => {
        dispatch(deleteFav(_id))
        console.log(deleteFav, 'te despacho')
        //  console.log(idProd, 'id')
    }
    useEffect(()=>{
        dispatch(getFav())
    }, [])
    console.log('wishFav', wishlist)

    return(
        <div>
        <div>
            {wishlist?.map(p =>{
                return(
                    <div>
                        <img src={image} />
                        <div>{name}</div>
                        <div>{price}</div>
                    <button onClick={deleteOfList}>Eliminar</button>
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
