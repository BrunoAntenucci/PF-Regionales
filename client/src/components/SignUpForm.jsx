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
        password: undefined
    });
    const [errors, setErrors] = useState({}); 
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/signup', register);
        alert('The account is created successfully');
        history.push('/');
    }
    return(
        <div>
            <h1>Welcome</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Firstname" name="firstName" onChange={(e) => handleFirstName}/>
                {errors.firstName?.type === 'required' && "First name is required"}
                
                <input type="text" name="lastName" placeholder="LastName" onChange={(e) => handleLastName}/>
                {errors.lastName && "Last name is required"}
                <input name="dni" type="number" placeholder="DNI" onChange={(e) => handleDni}/>
                <input name="email" type="email" placeholder="Email" onChange={(e) => handleEmail}/>
                <input name="password" type="password" placeholder="Password" onChange={(e) => handlePassword}/>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default SignUpForm;