import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { signUp } from '../actions';

const SignUpForm = () => {
    // const { register, errors, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const [register, setRegister] = useState({
        firstName: undefined,
        lastName: undefined,
        dni: undefined,
        email: undefined,
        password: undefined,
        passMatch: false,
        passwordReset:false
    });

    const handleFirstName = (e) => {
        setRegister({...register, firstName: e.target.value})
    }
    const handleLastName = (e) => {
        setRegister({...register, lastName: e.target.value})
    }
    const handleDni = (e) => {
        setRegister({...register, dni: e.target.value})
    }
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
        console.log(handleSubmit, 'submit')
        e.preventDefault();
        await axios.post('http://localhost:3001/signup', register);
        alert('The account is created successfully');
        history.push('/');
    }
    return(
        <div>
            <h1>Welcome</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" id="firstname" placeholder="Firstname" name="firstName" onChange={(e) => handleFirstName} required/>
                
                <input type="text" name="lastName" id="lastName" placeholder="LastName" onChange={(e) => handleLastName} required/>
                
                <input name="dni" id="dni" type="number" placeholder="DNI" onChange={(e) => handleDni} required/>
                <input name="email" type="email" placeholder="Email" id="email" onChange={(e) => handleEmail} required/>
                <input name="password" type="password" placeholder="Password" id="password" onChange={(e) => handlePassword} required/>
                <input type="password" onChange={PasswordCorroboration} id="password-confirm"placeholder="Confirm Password" required/>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default SignUpForm;