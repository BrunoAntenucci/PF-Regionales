import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import iconUser from '../img/icon-user.png'
//------IMPORT ACTIONS------//
import { checkUser, logOut } from '../actions/index';

const useStyles = makeStyles(theme => ({
    root: {
  
      width:"90%",
      color:"#8C4A3C",
     backgroundColor:theme.palette.primary.dark,
      padding:"10px",
      margin: "0px auto 0px",
      borderRadius:"5px",
      display:"flex",
      justifyContent:"space-between",
      flexDirection:"row",
      
    },
   
    buttons:{
      
      color:"#fff",
      padding:"0 8px"
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
      border:"2px solid black"
    }
  }));

const User = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    useEffect(() => {
      dispatch(checkUser())
    }, [])


    function handleCheckGuest(e) {
      e.preventDefault();
      dispatch(checkUser())
    }
    function handleLogOut(e) {
      dispatch(logOut())
      window.location.reload(false);
    }

    console.log("USER: ", user)

    return(
        <div>
            <button onClick={handleCheckGuest}>USER CHECK</button>
            {(user) ? <>
                <img src={iconUser}  className={classes.iconuser}/>
                <Button  size="small"  className={classes.buttons}>
                    {user.first_name}
                </Button>
                <Button  size="small"  className={classes.buttons}>
                    Favoritos
                </Button>
                <Button  size="small"  className={classes.buttons} onClick={handleLogOut}>
                    Cerrar Sesión 
                </Button>
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