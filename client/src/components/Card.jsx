import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMUI from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cartEmpty from '../img/cart-empty.png'
import { Link } from 'react-router-dom';
const useStyles = makeStyles((e) =>({
  root: {
    minWidth: 300,
    marginLeft: "30px",
    margin: "30px 0",
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
    border:"1px solid "+e.palette.primary.main
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
  cardTypo:{
    height:"max-content",
    padding:"3px 5px",
    color:e.palette.primary.dark,
  }
}));
function Card({name, category, price, image, id}) {
    const classes = useStyles();
  
    return (
        <CardMUI 
         
          className={classes.root}>
            <Link to={'/detail/' + id}
           style={{textDecoration:"none"}}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            name={name}
            title={name}
          />
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
          <div className={classes.cardDiv}>
        <Typography
        className={classes.cardTypo}
         variant="body1" color="primary" component="p">
           añadir al carrito 
            </Typography>
          <img src={cartEmpty} className={classes.cart}></img>
        </div>
        </CardActions>
      </CardMUI>
        
    )
}

export default Card
