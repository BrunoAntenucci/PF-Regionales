import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@mui/icons-material/Menu';
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
  },
  hamburguesita:{
    display:"none !important",
   
    '@media(max-width: 800px )':{
      width: "1.5em !important",
      height: "1.5em !important",
      margin:"10px !important",
      color:"white !important",
      alignSelf:"flex-end !important",
    display:"inline-block !important",
    cursor:"pointer"
    
     }
  }
  
  }))
function Header(props) {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>

    <MenuIcon className={classes.hamburguesita}
    onClick={() =>{
      if(!props.mobile){
        props.setMobile(true)
      }else{
        props.setMobile(false)
      }
      console.log(props.mobile)
    }}
    />
    <Typography className={classes.title}
    variant="h4">
      Admin Pannel
    </Typography>
    </div>
  );
}



export default Header;