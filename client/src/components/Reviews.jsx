import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { createReview, getStoreReview, checkUser } from '../actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Notification from './Notification';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

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
  root:{
    margin:"30px auto",
    width:"fit-content",
},
card:{
    // display:"flex",
    margin:"30px auto",
    width:"600px",
    padding: "40px",
    borderRadius: "20px",
    boxShadow:"3px 3px 3px #0003"
},
});

export default function Reviews(props){
    
    const dispatch = useDispatch();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
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

    
    const review = {first_name: userInfo.first_name, user: userInfo._id, rating, comment, id}
    console.log(review, 'review')

    const submitHandler =   (e)=>{
                // e.prevent.default()
                dispatch(createReview(id, review))
                console.log(createReview, 'review')
                //alert(`${userInfo.first_name} Gracias por tu review!`);
                setNotify({
                  isOpen: true,
                  message: `${userInfo.first_name} Gracias por tu review!`,
                  type: 'info'
              })
                history.push('/products')
            }


    return (
      <div className={classes.root}>
      <div className={classes.card}>
        <Button style={{height:"min-content", marginTop:"5px", marginBottom: "60px"}} variant="contained" color="primary">
          <Link to='/products' style={{textDecoration:"none", color:"white"}}>volver</Link>
        </Button>
          
            {userInfo? (
            <form onSubmit={submitHandler}>
                <Typography variant="h4" gutterBottom >
                   Deja tu review sobre la Tienda {store.name}
                    </Typography>

                <div className={classes.root}>
                <Rating
                    size="large"
                    name="hover-feedback"
                    value={rating}
                    precision={0.5}
                    // 
                    onChange={(e) => setRating(e.target.value)}
                    onChangeActive={(e) => {
                    setHover(e.target.value);
                    }}
                />
                {rating !== null && <Box align="center" ml={100}>{labels[hover !== -1 ? hover : rating]}</Box>}
                </div>

                <div>
                <Grid item xs={12} sm={6}>
                
                <TextField 
                        multiline
                        rows={10}
                        variant="outlined"   
                        style={{ width: 500, height: 250 }}
                         placeholder=" Escribe aquí tu comentario..."
                         id="comment"
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                       /> 
                </Grid>        
                </div>
                <div>
                       <label />
                       <Button variant="contained" className={classes.button} type="submit">
                         Enviar
                       </Button>
                     </div>
            </form>
         ): null}
            
        </div>
        <Notification
        notify={notify}
        setNotify={setNotify}
      />
        </div>
    )
}


