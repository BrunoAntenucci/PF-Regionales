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
const useStyles = makeStyles({
  root: {
    minWidth: 300,
    margin: "20px",
    height: "fit-content",
    width: 300,
  },
  media: {
    margin:"auto", 
    height: 200,
    width: 200,
  },
  cart:{
    width:"20px",
    height:"20px",
    justifySelf: "end"
  }
});
function Card({name, category, price, image, id}) {
    const classes = useStyles();
    console.log(id)
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
        <CardActions>
          
          <img src={cartEmpty} className={classes.cart}></img>
        </CardActions>
      </CardMUI>
        
    )
}

export default Card
