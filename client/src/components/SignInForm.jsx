import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import axios from 'axios';
import { loginUser } from '../actions';
// import GoogleLogin from 'react-google-login';

const SignInForm = () => {
    const history = useHistory();
    const [values, setValues] = useState({
        email : "",
        password:""
    })

    const [errors, setErrors] = useState({
        email: "Invalid Email Address / Already In Use",
        emailSignIn: "Email does not exist",
        passwordSignIn: "Incorrect Password"
    })

    // Handlers
    const handleChangeEmail = (e) => {
        setValues({...values, email:e.target.value})
    }
    const handleChangePassword= (e) => {
        setValues({...values, password:e.target.value})
    }
    // Submit functions
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (values.email && values.password){
            let message = await dispatch(loginUser(values.email, values.password));
        if (message === "Logged in succesfully"){
            alert("Welcome!");
            }
        } else if (!values.email){ 
            alert("Required email!")
        } else if (!values.password){
            alert("Required password")
        } else (!values.email && !values.password) 
            alert("Required credentials")
        
        history.push('/');
    }

    return(
        <div>
            <h1>Signup Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            
                <input type="text" name="user" placeholder="Email" onChange={handleChangeEmail} required/>
                <span>{errors?.email?.message}</span>

                <input type="password" placeholder="Password" onChange={handleChangePassword} required/>
                <span>{errors?.password?.message}</span>

                <Link to="/saveAccount">Do you forget?</Link>
                <button>Sign In</button>
                <h4>New customer?</h4> <Link to="/signup">Start here.</Link>
            </form>
        </div>    
    )
}

export default SignInForm;