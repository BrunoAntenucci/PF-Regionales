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

    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const detail = useSelector((state) => state.prodDetail);
    const user = useSelector(state => state.user)

    function handleClick(e) {
        e.preventDefault();
        history.push('/products')
    }


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

    const handleCartClick = async (detail) => {
        let historial = { 
            items: [],
            total: 0
        };
        const item = {
            product: {
                _id: detail[0]._id,
                price: parseInt(detail[0].price),
                name: detail[0].name,
                description: detail[0].description,
                image: detail[0].image,
            },
            quantity: 1,
            subTotal: parseInt(detail[0].price)
        }
        // const item = {
        //     _id: detail[0]._id,
        //     price: parseInt(detail[0].price),
        //     name: detail[0].name,
        //     description: detail[0].description,
        //     image: detail[0].image,
        //     subTotal: parseInt(detail[0].price),
        //     quantity: 1
        // }
        if (user) {
            dispatch(addProductToCart(item.product._id, parseInt(item.product.price)))
        }
        if(!localStorage.history && !user) {
            historial.items.push(item)
            historial.total += item.product.price;
            return localStorage.setItem('history', JSON.stringify(historial));
        } 
        if (localStorage.history && !user) {
            historial = JSON.parse(localStorage.getItem('history'));
            // if(!historial.some(p=> detail.map(pd => pd._id).includes(p._id)) ) {
            //     historial.push(...detail);
            // }
            for (var i=0; i<historial.items.length; i++) {
                if (historial.items[i].product._id === item.product._id) {
                    historial.items[i].quantity++;
                    historial.items[i].subTotal += item.product.price;
                    historial.total += item.product.price;
                    return localStorage.setItem('history', JSON.stringify(historial));
                } 
            }
            historial.total += item.product.price;
            historial.items.push(item)
            localStorage.setItem('history', JSON.stringify(historial));
        }
    }

    const handleRemoveCart = (detail) => {
        let historial = { 
            items: [],
            total: 0
        };
        const item = {
            product: {
                _id: detail[0]._id,
                price: parseInt(detail[0].price),
                name: detail[0].name,
                description: detail[0].description,
                image: detail[0].image,
            },
            quantity: 1,
            subTotal: parseInt(detail[0].price)
        }
        if (user) {
            dispatch(removeProductFromCart(item.product._id, parseInt(item.product.price)))
        }
        if(!localStorage.history && !user) {
            console.log("No hay localStorage ni User. Nada que hacer")
        } 
        if (localStorage.history && !user) {
            console.log("Hay Storage sin User.")
            historial = JSON.parse(localStorage.getItem('history'));
            for (var i=0; i<historial.items.length; i++) {
                if (historial.items[i].product._id === item.product._id) {
                    historial.items[i].quantity--;
                    historial.items[i].subTotal -= item.product.price;
                    historial.total -= item.product.price;
                    if (historial.items[i].quantity === 0) {
                        historial.items.splice(i, 1);
                    }
                    console.log("Producto eliminado");
                    i=-1;
                    return localStorage.setItem('history', JSON.stringify(historial));
                }
            }
            console.log("No existe ese producto en el LocalStorage")
        }
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
                             <div className={classes.info}>  
                            <Grid container spacing={2} direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start">
                                <Grid item xs>
                                    <h3 className={classes.paper +" "+classes.cname }>{p.name}</h3>
                                    <h3 className={classes.paper  +" "+classes.cprice} >${p.price}</h3>
                                    
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
                                    
                                        <div className={classes.cardDiv}
                                        onClick={() => handleCartClick(detail.product)}>
                                <Typography
                                    className={classes.cardTypo}
                                    variant="body1" color="primary" component="p"                                  
                                    >
                                    añadir al carrito
                                        </Typography>
                                    <img src={cartEmpty} className={classes.cart}></img>
                                    </div>
                                    <div className={classes.cardDiv}
                                        onClick={() => handleRemoveCart(detail.product)}>
                                <Typography
                                    className={classes.cardTypo}
                                    variant="body1" color="primary" component="p"                                  
                                    >
                                    Remover del carrito
                                        </Typography>
                                    <img src={cartEmpty} className={classes.cart}></img>
                                    </div>
                                
                            
                            </div>
 

                        </div>
                    )
                             })
            }
        </div>
    )
}

export default ProductDetail
