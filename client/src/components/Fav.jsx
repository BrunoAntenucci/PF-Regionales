import React, { useEffect } from 'react';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFav, deleteFav, getFav } from '../actions';
import Notification from './Notification';

export default function Fav ({id}) {
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
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
            setNotify({
                isOpen: true,
                message: 'Producto añadido a Favoritos',
                type: 'success'
            })
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
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}
