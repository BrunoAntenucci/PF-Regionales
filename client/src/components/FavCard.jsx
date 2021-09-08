import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteFav } from "../actions";

const FavCard = ({name, price, image, _id, description}) => {
    const userId = window.localStorage.getItem('userId');
    const dispatch = useDispatch();
    const deleteOfList = () => {
        dispatch(deleteFav({userId, productId: _id}))
    }
    
    return(
        <div>
            <Link to={`/detail/:id${_id}`}>
                <img src={image[0]} alt='Favourites'/>
            </Link>
            <div>{name}</div>
            <div>{price}</div>
            <div>
            <Link to={`/detail/:id${_id}`}>
                <button>Ver detalle</button>
            </Link>      
                <button onClick={deleteOfList}>Eliminar</button>  
            </div>
        </div>
    )
}

export default FavCard;