import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkMUI from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//------IMPORT ACTIONS------//
import { checkUser, signIn, guestCartToUserCart} from "../actions/index";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'volver a  '}
        <LinkMUI  color="primary" href="http://localhost:3000/products">
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
    error:{
      textAlign:"center",
      color:"white",
      background:theme.palette.error.light,
      padding:"10px",
      position:"relative",
      borderRadius:"10px",
      border:"3px solid "+theme.palette.error.main,
   
      animationName: "$myEffect",
      animationDuration: ".25s",
    },

    
    "@keyframes myEffect": {
      "0%": {
       
        transform: "translate(10%, 10%)",
        
      },
      "10%": {
      
        transform: "translate(-10%, -10%)",
      },
      "20%": {
       transform: "translate(10%, 10%)",
      },
      "30%": {
      
        transform: "translate(-10%, -10%)",
      },
      "40%": {
        transform: "translate(10%, 10%)",
      },
      "50%": {
      
        transform: "translate(-10%, -10%)",
      },
      "60%": {
       transform: "translate(10%, 10%)",
      },
      "70%": {
      
        transform: "translate(-10%, -10%)",
      }, "80%": {
      transform: "translate(10%, 10%)",
      },
      "90%": {
      
        transform: "translate(-10%, -10%)",
      },
      "100%": {
      transform: "translate(10%, 10%)",
      },
    },
   
    
  }));


const SignInForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    var userState = useSelector((state) => state.user)

    const [errorUser, setErrorUser] = React.useState(false)
    const [input, setInput] = useState({
        email : '',
        password:''
    })
    React.useEffect(()=>{

      dispatch(checkUser())      

     
      },[dispatch])
    
    

    const handleChangeEmail = (e) => {
        setInput({...input, email:e.target.value})
    }
    const handleChangePassword= (e) => {
        setInput({...input, password:e.target.value})
    }
   
    console.log("use effect useState user", userState)
    async function handleSubmit(e) {
      setErrorUser(false)
      e.preventDefault();
      await dispatch(signIn(input))
      if (localStorage.history) {
        console.log("ENTRO DONDE TENIA QUE ENTRAR :)")
        const guestCart = await JSON.parse(localStorage.getItem('history'));
        console.log("GUEST CART: ", guestCart)
        await dispatch(guestCartToUserCart(guestCart))
        await localStorage.clear();
      }
      await dispatch(checkUser())
      if(userState._id) {
        console.log(useState)
        setErrorUser(false)
        history.push("/products")
      } else {
        setErrorUser(true)
      }
     
      console.log("user",userState)
    }

    return(
    <>
        


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
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
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
                <LinkMUI href="/forgot" variant="body2">
                  Olvidaste tu contraseña?
                </LinkMUI>
              </Grid>
              <Grid item>
                <LinkMUI href="/signup" variant="body2">
                  {"No tienes cuenta aún? Sign Up"}
                </LinkMUI>
              </Grid>
            </Grid>
          </form>
        </div>{
          errorUser?
          <>
        <h2 className={classes.error}> el mail no está registrado</h2>
        </>
        :""
        }
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
    ); 
    

}

export default SignInForm