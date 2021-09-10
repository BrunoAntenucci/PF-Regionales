import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ProductCreation from './StoreCreation';
import ModifyProduct from './ModifyProduct';
import StoreCreation from './StoreCreation';

const MyStore = () => {
    return (
        <div>
            <h1>Mi tienda</h1>
            <Button
            style={{height:"min-content"}}
                
                 variant="contained" color="primary">
                   <Link to='/products' style={{textDecoration:"none", color:"white"}}>Volver</Link>
                    </Button>
            <p>Crear tienda</p>
            <p>Crear producto</p>
            <p>Modificar producto</p>
        </div>
    )
}

export default MyStore

