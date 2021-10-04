import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getStoreById, getProducts } from '../actions'

import Card from '../components/Card'
import Loading from './Loading'

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Fragment } from 'react';
import { Button, Typography } from '@material-ui/core';
import iconChange from '../img/change-icon.png'
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow:" 10px 5px 5px #0002",
        borderRadius:"10px",
        width: "fit-content",
        height:"100vh",
        margin:"30px auto",
        padding:"20px",
        background:"#eee",
    },
    titular: {
        marginLeft: '10px',
        padding: "10px 20px",
        marginBottom: '0px',
        textAlign:"center",
        color:theme.palette.primary.dark,
        borderBottom:"2px solid "+theme.palette.primary.dark,
        borderRadius:"2px",
        background: "linear-gradient(60deg, #ffffff 0%, "+theme.palette.primary.light+" 75%, rgba(255,253,253,1) 75%,  rgba(255,253,253,1) 76%, "+theme.palette.primary.light+" 76%, "+theme.palette.primary.light+ " 78%, rgba(255,253,253,1) 78%)",
    },
    buttonback: {
        display: "flex",
        justifyContent: "left",    
        background:"#eee",
        alignItems: 'left',
    },
    storedetails: {
        display: "flex",
        justifyContent: "left",
        alignItems: 'space-around',
        flexDirection:"row",
        background:"#eee",
        padding: "10px",
    },
    revdet: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'space-around',
        flexDirection:"row",
        background:"#eee",
        padding: "10px"
    },
    revbox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection:"column",
        background:"#eee",
        padding: "10px",
        color: theme.palette.text.secondary,

    },
    paper: {
        padding: theme.spacing(1),
        margin:"0",
        color: theme.palette.text.secondary,
        textAlign:"justify"
    },
    text:{   
        color:theme.palette.text.secondary,
    },
    image: {
        width:"450px",
        height:"275px",
        borderRadius:"5px",
        border:"1px solid"+theme.palette.secondary.light  
    },
    imageDiv:{
        padding:" 0px 20px",
    },
    gridCard:{
        minWidth:"350px",
        maxWidth:"400px"
    },
    products:{
        background:"#eee",
        maxWidth: "4000px",
        minWidth:"450px",
        height: '600%',
        display:"flex",
        flexWrap:"wrap",
        paddingBottom:"300px"
    },
    revDiv:{
        display: "flex",
        alignItems: 'center',
        flexDirection:"column",
        background:"#eee",
        padding: "10px",
        color: theme.palette.text.secondary,
    },
    content:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    info:{
        background:"#fff",
        padding:"10px",
        borderRadius:"10px",
        textAlign:"justify",
        margin:"20px 0",
        border:"1px solid"+theme.palette.primary.main
    },
    buttonBack:{
        padding:"10px",
        margin:"2px 40px",
    },
    cardDiv:{
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        flexDirection:"row",
        padding:"3px 10px",
        borderRadius:"10px",
        background:theme.palette.primary.light,
        cursor:"pointer",
        border:"1px solid "+theme.palette.primary.main,
        "&:hover":{
            background:theme.palette.primary.superLight,
        },
        "&:active":{
            boxShadow:"inset  2px 2px 4px #0005"
        }
      },
      cart:{
        padding:"7px",
        margin:"0 5px",
        width:"16px",
        height:"16px",
        justifySelf: "end",
        background:theme.palette.primary.main,
        borderRadius:"50%",
        border:"3px solid white",
        cursor:"pointer",
      },
      cardTypo:{
        height:"max-content",
        padding:"3px 5px",
        color:theme.palette.primary.dark,
      }
  }));

export default function StoreDetail(props){
    const dispatch = useDispatch();
    const classes = useStyles();

    const detail = useSelector((state) => state.storeDetail);
    console.log(detail, 'DETAIL')
    console.log(detail._id, 'id')
    const categories = useSelector((state) => state.categories);
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);


    const ownProducts = products.filter(e => detail?.products?.includes(e._id) ? e : null);

    console.log(ownProducts, 'OWN')

    useEffect(()=> {
        dispatch(getStoreById(props.match.params.id));
        dispatch(getProducts())
    }, [dispatch, props.match.params.id])

    const HandleHistoryOnClick=(name,price,category,image,id,quantity)=>{
        var historyArray= [];
        
        
       // var historyArraySTringify = JSON.stringify(historyArray)
        if(!localStorage.getItem("historyProducts")){
            historyArray.push({name,price,category,image,id,quantity })
            localStorage.setItem("historyProducts", JSON.stringify(historyArray))
        }else{
            historyArray = JSON.parse(localStorage.getItem("historyProducts"))
            if(historyArray.some(e => e.id === id)) {
                historyArray = historyArray.filter(e => e.id!==id)
            }
            historyArray.push({name,price,category,image,id, quantity })
            
            localStorage.setItem("historyProducts", JSON.stringify(historyArray))
        }
       
      
        
        console.log( JSON.parse(localStorage.getItem("historyProducts")))
    }   

    return (
        <div>
            <div> 
            <div className={classes.titular}>

                <Typography 
                variant="h3" 
                ml={1}>
                {detail.name}
                </Typography>
            </div>
            <div className={classes.revdet}>
                
                <div className={classes.storedetails}>
                    <div className={classes.imageDiv}>
                        <img className={classes.image} src={detail.img} alt=''/>
                    </div>
                    <div className={classes.text}>
                        <Typography
                            
                            variant="h5" 
                            ml={1}>    
                            {detail.name}
                        </Typography>
                        <Typography 
                            variant="h6" 
                            ml={1}>
                            {detail.description}
                        </Typography>
                        <Typography 
                            variant="h6" 
                            ml={1}>
                            {detail.address}
                        </Typography>
                        <Typography 
                            variant="h6" 
                            ml={1}>
                            {detail.city}
                        </Typography>
                        <Typography 
                            variant="h6" 
                            ml={1}>
                            Reputacion: {detail.reputation}
                        </Typography>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        {user._id && detail.owner === user._id ? 
                            <div className={classes.cardDiv}>
                                <>
                                    <Typography
                                        className={classes.cardTypo}
                                        variant="body1" color="primary" component="p"                                  
                                    >
                                    <Link to={`/modifystore/${detail.id}`}
                                        style={{textDecoration:"none",color:"inherit"}}>
                                        {'modificar tienda'} 
                                    </Link>
                                    </Typography>
                                        {/*le puse la llave mía porque no me mostraba la de material UI*/}
                                        <img src={iconChange?iconChange:BuildOutlinedIcon}
                                        alt=''
                                        className={classes.cart}></img>
                                    </>
                            </div>
                        : null}    
                    </div>

                        
                        </div>
                        <div className={classes.revDiv}>
                            <Typography 
                                variant="h5" 
                                ml={1}>
                            Reviews
                        </Typography>
                    
                            {detail.reviews ? detail.reviews.map(review => {
                                    return(
                                        <div className={classes.revbox}>
                                            <Box component="fieldset" mb={0} ml={0} border="none">
                                            {/* <Typography component="legend">Read only</Typography> */}
                                            <Rating name="read-only" value={review.rating} readOnly />
                                            </Box>
                                            <Typography 
                                                variant="h7" 
                                                ml={1}>
                                                {review.first_name}:    
                                            </Typography>
                                            <br/>
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
                            }) : null}
                            <Link to={`storedetail/${detail._id}/reviews`}>
                                                <p>Dejar Review</p>
                                            </Link>
                </div>
            </div>
            <div className={classes.buttonback}>
                <Button
                            
                            style={{height:"min-content", marginLeft: "40px"}}
                            variant="contained" color="primary">
                            <Link to='/stores' style={{textDecoration:"none", color:"white"}}>volver</Link>
                </Button>
            </div>
            <Grid container direction="row"
                justifyContent="center"
                alignItems="flex-start"
                className={classes.products}>
            {ownProducts?.length > 0 ? ownProducts.map((p, i) => {
                    
                    return (
                        
                        <Fragment key={i}>
                            
                             
                               
                                    <Grid item xs={6} className={classes.gridCard}>     

                                    <div 

                                    // onClick={e => {HandleHistoryOnClick(
                                    //     e,
                                    //     p?.name,
                                    //     p?.price,
                                    //     p?.category,
                                    //     p?.image,
                                    //     p?._id
                                    //     )}}
                                        > 
                                    
                                            <h3>{p?.id}</h3>

                                                <Card                    
                                                    name= {p?.name}
                                                    price={p?.price}
                                                    quantity={p?.quantity}
                                                    category={p?.category.map((e, k) => {
                                                        const aux = categories.find(i => i._id === e)
                                                        return <p key={k}>{aux?.name}</p>
                                                    })}
                                                    image={p?.image }

                                                    id={p?._id}
                                                    onClick={e => {HandleHistoryOnClick(
                                                        e,
                                                        p?.name,
                                                        p?.price,
                                                        p?.category,
                                                        p?.image,
                                                        p?._id
                                                        )}}
                                                    />
                                        </div>

                                    </Grid>
                                
                            
                        </Fragment>
                    )
                })
                : <Loading/>
            }
            </Grid>
             <Footer/>

     </div>
        </div>
    )

}
