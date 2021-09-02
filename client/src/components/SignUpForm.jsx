import React from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const SignUpForm = () => {
    const { register, errors, handleSubmit } = useForm();

    return(
        <Fragment>
            <h1>Login Form</h1>
            <form>
                <input {...register("firstName", { required: true })} />
                {errors.firstName?.type === 'required' && "First name is required"}
                
                <input {...register("lastName", { required: true })} />
                {errors.lastName && "Last name is required"}
                <input name="dni"/>
                <input name="email"/>
                <input name="password"/>
                <button>Create Account</button>
            </form>
        </Fragment>    
    )
}

export default SignUpForm;