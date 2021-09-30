import React from 'react'; //RUTA DE REDIRECCION DEL MAIL CUANDO HACE CLICK AL MAIL
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { resetPass } from '../../actions/index';

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

export default function ResetPass(props){
    React.useEffect(()=>{

        document.title ="Reset pass"
        
        return(()=>{
            document.title ="E-Market" 
        })
        },[])

    const classes = useStyles();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState({
        password: '',
        passMatch: false
    })
    const {token}  = props.match.params
    function PasswordCorroboration(e) {
        const password = input.password;
        const comparation = e.target.value;
        password === comparation
          ? setInput({ ...input, passMatch: true })
          : setInput({ ...input, passMatch: false });
    }
    
    const handlePass = (e) => {
        setInput({...input, password: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(input.passMatch === false){
            alert('Las contraseñas no coinciden')
        } else {
            dispatch(resetPass(input.password, token))
            alert('Contraseña cambiada éxito!')
            history.push('/products')
        }
    }
    console.log(input)
    return(
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography component="h1" variant="h5">
                ¡Hola {user.first_name}!
                </Typography>
                <Typography component="h3" variant="h5">
                Escribe tu nueva contraseña
                </Typography>
                <form className={classes.form}  onSubmit={handleSubmit} >
                    
                        <TextField
                            autoComplete="current-password"
                            name="password"
                            variant="outlined"
                            onChange={handlePass}
                            required
                            fullWidth
                            id="password"
                            label="password"
                            type="password"
                        />
                        
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password-confirm"
                                label="confirm password"
                                type="password"
                                id="password-confirm"
                                onChange={PasswordCorroboration}
                            
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