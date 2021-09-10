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
            <h3>Crear tienda</h3>
            <StoreCreation/>
            <h3>Crear producto</h3>
            <ProductCreation />
            <h3>Modificar producto</h3>
            

        </div>
    )
}

export default MyStore

