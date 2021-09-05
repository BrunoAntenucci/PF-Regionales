import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMUI from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    margin: "20px"
  },
  media: {
    height: 300,
  },
});
function Card({name, category, price, image}) {
    const classes = useStyles();
    return (
        <CardMUI className={classes.root}>
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
        <CardActions>
          
          
        </CardActions>
      </CardMUI>
        
    )
}

export default Card
