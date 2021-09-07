import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export default function Profile (userInfo) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <div>
            <h3>Mi usuario</h3>
            {/* <h2>{first_name}{last_name}</h2>
            <h4>{email}</h4> */}
            
        </div>
    )
}