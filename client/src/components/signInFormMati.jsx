import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInMati } from "../actions";


function SignInFormMati() {
    const dispatch = useDispatch();
    const [userSignIn, setUserSignIn] = useState({
        email: "",
        password: ""
    });

    function handleInputChange(e) {
        setUserSignIn({
            ...userSignIn,
            [e.target.name]: e.target.value
        })
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        dispatch(signInMati(userSignIn))
    }

    console.log(userSignIn)

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Email</label>
                <input 
                    onChange={handleInputChange}
                    name="email"
                />
                <label>Password</label>
                <input 
                    onChange={handleInputChange}
                    name="password"
                />
                <button type="submit">Sign In!</button>
            </form>
        </div>
    )
}

export default SignInFormMati;