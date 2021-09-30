import React, { useEffect } from 'react';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFav, deleteFav, getFav } from '../actions';

export default function Fav ({id}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const wishlist = useSelector(state => state.wishlist);
    const [fav, setFav] = useState(false)
 
    //console.log(wishlist, 'wish')

    const handleFavClick =   (e) => {
        //e.preventDefault();
        if(!user) return alert('Debes loguearte primero')
        if(user) {
            dispatch(addFav(id))
            setFav(true)
        }
    }
    const handleDeleteFav = async(e) => {
        await dispatch(deleteFav(id))
        await setFav(false)
    }
    return(
            <div>
                {!fav? (<div>
                    <buton onClick={handleFavClick}>
                        <AiOutlineHeart className='fav' />
                    </buton>
                    </div>)
                    : (<div>
                    <buton onClick={handleDeleteFav}>
                        <AiFillHeart className='fav' />
                    </buton></div>)
                }  
        </div>
    )
}
