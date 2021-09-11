import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteFav, getFav } from "../actions";

const FavCard = ({name, description, image, _id, price}) => {
    // const userId = window.localStorage.getItem('userId');
    const wishlist = useSelector(state => state.wishlist)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const deleteOfList = () => {
        dispatch(deleteFav({user, productId: _id}))
    }
    
    console.log('wishFav', wishlist)

    return(
        <div>
        <div>
            {wishlist.map(p =>{
                return(
                    <div>
                    <img src ={p.product.image} />
                    <div>{p.product.name}</div>
                    <div>{p.product.description}</div>
                    <div>{p.product.price}</div>
                    <button onClick={deleteOfList}>Eliminar</button>
                    </div>
                )
            })}
        </div>
        <div>
            <Link to={`/detail/:id${_id}`}>
            <button>Ver detalle</button>
            </Link> 
        </div>
        </div>
    )
   
 
}

export default FavCard;

   // return(
    //     <div>
    //         <Link to={`/detail/:id${_id}`}>
    //             <img src={image[0]} alt='Favourites'/>
    //         </Link>
    //         <div>{name}</div>
    //         <div>{price}</div>
    //         <div>{description}</div>
    //         <div>
    //         <Link to={`/detail/:id${_id}`}>
    //             <button>Ver detalle</button>
    //         </Link>      
    //             <button onClick={deleteOfList}>Eliminar</button>  
    //         </div>
    //     </div>
    // )