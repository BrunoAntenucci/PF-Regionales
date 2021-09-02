import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const SignInForm = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const history = useHistory();

    const onSubmit = (data,e) => {
        console.log(data);
        e.target.reset();
        alert("Welcome!");
        history.push('/');
    }

    return(
        <Fragment>
            <h1>Signup Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            
                <input type="text" name="user" placeholder="Email" {
                    ...register("user", {
                        required: true})}/>
                {errors.user?.type === 'required' && "Enter your email"}
                <input type="password" placeholder="Password" {...register("password", {
                    required: {value: true, pattern:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/ }
                })}/>
                <span>{errors?.password?.message}</span>
                <Link to="/saveAccount">Do you forget?</Link>
                <button>Sign In</button>
                <h4>New customer?</h4> <Link to="/login">Start here.</Link>
            </form>
        </Fragment>    
    )
}

export default SignInForm;