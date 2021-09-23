import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
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
import { signUp } from "../actions/index";

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

const SignUpForm = () => {
    const classes = useStyles();
    // const { register, errors, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(()=>{

        document.title ="Sign Up"
        
        return(()=>{
            document.title ="E-Market" 
        })
        },[])

    const [register, setRegister] = useState({
        first_name:'',
        last_name: '',
        email: '',
        password: '',
        passMatch: false
    });
    // const [errors, setErrors] = useState({}); 
    // useEffect(()=> {
    //     setErrors({})
    // }, [register])

    const handleFirstName = (e) => {
        setRegister({...register, first_name: e.target.value})
    }
    const handleLastName = (e) => {
        setRegister({...register, last_name: e.target.value})
    }
    // const handleDni = (e) => {
    //     setRegister({...register, dni: e.target.value})
    // }
    const handleEmail = (e) => {
        setRegister({...register, email: e.target.value})
    }
    const handlePassword = (e) => {
        setRegister({...register, password: e.target.value})
    }
    function PasswordCorroboration(e) {
        const password = register.password;
        const comparation = e.target.value;
        password === comparation
          ? setRegister({ ...register, passMatch: true })
          : setRegister({ ...register, passMatch: false });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(register.passMatch === false){
            alert('"Passwords no coinciden"')
        } else {
            dispatch(signUp(register))
            alert('La cuenta fue creada exitosamente');
            history.push('/products');
            }
        } 
        console.log(register)
    return(

        // <div>
        //     <h1>Welcome</h1>
        //     <form onSubmit={(e) => handleSubmit(e)}>
        //         <input type="text" id="firstName" placeholder="Firstname" name="first_name" onChange={handleFirstName} required/>
                
                
        //         <input type="text" id="lastName" name="last_name" placeholder="LastName" onChange={handleLastName} required/>
                

        //         //<input name="dni" id="dni" type="number" placeholder="DNI" onChange={(e) => handleDni} required/>
        //         <input name="email" id="email" type="email" placeholder="Email" onChange={handleEmail} required/>
        //         <input name="password" id="password" type="password" placeholder="Password" onChange={handlePassword} required/>
        //         <input type="password" onChange={PasswordCorroboration} id="password-confirm" placeholder="Confirm Password" required/>
        //         <button type="submit">Create Account</button>
        //     </form>

        //     <div>
        //         <span>Do yo have account? </span>
        //         <Link to='/signin'>Sign In</Link>
        //     </div>
        // </div>
<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}  onSubmit={(e) => handleSubmit(e)} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                onChange={e => handleFirstName(e)}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                onChange={e => handleLastName(e)}
                label="Last Name"
                name="last_name"
                autoComplete="lname"
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                onChange={e => handleEmail(e)}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={e => handlePassword(e)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
               
                name="password-confirm"
                label="confirm password"
                type="password"
                id="password-confirm"
                onChange={e => PasswordCorroboration(e)}
               
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <input type="submit" className={classes.submit} name ="sign Up"/>
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button> */}
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <LinkMUI href="/signin" variant="body2">
                Already have an account? Sign in
              </LinkMUI>
            </Grid>
          </Grid>
          
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

    )
}

export default SignUpForm;