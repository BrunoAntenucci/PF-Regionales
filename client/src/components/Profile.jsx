import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../actions';
import { Link } from 'react-router-dom';

import NavBar from './Navbar';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button:{
        height:"fit-content",
        backgroundColor:theme.palette.primary.dark
      }
}))

export default function Profile () {
    const classes = useStyles();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(checkUser())
      return () => {
          console.log('me desmonte')
      }
    }, [dispatch])

    return (
        <div>
            <NavBar />
            <h2>Mis datos</h2>
            {user? (
                <>
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                    <p>{user.email}</p>
                </>
            ) : null}
            <div>
                {/* <MyStore /> */}
                <Button
                className={classes.button}
                 variant="contained" color="primary">
                   <Link to = '/creation' style={{textDecoration:"none", color:"white"}}>  crear producto</Link>
                </Button>
                
                <button>
                    <Link to='/'>Volver</Link>
                </button>
            </div>
        </div>
    )
}
