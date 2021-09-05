import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpMati } from "../actions";

function SignUpFormMati() {
    const dispatch = useDispatch();
    const [userSignUp, setUserSignUp] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    function handleInputChange(e) {
        setUserSignUp({
            ...userSignUp,
            [e.target.name]: e.target.value
        })
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        dispatch(signUpMati(userSignUp))
    }
    console.log(userSignUp)
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>First Name</label>
                <input 
                    onChange={handleInputChange}
                    name="first_name"
                />
                <label>Last Name</label>
                <input 
                    onChange={handleInputChange}
                    name="last_name"
                />
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
                <button type="submit">Sign Up!</button>
            </form>
        </div>
    )
}

export default SignUpFormMati;