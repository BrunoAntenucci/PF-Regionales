import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStore } from '../actions';
import { Button } from '@material-ui/core';


const Stores = () => {
    const dispatch = useDispatch();
    const allStores = useSelector(state => state.stores);
    //const classes = useStyles()

    useEffect(() => {
        dispatch(getStore());
    },[dispatch])


    return (
        <div>
            <h1>Tiendas</h1>
            <Button
         style={{height:"min-content"}}
             
              variant="contained" color="primary">
                <Link to='/products' style={{textDecoration:"none", color:"white"}}>volver</Link>
                 </Button>
            {
                allStores.map(store => {
                    return(
                        <>
                        <h4>{store.name}</h4>
                        <p>{store.description}</p>
                        <p>{store.city}</p>
                        <hr></hr>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Stores
