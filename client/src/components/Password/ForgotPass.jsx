import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

export default function ForgotPäss(){
    React.useEffect(()=>{

        document.title ="Forgot pass"
        
        return(()=>{
            document.title ="E-Market" 
        })
        },[])

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('')
   
    useEffect(()=> {
        dispatch(getAllUsers())
    }, [dispatch])

    const users = useSelector(state => state.users)
    const usersE = users.map((el) =>{ return el.email})

    const userEmail = usersE.find((e) =>e === email)
    console.log(userEmail, 'userEMa')

    const handleSubmit =  (e) =>{
        if(userEmail){
            dispatch(forgotPass(email))
            alert('Enviado correctamente')
            // history.push("/forgot/redirect") --> si le dejo esto me tira un option /forgot 204
        }
        else{ 
            alert('Este email no está registrado')
        }
    }
  

    return(
        <div>
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