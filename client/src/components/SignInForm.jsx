import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
// import GoogleLogin from 'react-google-login';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkMUI from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//------IMPORT ACTIONS------//
import { signIn } from "../actions/index";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'volver a  '}
        <LinkMUI  color="primary" href="http://localhost:3000">
            {/* luego hay que cambiarla cuando se deployee */}
          página principal
        </LinkMUI>{' '}
        {/* {new Date().getFullYear()}
        {'.'} */}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const SignInForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    
React.useEffect(()=>{

    document.title ="Log In"
    
    return(()=>{
        document.title ="E-Market" 
    })
    },[])
    
    const [input, setInput] = useState({
        email : '',
        password:''
    })
    const [errors, setErrors] = useState({});

    const handleChangeEmail = (e) => {
        setInput({...input, email:e.target.value})
    }
    const handleChangePassword= (e) => {
        setInput({...input, password:e.target.value})
    }
   
    function handleSubmitGoogle(e) {
        e.preventDefault();
        axios.get("http://localhost:3001/google/auth")
    }
    console.log(input)
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(signIn(input))
        history.push("/")
    }

    return(
    <>
        {/* <div>
            <h1>Signup Form</h1>
            <form onSubmit={handleSubmit}>
            
                <input type="text" name="user" placeholder="Email" onChange={handleChangeEmail} required/>
               // <span>{errors?.email?.message}</span> 

                <input type="password" placeholder="Password" onChange={handleChangePassword} required/>
              // <span>{errors?.password?.message}</span>
                <Link to="/saveAccount">Do you forget?</Link>
                <button>Sign In</button>
                <h4>New customer?</h4> <Link to="/signup">Start here.</Link>
            </form>
        </div>  */}


        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              onChange={handleChangeEmail}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChangePassword}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* <Button
              onClick={handleSubmitGoogle} REVISAR!!!!
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="http://localhost:3001/google/auth"
            >
              Sign In with Google
            </Button> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="http://localhost:3001/google/auth"
            >
              Sign In with Google
            </Button>
              
            <Grid container>
              <Grid item xs>
                <LinkMUI href="/saveAccount" variant="body2">
                  Forgot password?
                </LinkMUI>
              </Grid>
              <Grid item>
                <LinkMUI href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </LinkMUI>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
    ); 
    

}

export default SignInForm;