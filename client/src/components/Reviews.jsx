import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
// import Rating from '../utils/rating';
import { createReview } from '../actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: 'Muy pésimo',
  1: 'Pésimo +',
  1.5: 'Muy malo',
  2: 'Malo',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Bueno',
  4: 'Muy bueno',
  4.5: 'Excelen',
  5: 'Excelente +',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function Reviews({id}){
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const classes = useStyles();
    const store = useSelector(state => state.stores)
    const storeId =  store.map(s=>{
        return s._id
    })
    const history = useHistory()
    console.log(storeId, 'idsto')

    const submitHandler = async (e)=>{
                // e.prevent.default()
                await dispatch(createReview(id, {
                    rating, comment
                }))
                alert('Review creada con éxito');
                console.log(createReview, 'review')
                setRating(0);
                setComment('')
                // history.push('/product')
            }


    return (
        <div> 
            <Link to='/products'>Volver</Link>
            <h2>Deja tu review sobre la Tienda {}</h2>
            {userInfo? (
            <form onSubmit={submitHandler}>
                <div>
                    <h3>Escribele tu review a la tienda</h3>
                </div>
                <div className={classes.root}>
                <Rating
                    name="hover-feedback"
                    value={rating}
                    precision={0.5}
                    // 
                    onChange={(e) => setRating(e.target.value)}
                    onChangeActive={(e) => {
                    setHover(e.target.value);
                    }}
                />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </div>
                {/* <div>
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
                </div> */}
                <div>
                       <label htmlFor="comment">Comment</label>
                       <textarea
                         placeholder="Escribe aquí tu comentario"
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
