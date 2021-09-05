import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignInForm from './SignInForm';
import { isUser, logOut } from '../actions';
import SignUpForm from './SignUpForm';

function Navbar () {
    const dispatch = useDispatch()
    // const log = useSelector(state => state.log)
    let [user, setUser] = useState(null)
    
    useEffect = (() => {
        let verifyUser = async () => {
            const verify = await isUser();
            setUser(verify)
        }
        verifyUser()
    }, [])

    async function handleLogOut () {
        let logout = await alert("Estás seguro de salir?");
        if(logout){
            dispatch(logOut())
        }
    }

    return (
        <div>
            <div>
            {user?
            <>
            <img src={iconUser} onClick={} className={classes.iconuser}/>
            <Button  size="small" onClick={} className={classes.buttons}>
                {user.firstname}
            </Button>
            <Button  size="small"  className={classes.buttons}>
                Favoritos
            </Button>
            <Button  size="small" onClick={handleLogOut} className={classes.buttons}>
                Cerrar Sesión 
            </Button>
            </>
            :
            <>
            <Button  size="small" onClick={} className={classes.buttons}>
                <Link to='/signup'>crear cuenta</Link>
            </Button>
            <Button  size="small" onClick={} className={classes.buttons}>
                <Link to='/signin'>ingresá</Link>  
            </Button>
            </>}
            </div> 
            
            <div>
                {<SignInForm /> || <SignUpForm /> ? 
                
                  <Button  size="small" onClick={} className={classes.buttons}>
                  <Link to='/'>Home</Link>  
              </Button> : null}
              
            </div>
        </div>
    )
}

export default Navbar;