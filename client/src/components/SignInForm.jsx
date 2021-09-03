import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import axios from 'axios';
import { loginUser } from '../actions';
import GoogleLogin from 'react-google-login';


const SignInForm = () => {
    // const { register, formState: { errors }, handleSubmit } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const handleEmail = (e) => {
        setInput({
            ...input,
            email: e.target.value
        })
    };
    const handlePassword = (e) => {
        setInput({
            ...input,
            password: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(input.email && input.password){
            let message = await dispatch(loginUser(input.email, input.password))
            if(message === "Logged in succesfully"){
                alert("Welcome!");
            } else if(!input.email){
                alert("Email is required")
            } else if (!input.password){
                alert("Password is required")
            } else if (!input.email && !input.password){
                alert("Required credentials")
            }
        }
        history.push('/');
    }

    return(
        <div>
            <h1>Signup Form</h1>
            <form onSubmit={handleSubmit}>
            
                <input type="email" name="email" id="email" placeholder="Email" onchange={handleEmail} required/>
                
                <input type="password" name="password" id="password" placeholder="Password" onchange={handlePassword}required/>
                
                <Link to="/saveAccount">Do you forget?</Link>
                <button type="submit">Sign In</button>
                <h4>New customer?</h4> <Link to="/signup">Start here.</Link>
            </form>
        </div>    
    )
}

export default SignInForm;