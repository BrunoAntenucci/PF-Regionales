import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStore } from '../actions';
import { Button } from '@material-ui/core';
import stores from '../img/stores.svg'
import { makeStyles } from '@material-ui/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((e)=>({
    root:{
        display:"flex",
        flexDirection:"row",
        //flexWrap:"wrap",
        //width:"80%",
    },
    storeImg:{
      backgroundImage:`url(${stores})`,
      width:"800px",
        height:"600px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    divStores:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
       
        alignContent:"center",
       justifyContent:"center",
       // width:"80%",
       background:"#eee",
       borderRadius:"10px"
    },
    divStore:{
     
    },info:{
       margin:"0",
       color:"#eee",
       fontSize:"1.5em",
       textAlign:"center"
       // position:"absolute",
        //bottom:"300px"
    },
    infoDiv:{
        position:"relative",
        top:"75%",
        left:"37%",
       display:"flex",
         alignContent:"center",
        justifyContent:"center",
        flexDirection:"column",
        width: "fit-content",
        height: "fit-content",
        //border: "1px solid #c3c3c3",
        display: "flex",
        flexWrap: "wrap",
        
    },
    title:{
        borderTop:"1px solid"+e.palette.primary.dark,
   textAlign:"center",
   color:"#fff",
   padding:"30px",
   background:"linear-gradient( "+e.palette.primary.main+" 70%, #eee)"
    },
    revDiv:{
        display: "flex",
       marginTop: "100px",
        alignItems: 'center',
        flexDirection:"column",
        background:"#eee",
        padding: "10px",
        color: e.palette.text.secondary,
        border: "1px solid #c3c3c3"

    },
    revbox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection:"column",
        background:"#eee",
        padding: "10px",
        color: e.palette.text.secondary,

    }
}))
const Stores = () => {
    const dispatch = useDispatch();
    const allStores = useSelector(state => state.stores);
    console.log(allStores, 'stores')
    const classes = useStyles()

    useEffect(() => {
        dispatch(getStore());
    },[dispatch])


    return (
        <>
            <Button
         style={{height:"min-content", marginTop:"20px"}}
         
              variant="contained" color="primary">
                <Link to='/' style={{textDecoration:"none", color:"white"}}>volver</Link>
                 </Button>
        <div className={classes.root}>
            <div style={{ marginTop:"50px"}}>
                <Typography variant="h2" className={classes.title}>
                    Tiendas
                    </Typography>
                
                 <div  className={classes.divStores}>
            {
                allStores.map(store => {
                    return(
                        <>
                        <Link to={`/storedetail/${store._id}`}  Style={{textDecoration:"none"}}>
                        <div className={classes.divStore}>
                        <div  className={classes.storeImg}>

                        <section className={classes.infoDiv}>
                        <h4  className={classes.info}>{store.name}</h4>
                        <p  className={classes.info}>{store.description}</p>
                        <p  className={classes.info}
                            style={{marginTop:"10px", color:"yellow"}}
                        >{store.city}</p>
                        </section>
                        </div> 
                        </div>
                        </Link>

                        <div className={classes.revDiv}>
                        <Typography 
                            variant="h5" 
                            ml={1}>
                            Reviews
                        </Typography>
                        
                        {store?.numReviews  === 0 ? 
                        (<Typography 
                            variant="h7" 
                            ml={1}>No hay reviews aún </Typography>) : 
                        (<div><Typography 
                            variant="h7" 
                            ml={1}>{store.numReviews} reviews  </Typography></div>)}
                       
                        {store.reviews.map(review => {
                            return(
                                <div className={classes.revbox}>
                                    <Typography 
                                                variant="h7" 
                                                ml={1}>
                                                {review.first_name}:    
                                            </Typography>
                                            <br/>
                                    
                                    <Box component="fieldset" mb={0} borderColor="transparent">
                                        {/* <Typography component="legend">Read only</Typography> */}
                                        <Rating name="read-only" value={review.rating} readOnly />
                                    </Box>
                                    <Typography 
                                                variant="h7" 
                                                ml={1}>
                                                "{review.comment}"
                                    </Typography>
                                    <br/>
                                    <Typography 
                                                variant="h7" 
                                                ml={1}>
                                                {review.createdAt.substring(0, 10)}
                                    </Typography>    
                                </div>
                            )
                        })}
                        </div>
                        
                        
                        
                        </>
                    )
                })
            }</div>
            </div>
          
                 </div>
            
                 </>
        
    )
}

export default Stores

// {store.reviews.map(review => {
//     return(
//         <div>
//             <p> {review.first_name}</p>
//             <Box component="fieldset" mb={0} borderColor="transparent">
//                 {/* <Typography component="legend">Read only</Typography> */}
//                 <Rating name="read-only" value={review.rating} readOnly />
//             </Box>
//             <p>{review.comment}</p>
//             <p>{review.createdAt.substring(0, 10)}</p>
//         </div>
//     )
// })}