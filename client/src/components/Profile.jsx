import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInMati } from '../actions/index';


export default function Profile (userInfo) {
    const user = useSelector(state => state.user)
     console.log(userInfo)
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch (signInMati(userInfo))
    }, [userInfo])
    return (
        <div>
            <h3>Mi usuario</h3>
            {user? (
                <>
                    <h2>{user.first_name}{user.last_name}</h2>
            <h4>{user.email}</h4>
                </>
            ) : null}
        </div>
    )
}