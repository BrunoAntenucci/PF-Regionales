import React from 'react';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {store} from 'react-notifications-component';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../actions';

export default function Fav ({_id}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const wishlist = useSelector(state => state.wishlist);
    const [fav, setFav] = useState(false)
    
    console.log(wishlist, 'wish')

    const handleFavClick =   (id) => {
        if(!user) return alert('Debes loguearte primero')
        if(user) {
        //   dispatch(addFav({userId, productId: _id}))
        //  wish? dispatch(deleteFav(id)) : dispatch(addFav(id))
        dispatch(addFav(id))
        setFav(true)
        }
    }
    const handleDeleteFav = (id) => {
        dispatch(deleteFav(id))
    }

    return (
        <div>
            {!fav? (<div>
                    <buton onClick={() => handleFavClick(_id)}>
                    <AiOutlineHeart className='fav' />
                    </buton>
                </div>): (<div>
                    <button onClick={() => handleDeleteFav(_id)}>
                    <AiFillHeart className='fav' />
                    </button></div>)
            }
          
        </div>
    )
}
