import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { forgotPass, getAllUsers } from '../../actions/index';

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

export default function ForgotPass(){
    React.useEffect(()=>{

        document.title ="Forgot pass"
        
        return(()=>{
            document.title ="E-Market" 
        })
        },[])

    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
   
    useEffect(()=> {
        dispatch(getAllUsers())
    }, [dispatch])

    const handleSubmit =  (e) =>{
      dispatch(forgotPass(email))
      alert('Enviado correctamente')
    }
  

    return(
        <div>
              <Button
                style={{height:"min-content"}}
                variant="contained" color="primary">
                <Link to='/products' style={{textDecoration:"none", color:"white"}}>volver</Link>
                 </Button>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography component="h1" variant="h5">
                Reestablece tu contraseña
                </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              id="email"
              label="Email.."
              name="email"
              autoComplete="email"
              autoFocus
            />
               <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             Enviar
            </Button>
            
            </form>
            </Container>
        </div>
    )
}