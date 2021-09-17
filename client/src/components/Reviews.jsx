import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { createReview, getStoreReview, checkUser } from '../actions/index';
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

export default function Reviews(props){
    
    const dispatch = useDispatch();
    
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(-1);
    const classes = useStyles();

    const userInfo = useSelector(state => state.user)
    console.log(userInfo, 'user')

    const store = useSelector(state => state.store)

    console.log(props)
  
    const { id } = props.match.params
    const history = useHistory()
    
    useEffect(()=> {
        dispatch(getStoreReview(id))
    }, [dispatch, id])

    useEffect(()=> {
        dispatch(checkUser())
    }, [dispatch])

    
    const review = {first_name: userInfo.first_name, user: userInfo._id, rating, comment}
    console.log(review, 'review')

    const submitHandler =  async (e)=>{
                e.prevent.default()
                await dispatch(createReview(id, review))
                console.log(createReview, 'review')
                alert(`${userInfo.first_name} Gracias por tu review!`);
    
                history.push('/product')
            }


    return (
        <div> 
            <Link to='/products'>Volver</Link>
            <h2>Deja tu review sobre la Tienda {store.name}</h2>
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
                {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
                </div>

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


