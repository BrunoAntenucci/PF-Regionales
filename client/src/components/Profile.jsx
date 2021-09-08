import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../actions';
import { Link } from 'react-router-dom';


export default function Profile () {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(checkUser())
    }, [])

    return (
        <div>
            <h2>Mis datos</h2>
            {user? (
                <>
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                    <p>{user.email}</p>
                </>
            ) : null}
            <div>
                <button>
                    <Link to='/'>Volver</Link>
                </button>
            </div>
        </div>
    )
}
