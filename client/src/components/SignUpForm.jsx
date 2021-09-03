import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
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
        passMatch: false
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
    function PasswordCorroboration(e) {
        const password = register.password;
        const comparation = e.target.value;
        password === comparation
          ? setRegister({ ...register, passMatch: true })
          : setRegister({ ...register, passMatch: false });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(register.passMatch){
            const response = await dispatch (signUp(register.email, register.password))
        }
        if(response === "Account created"){
            alert('The account is created successfully');
        } else {
            return alert('"Passwords dont match"')
        }
        history.push('/');
    }
    return(
        <div>
            <h1>Welcome</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" id="firstName" placeholder="Firstname" name="firstName" onChange={(e) => handleFirstName} required/>
                {errors?.firstName?.type === 'required' && "First name is required"}
                
                <input type="text" id="lastName" name="lastName" placeholder="LastName" onChange={(e) => handleLastName} required/>
                {errors.lastName && "Last name is required"}

                <input name="dni" id="dni" type="number" placeholder="DNI" onChange={(e) => handleDni} required/>
                <input name="email" id="email" type="email" placeholder="Email" onChange={(e) => handleEmail} required/>
                <input name="password" id="password" type="password" placeholder="Password" onChange={(e) => handlePassword} required/>
                <input type="password" onChange={PasswordCorroboration} id="password-confirm" placeholder="Confirm Password" required/>
                <button type="submit">Create Account</button>
            </form>

            <div>
                <span>Do yo have account</span>
                <Link to='/signin'>Sign In</Link>
            </div>
        </div>
    )
}

export default SignUpForm;