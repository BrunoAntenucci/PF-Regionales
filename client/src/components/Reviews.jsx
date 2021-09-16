import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../utils/rating';
import { createReview, getStoreReview } from '../actions/index';
import {FaStar} from 'react-icons/fa';

export default function Reviews(){
    const dispatch = useDispatch();
    const stores = useSelector(state => state.stores);
    const userInfo = useSelector(state => state.user)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const submitHandler = async (id)=>{
                // e.prevent.default()
                await dispatch(createReview(id, {
                    rating, comment
                }))
                alert('Review creada con éxito');
                console.log(createReview, 'review')
                setRating(0);
                setComment('')
            }


    return (
        <div> 
            <h2>Deja tu review sobre la Tienda</h2>
            {userInfo? (
            <form onSubmit={submitHandler}>
                <div>
                    <h3>Escribele tu review a la tienda</h3>
                </div>
                <div>
                <label htmlFor="rating">Puntuación</label>
                       <select id="rating" value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                           <option value="">Elige</option>
                           <option value="1">1- Muy Mala</option>
                           <option value="2">2- Mala</option>
                           <option value="3">3- Buena</option>
                           <option value="4">4- Muy buena</option>
                           <option value="5">5- Excelente</option>
                       </select>
                </div>
                <div>
                       <label htmlFor="comment">Comment</label>
                       <textarea
                         id="comment"
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                       ></textarea>
                </div>
                <div>
                       <label />
                       <button className="primary" type="submit">
                         Enviar
                       </button>
                     </div>
            </form>
         ): null}
            
        </div>
    )
}
// export default function Reviews({id}){
//     const [reputation, setReputation] = useState(0);
//     const [comment, setComment] = useState('');
//     const dispatch = useDispatch();

//     const myStore = useSelector(state => state.myStore);
//     const { loading, reviews} = myStore

//     const user = useSelector(state => state.user);
//     // console.log(user, 'user')
//     const review = useSelector(state => state.review)
//     const { succes: successRew } = review;
//     console.log(review, 'review')

//     useEffect(()=> {
//         if(successRew){
//             alert('Review creada con éxito');
//             setReputation(0)
//             setComment('')
//             // return dispatch(getStore)
//         }
//         // dispatch(getStoreReview(id))
//         // console.log(getStoreReview, 'getstore')
//     }, [dispatch, successRew])

//     const submitHandler = (e)=>{
//         e.prevent.default()
//         dispatch(createReview(id, {
//             reputation, comment
//         }))
//         console.log(createReview, 'review')
//     }

//     return(
//         <div>
//             <h2>Reviews</h2>
//             {myStore.reviews.length === 0 ? (<h4>No hay reviews aún</h4>) : null}
//             {myStore.reviews.map((review) => (
//                 <div>
//                     <h3>{review.name}</h3>
//                     <Reputation value={review.reputation}/>
//                     <p>{review.createdAt.substring(0, 10)}</p>
//                     <p>{review.comment}</p>
//                 </div>
//                 )         
//             )}
//         {user? (
//             <form onSubmit={submitHandler}>
//                 <div>
//                     <h3>Escribele tu review a la tienda</h3>
//                 </div>
//                 <div>
//                 <label htmlFor="reputation">Reputación</label>
//                        <select id="rating" value={reputation}
//                         onChange={(e) => setReputation(e.target.value)}>
//                            <option value="">Elige</option>
//                            <option value="1">1- Muy Mala</option>
//                            <option value="2">2- Mala</option>
//                            <option value="3">3- Buena</option>
//                            <option value="4">4- Muy buena</option>
//                            <option value="5">5- Excelente</option>
//                        </select>
//                 </div>
//                 <div>
//                        <label htmlFor="comment">Comment</label>
//                        <textarea
//                          id="comment"
//                          value={comment}
//                          onChange={(e) => setComment(e.target.value)}
//                        ></textarea>
//                 </div>
//                 <div>
//                        <label />
//                        <button className="primary" type="submit">
//                          Enviar
//                        </button>
//                      </div>
//             </form>
//         ): null}
//         </div>
//     )
// }
