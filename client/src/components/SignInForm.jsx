// import React from 'react';
// import { Fragment, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// // import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router';
// import axios from 'axios';
// import { loginUser } from '../actions';
// import GoogleLogin from 'react-google-login';

// export const useForm = () => {
//     const history = useHistory();
//     const [inputValues, setInputValues] = useState({
//         email : "",
//         password:""
//     })

//     const [inputErrors] = useState({
//         email: "Invalid Email Address / Already In Use",
//         emailSignIn: "Email does not exist",
//         passwordSignIn: "Incorrect Password"
//     })

//     // Handlers
//     const handleChangeEmail = (e) => {
//         setInputValues({...inputValues, email:e.target.value})
//     }
//     const handleChangePassword= (e) => {
//         setInputValues({...inputValues, password:e.target.value})
//     }
//     // Submit functions
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await axios.post('http://localhost:3001/signin', inputValues);
//         alert("Welcome!");
//         history.push('/');
//     }

//     return {
//         inputValues,
//         inputErrors,
//         handleChangeEmail,
//         handleChangePassword,
//         handleSubmit
//     }
// }

// const SignInForm = () => {
//     return(
//         <Fragment>
//             <h1>Signup Form</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
            
            
//                 <Link to="/saveAccount">Do you forget?</Link>
//                 <button>Sign In</button>
//                 <h4>New customer?</h4> <Link to="/login">Start here.</Link>
//             </form>
//         </Fragment>    
//     )
// }

// // const initialForm = {
// //     name: '',
// //     age: 0,
// //     email: ''
// // };

// // const [ formValues, handleInputChange, reset ] = useForm( initialForm );
// // export const useForm = ( initialState = {} ) => {
    
// //     const [values, setValues] = useState(initialState);
// //     const reset = () => {
// //         setValues( initialState );
// //     }
// //     const handleInputChange = ({ target }) => {
// //         setValues({
// //             ...values,
// //             [ target.name ]: target.value
// //         });
// //     }
// //     return [ values, handleInputChange, reset ];


// // const SignInForm = () => {
// //     const { register, formState: { errors }, handleSubmit } = useForm();
// //     const history = useHistory();
// //     const dispatch = useDispatch();
// //     const [input, setInput] = useState({
// //         email: '',
// //         password: ''
// //     })

// //     const onSubmit = async (e) => {
// //         e.preventDefault();
// //         let response = axios.post('http://localhost:3001/signin', input)
// //         let data = (await response).data
// //         if(data.failureRedirect){}
// //         // e.target.reset();
// //         alert("Welcome!");
// //         history.push('/');
// //     }

// //     return(
// //         <Fragment>
// //             <h1>Signup Form</h1>
// //             <form onSubmit={handleSubmit(onSubmit)}>
            
// //                 <input type="text" name="user" placeholder="Email" {
// //                     ...register("user", {
// //                         required: true})}/>
// //                 {errors.user?.type === 'required' && "Enter your email"}
// //                 <input type="password" placeholder="Password" {...register("password", {
// //                     required: {value: true, pattern:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/ }
// //                 })}/>
// //                 <span>{errors?.password?.message}</span>
// //                 <Link to="/saveAccount">Do you forget?</Link>
// //                 <button>Sign In</button>
// //                 <h4>New customer?</h4> <Link to="/login">Start here.</Link>
// //             </form>
// //         </Fragment>    
// //     )
// // }

// export default SignInForm;