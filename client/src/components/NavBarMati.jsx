import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { logOutMati } from "../actions/index"

function NavBarMati(props) {
    const dispatch = useDispatch();




    function logOutButton() {
        dispatch(logOutMati);
        return props.setGuest(true);
    }

    return (
        <div>
            {props.guest ? <Link to="/signupMati"><button>Sign up</button></Link> : null}
            {props.guest ? <Link to="/signinMati"><button>Sign in</button></Link> : null}
            {props.guest ? null : <Link to="/profile"><button>Profile</button></Link>}
            {props.guest ? null : <button onClick={logOutButton}>Exit</button>}
        </div>
    )
}

export default NavBarMati;