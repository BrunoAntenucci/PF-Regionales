import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { getCategories, getProductDetail } from '../actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import market from '../img/market.png'
import { Button, Typography } from '@material-ui/core';
import cartEmpty from '../img/cart-empty.png'
import iconChange from '../img/change-icon.png'
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import Reviews from './Reviews';
import Fav from './Fav';


//--------IMPORT ACTIONS-----------//
import { addProductToCart, removeProductFromCart } from '../actions/index';
const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow:" 10px 5px 5px #0002",
      borderRadius:"10px",
      width: "fit-content",
      margin:"30px auto",
      padding:"20px",
      background:"#eee",
    },
    paper: {
      padding: theme.spacing(1),
      margin:"0",
      textAlign: 'center',
      color: theme.palette.text.secondary,
      textAlign:"justify"
    },
    image: {
        width:"500px",
        height:"500px",
        borderRadius:"10px",
        border:"1px solid"+theme.palette.secondary.light  
    },
    imageDiv:{
        padding:" 10px 40px",
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
    cname:{
        fontSize:"22px",
        color:"#333",
        fontFamily:"tahoma"
    },
    cprice:{
        fontSize:"36px",
        color:"black",
        fontFamily:"roboto"
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
        border:"1px solid "+theme.palette.primary.main
      },
      cart:{
        padding:"7px",
        margin:"0 5px",
        width:"16px",
       
        height:"16px",
        justifySelf: "end",
        background:theme.palette.primary.main,
         borderRadius:"50%",
         border:"3px solid white"
        
      },
      cardTypo:{
        height:"max-content",
        padding:"3px 5px",
        color:theme.palette.primary.dark,
      }
  }));

function ProductDetail(props) {

    const classes = useStyles();
    const history = useHistory();
    const detail = useSelector((state) => state.prodDetail);
    console.log(detail, "detallewqsdqwd")
    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        
    }, [dispatch])
    useEffect(() => {
        var product =   detail?.product?.find( e => e)
        document.title = product?.name
        return(()=>{
            document.title = "E-Market"
            
        })
    }, [detail?.product])

    const categories = useSelector((state) => state.categories)
    
    useEffect(() => {
        dispatch(getProductDetail(props.match.params.id));
    },[dispatch, props.match.params.id]);

    const handleCartClick = (detail) => {
        let historial = [];

        if(!localStorage.getItem('history')) {
            historial.push(detail[0]);
            localStorage.setItem('history', JSON.stringify(historial));
        } else {
            historial = JSON.parse(localStorage.getItem('history'));

            if(!historial.some(p=> detail.map(pd => pd._id).includes(p._id)) ) {
                historial.push(...detail);
            }
    
            localStorage.setItem('history', JSON.stringify(historial));
        }
        console.log(JSON.parse(localStorage.getItem('history')))
    }
    
    //---------------LOCAL STORAGE--------------------
    // useEffect(() => {
    //     const localStorageContent = localStorage.getItem('history');

    // let historial;
    // if(!localStorageContent) {
    //     historial = [];
    // } else {
    //     historial = JSON.parse(localStorageContent);
    // }
    // console.log('history', localStorageContent);
    // console.log('historial', historial);

    // if(!historial.some(p=> detail.product.map(pd => pd._id).includes(p._id)) ) {
    //     historial.push(...detail.product);
    // }
    
  
    // localStorage.setItem('history', JSON.stringify(historial));
    // }, [detail.product])
    
    //------------------------------------------------

    return (
        <div className={classes.root}>
            {}
            <Fav id={props.match.params.id} />
            {
                detail.product?.map((p,i) => {
                    return (

                        <div className={classes.content} key={i}>
                        <div className={classes.contentLeft}>       
                    <div className={classes.imageDiv}>                       
                <img src={p?.image?p.image:market} className={classes.image} alt="producto"/>
               
                        </div>
                       
                        <Button
                className={classes.buttonBack}
                 variant="contained" color="primary">
                   <Link to = '/products' style={{textDecoration:"none", color:"white"}}>volver</Link>
                    </Button>
                   
                         </div>     
                         <div className={classes.contentRight}>     
                         <div className={classes.cardDiv}
                                        >
                                <Typography
                                    className={classes.cardTypo}
                                    variant="body1" color="primary" component="p"                                  
                                    >
                                        <Link to={"/modifyProduct/"+p._id}
                                        style={{textDecoration:"none",color:"inherit"}}>
                                   modificar producto
                                   </Link>
                                        </Typography>
                                        {/*le puse la llave mía porque no me mostraba la de material UI*/}
                                    <img src={iconChange?iconChange:BuildOutlinedIcon}
                                     className={classes.cart}></img>
                                    </div>
                             <div className={classes.info}>  
                            <Grid container spacing={2} direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start">
                                <Grid item xs>
                                    <h3 className={classes.paper +" "+classes.cname }>{p.name}</h3>
                                    <h3 className={classes.paper  +" "+classes.cprice} >${p.price}</h3>
                                    
                                        <h3  className={classes.paper  +" "+classes.cquantity} >Stock: {p.quantity===0?<h3 style={{color:"red"}}>No hay stock</h3>:p.quantity}</h3>
                                    
                                    
                                    
                                </Grid>
                            </Grid>
                            </div>
                            <div className={classes.info}>
                            <h3 className={classes.paper}>Usuario: usuario</h3>
                                    <h3 className={classes.paper}>puntuación: 5</h3>
                            
                            </div>
                            <div className={classes.info}>
                            <h3 className={classes.paper}>Categoria: 
                              <ul className={classes.paper} >{p.category.map((e,i) => {
                                            const aux = categories.find(i => i._id === e)
                                            return aux?<p key={i}>{aux.name}</p>:null
                                        })}</ul>
                              </h3>
                                    <h3 className={classes.paper}>{p.description}</h3>

                            </div>
                                    
                            {p.quantity===0?null:<div className={classes.cardDiv}
                                        onClick={() => handleCartClick(detail.product)}>
                                <Typography
                                    className={classes.cardTypo}
                                    variant="body1" color="primary" component="p"                                  
                                    >
                                    añadir al carrito
                                        </Typography>
                                    <img src={cartEmpty} className={classes.cart}></img>
                                    </div>}
                                {/* {product._id && (
                                    <Reviews
                                        id={product._id}
                                        setUpdateReview={setUpdateReview}
                                        updateReview={updateReview}
                                        allReviews={product.reviews}
                                        userOrder={userOrder}
                                    />
                                )} */}
                            
                            </div>
                                        

                        </div>
                    )
                             })
            }
        </div>
    )
}

export default ProductDetail
