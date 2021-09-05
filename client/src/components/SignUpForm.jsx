import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
// import { signUp } from '../actions';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
    // const { register, errors, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

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
            alert('"Passwords dont match"')
        } else {
            // dispatch(signUp(register))
            await axios.post("http://localhost:3001/signup", register)
            // let response = await axios.post("http://localhost:3001/signup", register)
            // let data = response.data;
            // if(data.user){
            //     setRegister(register)
            // }
            // if(!data.user){
            //     setErrors({
            //         message:data.message
            //     })
            // } else {
            //     setRegister({
            //         firstName:'',
            //         lastName: '',
            //         // dni: '',
            //         email:'',
            //         password:''
            //     })
            // }
            alert('The account is created successfully');
            history.push('/');
            }
        } 
        
    return(
        <div>
            <h1>Welcome</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" id="firstName" placeholder="Firstname" name="first_name" onChange={handleFirstName} required/>
                
                
                <input type="text" id="lastName" name="last_name" placeholder="LastName" onChange={handleLastName} required/>
                

                {/* <input name="dni" id="dni" type="number" placeholder="DNI" onChange={(e) => handleDni} required/> */}
                <input name="email" id="email" type="email" placeholder="Email" onChange={handleEmail} required/>
                <input name="password" id="password" type="password" placeholder="Password" onChange={handlePassword} required/>
                <input type="password" onChange={PasswordCorroboration} id="password-confirm" placeholder="Confirm Password" required/>
                <button type="submit">Create Account</button>
            </form>

            <div>
                <span>Do yo have account? </span>
                <Link to='/signin'>Sign In</Link>
            </div>
        </div>
    )
}

export default SignUpForm;