import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { userCheck, logOutMati } from '../actions/index';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import iconUser from '../img/icon-user.png'

const useStyles = makeStyles(theme => ({
    
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
    // const user = useSelector(state => state.user)
    const [log, setLog] = useState(false)

    function logOutButton() {
        dispatch(logOutMati);
    }
    useEffect(() => {
        let verify = async () => {
            const userVerify = await userCheck();
            if(userVerify){
                setLog(true)
            } else setLog(false)
        } 
        verify()
    }, [])

    return(
        <div>
            {log ?     <div>
                <img src={iconUser}  className={classes.iconuser}/>
                <Button  size="small"  className={classes.buttons}>
                    Usuario
                </Button>
                <Button  size="small"  className={classes.buttons}>
                    Favoritos
                </Button>
                <Button  size="small"  className={classes.buttons} onCLick={logOutButton}>
                    Cerrar Sesión 
                </Button>
                    </div> 
                    : 
             <div>
                <Button  size="small" className={classes.buttons}>
                  <Link style={{textDecoration:"none" , color:"white"}} to='/signup' >crear cuenta</Link>
                </Button>
                <Button  size="small" className={classes.buttons}>
                  <Link style={{textDecoration:"none", color:"white"}} to='/signin' >ingresá</Link>  
                </Button>
                  </div> }
        </div>
    )
}

export default User;