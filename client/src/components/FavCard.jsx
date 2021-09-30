import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFav, getFav } from "../actions";

const FavCard = ({name, image, price, _id}) => {
   
    const wishlist = useSelector(state => state.wishlist)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getFav())
    }, [])
    async function deleteOfList(e) {
        console.log("ENTRO ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA 1")
        await dispatch(deleteFav(_id))
        window.location.reload();
    }
    console.log('wishFav', wishlist)

    return(
        <div>
            <img src={image} alt="productImg"/>
            <div>{name}</div>
            <div>{price}</div>
            <button onClick={deleteOfList}>Eliminar</button>
        </div>
    )
}

export default FavCard;
