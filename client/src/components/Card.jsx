import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMUI from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import cartEmpty from '../img/cart-empty.png'
import cartStock from '../img/outStock-cart.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Fav from './Fav'; 
//--------IMPORT ACTIONS-----------//
import { addProductToCart } from '../actions/index';

const useStyles = makeStyles((e) =>({
  root: {
    minWidth: 300,
    //marginLeft: "30px",
    margin: "10px",
    height: "fit-content",
    width: 300,
  },
  media: {
    margin:"auto", 
    height: 200,
    width: 200,
    
  },
  cardActions:{
    display: "flex",
    //flexDirection:"row",
    justifyContent: "center",
    margin:"0 6px",
    alignItems:"center",
  },
  cardDiv:{
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"row",
    padding:"3px 10px",
    borderRadius:"10px",
    background:e.palette.primary.light,
    cursor:"pointer",
    border:"1px solid "+e.palette.primary.main,
    
    "&:hover":{

      background:e.palette.primary.superLight,
    
    },
    "&:active":{
      boxShadow:"inset  2px 2px 4px #0005"
    }
    
  },
  cardTypoN:{
    height:"max-content",
    padding:"3px 5px",
    color:e.palette.secondary.red,
    cursor:"default"
    
    
  },
  cardDivN:{
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    flexDirection:"row",
    padding:"3px 10px",
    borderRadius:"10px",
    background:e.palette.primary.light,
   
    border:"1px solid "+e.palette.primary.main,
    

  },
  cart:{
    padding:"7px",
    margin:"0 5px",
    width:"16px",
   
    height:"16px",
    justifySelf: "end",
    background:e.palette.primary.main,
     borderRadius:"50%",
     border:"3px solid white"
    
  },
  cartN:{
    padding:"7px",
    margin:"0 5px",
    width:"16px",
   
    height:"16px",
    justifySelf: "end",
    background:e.palette.primary.main,
     borderRadius:"50%",
     border:"3px solid white"
    
  },
  cardTypo:{
    height:"max-content",
    padding:"3px 5px",
    color:e.palette.primary.dark,
    
  }
}));
function Card({name,category, price, image, quantity, id, description}) {

    const classes = useStyles();
    
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    //console.log(id)

   const handleCartClick = async (id, name, category, price, image, quantity, description) => {
     console.log("AGREGAR A CARRITO STORAGE")
    let historial = { 
        items: [],
        total: 0
    };
    const item = {
        product: {
            _id: id,
            price: parseInt(price),
            name: name,
            description: description,
            image: image,
        },
        quantity: 1,
        subTotal: parseInt(price)
    }

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
        
        <CardMUI  
         className={classes.root}>
          <Fav id={id} />
          <Link to={'/detail/' + id}
           style={{textDecoration:"none"}}>
            
        <CardActionArea>
          {quantity===0?<CardMedia style={{opacity: 0.3}}
            className={classes.media}
            image={image}
            name={name}
            title={name}
            />:
            <CardMedia 
            className={classes.media}
            image={image}
            name={name}
            title={name}
            />
          }
          <CardContent>
            {/* <Typography gutterBottom variant="h5" component="h2">
            {title}
            </Typography> */}
            <Typography variant="h4" color="textSecondary" component="p">
              $ {price} 
            </Typography>
            
            <Typography variant="body1" color="textSecondary" component="p">
            {category}
            </Typography>
          </CardContent>
        </CardActionArea>
        </Link>
        <CardActions className={classes.cardActions}>


          {quantity===0 ? <div className={classes.cardDivN}>
            
          <Typography
        className={classes.cardTypoN}
         variant="body1" color="secondary" component="p">
          SIN STOCK 
            </Typography>
            <img alt="img not found" src={cartStock} className={classes.cartN}></img>
          </div> : 

          <div className={classes.cardDiv}
          onClick={() => handleCartClick(id, name, category, price, image, quantity, description)}>
          
        <Typography
        className={classes.cardTypo}
         variant="body1" color="primary" component="p">
           Añadir al carrito 
            </Typography>
          <img alt="img not found" src={cartEmpty} className={classes.cart}></img>
        </div>}
        
        </CardActions>
      </CardMUI>
        
    )
  }

export default Card
