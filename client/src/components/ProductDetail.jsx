
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { addProductToCart, clearProDetail, getCategories, getProductDetail, getStore } from '../actions/index';

import Notification from './Notification';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import market from '../img/market.png'
import { Typography } from '@material-ui/core';
import cartEmpty from '../img/cart-empty.png'
import iconChange from '../img/change-icon.png'
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';

import Fav from './Fav';
import stores from '../img/stores.svg'

//--------IMPORT ACTIONS-----------//

import Header from './Header';
const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow:" 10px 5px 5px #0002",
      borderRadius:"10px",
      width: "fit-content",
     
      margin:"30px auto",
      padding:"20px",
      background: theme.palette.primary.superLight,


    },
    paper: {
        padding: theme.spacing(1),
        margin:"0",
        color: theme.palette.text.secondary,
        textAlign:"justify"
    },
    image: {
        width:"500px",
        height:"500px",
        borderRadius:"10px",
        //border:"1px solid"+theme.palette.secondary.light  
    },
    imageDiv:{
        padding:" 10px 40px",
    },
    content:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        background: theme.palette.primary.superLight,
        padding:"20px",
        flexWrap:"wrap",
    },
    info:{
        background:"#fff",
        padding:"10px",
        borderRadius:"10px",
        textAlign:"justify",
        margin:"20px 0",
        //border:"1px solid"+theme.palette.primary.main
    },
    cname:{
        fontSize:"26px",
        color:"#333",
        fontFamily:"tahoma"
    },
    cprice:{
        fontSize:"36px",
        color:"black",
        fontFamily:"roboto"
    },
    cpriceoffer:{
        fontSize:"26px",
        color:"red",
        fontFamily:"roboto",
        textDecoration: "line-through"
    },
    buttonBack:{
        padding:"10px",
        margin:"2px 10px",
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
      ,infoStore:{
        margin:"0",
        color:"#eee",
        fontSize:"1em",
        textAlign:"center",
        // position:"absolute",
         //bottom:"300px",
         '@media(max-width: 500px)':{
             // marginLeft: '30px',
             // flexDirection: 'column',
             // width:"450px",
             // height:"400px",
             margin:"0",
        color:"#eee",
        fontSize:"0.9em",
        textAlign:"center",
           }
        },
        storeImg:{
            backgroundImage:`url(${stores})`,
            margin:"auto",
            width:"500px",
              height:"400px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              '@media(max-width: 500px)':{
                  // marginLeft: '30px',
                  flexDirection: 'column',
                  width:"450px",
                  height:"400px",
                  
                }
              
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
           
          },
          infoDiv:{
            position:"relative",
    
            margin:"0 auto",
            top:"69%",
            // left:"80px",
            // right:"80px",
           display:"flex",
             alignContent:"center",
            justifyContent:"center",
            flexDirection:"column",
            width: "fit-content",
            height: "fit-content",
            //border: "1px solid #c3c3c3",
            flexWrap: "wrap",
            '@media(max-width: 500px)':{
                // marginLeft: '30px',
                // flexDirection: 'column',
                // width:"450px",
                // height:"400px",
                top:"69%",
            left:"37%",
           display:"flex",
              }
           
            
        },
  }));

function ProductDetail(props) {

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const dispatch = useDispatch();
    const classes = useStyles();
    const detail = useSelector((state) => state.prodDetail);
    const user = useSelector((state) => state.user);
    const categories = useSelector((state) => state.categories)
    const stores = useSelector((state) => state.stores)
    useEffect(() => {
        dispatch(getProductDetail(props.match.params.id));
        dispatch(getCategories());
        dispatch(getStore());
        return ()=>{
            document.title = "E-Market"
            dispatch(clearProDetail())
        }

    }, [dispatch, props.match.params.id])
    
    

    // }, [dispatch, props.match.params.id])



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

        if (user) {
            dispatch(addProductToCart(item.product._id, parseInt(item.product.price)))
            setNotify({
                isOpen: true,
                message: 'Producto añadido al carrito',
                type: 'success'
            })
        }
        if(!localStorage.history && !user) {
            historial.items.push(item)
            historial.total += item.product.price;
            return localStorage.setItem('history', JSON.stringify(historial));
        } 
        if (localStorage.history && !user) {
            historial = JSON.parse(localStorage.getItem('history'));
            console.log("HISTORIAL: ", historial)
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

    //------------------------------------------------

    return (
        <>

        <Header  searchbar={false}/>


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
                         </div>   

                         <div className={classes.contentRight}>
                            {p.quantity===0?null:<div className={classes.cardDiv}
                                        onClick={() => handleCartClick(detail.product)}>
                                <Typography
                                    className={classes.cardTypo}
                                    variant="body1" color="primary" component="p"                                  
                                >
                                    añadir al carrito
                                </Typography>
                                <img src={cartEmpty} className={classes.cart} alt=''></img>
                            </div>}
                            {user._id && detail.product[0].user === user._id ? 
                                <div className={classes.cardDiv}>
                                    <>
                                    <Typography
                                        className={classes.cardTypo}
                                        variant="body1" color="primary" component="p"                                  
                                    >
                                        <Link to={"/modifyProduct/"+p._id}
                                            style={{textDecoration:"none",color:"inherit"}}>
                                            {'modificar producto'} 
                                        </Link>
                                    </Typography>
                                            {/*le puse la llave mía porque no me mostraba la de material UI*/}
                                    <img src={iconChange?iconChange:BuildOutlinedIcon}
                                        className={classes.cart} alt=''></img>
                                    </>
                                </div> 
                            : null}
                             <div className={classes.info}>  
                                <Grid container spacing={2} direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start">
                                    <Grid item xs>
                                        <h3 className={classes.paper +" "+classes.cname }>{p.name}</h3>
                                        {p.isInOffer ? <h3 className={classes.paper  +" "+classes.cprice} ><Typography  className={classes.cpriceoffer}>${p?.price}</Typography>OFERTA!  ${p?.priceInOffer}</h3> : <h3 className={classes.paper  +" "+classes.cprice} >${p.price}</h3>}
                                            {/* <h3 className={classes.paper  +" "+classes.cprice} >${p.price}</h3> */}
                                            <h3  className={classes.paper  +" "+classes.cquantity} >Stock: {p.quantity===0?<h3 style={{color:"#f50057"}}>No hay stock</h3>:p.quantity}</h3>
                                    </Grid>
                                </Grid>
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
                                    
                            {/* <div style={{display:"flex",margin:"30px",justifyContent:"center" }}>
                        <Button
                className={classes.buttonBack}
                 variant="contained" color="primary">
                   <Link to = '/products' style={{textDecoration:"none", color:"white"}}>lista</Link>
                    </Button>
                    <br/>
                    <br/>
                    <Button
                className={classes.buttonBack}
                 variant="contained" color="primary">
                   <Link to = '/' style={{textDecoration:"none", color:"white"}}>home</Link>
                    </Button>
                    </div> */}
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
             <div style={{margin:"auto"}}>
             <Typography
             style={{textAlign:"center"}}
             className={classes.cardTypo}
             variant="h5" color="primary" component="p"                                  
                                    >Este producto se puede encontrar en las siguientes tiendas</Typography>
            {  stores?.map(store => {
            if(detail?.product?.[0]?.user === store?.owner ){
                return(
                    <>
                   
                  <Link to={`/storedetail/${store._id}`}  style={{textDecoration:"none"}}>
                        <div className={classes.divStore}>
                        <div  className={classes.storeImg}>

                        <section className={classes.infoDiv}>
                        <h4  className={classes.infoStore}>{store.name}</h4>
                        <p  className={classes.infoStore}>{store.description}</p>
                        <p  className={classes.infoStore}
                            style={{marginTop:"10px", color:"yellow"}}
                        >{store.city}</p>
                        </section>
                        </div> 
                        </div>
                        </Link>
                       
                    </>
                )
            }
            
            
        })}
         </div>

        </div>
        <Notification
            notify={notify}
            setNotify={setNotify}
        />
        </>
    )
}

export default ProductDetail
