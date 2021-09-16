import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Reviews from './Reviews';
import { getStore } from '../actions';
import { useEffect } from 'react';
import Rating from '../utils/rating';
import {FaStar} from 'react-icons/fa';
import StartRating from '../utils/StartRating';

export default function FakeStore () {
    const dispatch = useDispatch();
    const allStores = useSelector(state => state.stores);
    console.log(allStores, 'stores')

    useEffect(() => {
        dispatch(getStore());
    },[dispatch])

    return(
        <div>
        {
            allStores.map(store => {
                    return(
                        <>
                        <section>
                        <h4 >{store.name}</h4>
                        <p>{store.description}</p>
                        <p>{store.city}</p>
                        <h4>* Reviews *</h4>
                        {store?.numReviews  === 0 ? (<p>No hay reviews aún</p>) : 
                        (<div><p>{store.numReviews} reviews </p></div>)}
                        {store.reviews.map(review => {
                            return(
                                <div>
                                    {/* <Rating value={review.reputation}/> */}
                                    <p>{review.rating}</p> <FaStar />
                                    <Rating value={review.rating}/>
                                    <p>{review.first_name}</p>
                                    <p>{review.comment}</p>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                </div>
                            )
                        })}
                        
                        </section>
                        
                        </>
             ) } )           
        }                
        </div>
    )
}

