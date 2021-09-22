import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import  React from 'react';

const useStyles = makeStyles((e)=>({ 
  root:{
    background:e.palette.primary.main,
    height:"100px",
    width:"100%",
    display:"flex",
   
  },
  title:{
    alignSelf: "flex-end",
    color:"white",
    fontWeight: "500",
    padding:"10px 30px",
    letterSpacing:".5px",
    height:"fit-content"
  }
  
  }))
function Header(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>

  
    <Typography className={classes.title}
    variant="h4">
      Admin Pannel
    </Typography>
    </div>
  );
}



export default Header;