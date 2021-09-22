import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import iconUser from '../img/icon-user.png';
import Cart from './Cart';

import { getCartByUser } from '../actions/index';
import axios from 'axios';

//-------Menu desplegable-----------//
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';


//import axios from 'axios';

//------IMPORT ACTIONS------//
import { checkUser, logOut } from '../actions/index';

const useStyles = makeStyles(theme => ({
    root: {
  
     
      color:"#8C4A3C",
     backgroundColor:theme.palette.primary.dark,
     // padding:"10px",
      margin: "0px auto 0px",
      borderRadius:"5px",
      display:"flex",
      justifyContent:"space-between",
      flexDirection:"row",
      alignContent:"center"
      
    },
   
    buttons:{
      
      color:"#fff",
      padding:"0 8px",
      borderRadius:"5px"
     // height:"max-content",
      
    },paper:{
      width: "max-content"
    },tabs:{
      
      padding:"0 10px"
    },formControl:{
      margin:"0 10px",
      minWidth: 120,
    
    },
  
    selectEmpty: {
      marginTop: theme.spacing(2),
    },iconuser:{
      width:"20px",
      height:"20px",
      margin:"auto",
      borderRadius:"50%",
      color:"white",
      border:"2px solid black",
      marginRight: "6px"
    }
  }));

  //-----------Menu desplegable----------//
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      borderRadius: '5px'
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
  //---------------------------------------------//
  
    
  

const User = () => {
    //---------------Menu desplegable----------
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    //-------------------------------



    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(checkUser())
    }, [])


    // function handleCheckGuest(e) {
    //   e.preventDefault();
    //   dispatch(checkUser())
    // }
    function handleLogOut(e) {
      dispatch(logOut())
      window.location.reload(false);
    }
    function handleClearStorage(e) {
      e.preventDefault();
      localStorage.clear();
    }
    function handleCheckStorage(e) {
      e.preventDefault();
      const history = JSON.parse(localStorage.getItem('history'));
      console.log(history)
    }

    function handleClickCart(e) {
      e.preventDefault();
      dispatch(getCartByUser())
    }
  

    console.log("USER: ", user)

    return(
        <div className={classes.root}>
          {/* <button onClick={handleCheckStorage}>Check STORAGE</button>
          <button onClick={handleClearStorage}>Clear STORAGE</button> */}
            {/* <button onClick={handleCheckGuest}>USER CHECK</button> */}
            {user ? <>
                {/* <img src={iconUser}  className={classes.iconuser}/>
                <Button  size="small"  className={classes.buttons}>
                  <Link to='/profile' style={{textDecoration:"none" , color:"white"}}>
                    {user.first_name}   
                    </Link>                
                </Button>
                <Button  size="small"  className={classes.buttons}>
                <Link style={{textDecoration:"none" , color:"white"}} to='/favourites' >
                    Favoritos </Link>
                </Button>
                <Button  size="small"  className={classes.buttons} onClick={handleLogOut}>
                    Cerrar Sesión 
                </Button> */}
                {/* Menu desplegable */}
                <Button
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  <img src={iconUser}  className={classes.iconuser}/>
                  {user.first_name}
                </Button>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem>
                    <ListItemIcon>
                      <FavoriteIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/favourites" style={{textDecoration:"none",  color:"inherit"}}>
                    <ListItemText primary="Favoritos" />
                    </Link>
                  </StyledMenuItem>
                  

                  <StyledMenuItem onClick={handleClickCart} >
                    <ListItemIcon >
                      <ShoppingCartIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/cart" style={{textDecoration:"none", color:"inherit"}}>
                    <ListItemText primary="Mi carrito" />
                    </Link>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemIcon>
                      <AssignmentIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/admin" style={{textDecoration:"none",  color:"inherit"}}>
                    <ListItemText primary="Admin panel" />
                    </Link>
                  </StyledMenuItem>
                  <StyledMenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar Sesión" />
                  </StyledMenuItem>
                </StyledMenu>
                    </> : 
             <>
                <Button  size="small" className={classes.buttons}>
                  <Link style={{textDecoration:"none" , color:"white"}} to='/signup' >
                      crear cuenta </Link>
                </Button>
                <Button  size="small" className={classes.buttons}>
                  <Link style={{textDecoration:"none", color:"white"}} to='/signin'>
                      ingresá</Link>  
                </Button>
                  </> }
        </div>
    )
}

export default User;