import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { loginUser } from '../actions';
// import GoogleLogin from 'react-google-login';

const SignInForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
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
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.email && input.password){
            let response = await axios.post("http://localhost:3001/signin", input);
            let data = response.data
            if(data){
                alert('Loggin succesfully')
            }
        }
        else if(!input.email && !input.password) {
            alert("Required credentials")
        }      
        else if (!input.email){ 
                alert("Required email!")
            }
        else if (!input.password){
                alert("Required password")
            }
        
        history.push('/');
    }

    return(
        <div>
            <h1>Signup Form</h1>
            <form onSubmit={handleSubmit}>
            
                <input type="text" name="user" placeholder="Email" onChange={handleChangeEmail} required/>
                {/* <span>{errors?.email?.message}</span> */}

                <input type="password" placeholder="Password" onChange={handleChangePassword} required/>
                {/* <span>{errors?.password?.message}</span> */}

                <Link to="/saveAccount">Do you forget?</Link>
                <button>Sign In</button>
                <h4>New customer?</h4> <Link to="/signup">Start here.</Link>
            </form>
        </div>    
    )
}

export default SignInForm;