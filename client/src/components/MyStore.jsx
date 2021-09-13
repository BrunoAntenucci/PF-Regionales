import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ProductCreation from './ProductCreation';
import StoreCreation from './StoreCreation';


const MyStore = () => {
    return (
        <div>
            
            <Button
            style={{height:"min-content"}}
                
                 variant="contained" color="primary">
                   <Link to='/products' style={{textDecoration:"none", color:"white"}}>Volver</Link>
                    </Button>
                    <h1>Mi tienda</h1>
           
            <StoreCreation/>
            
            <ProductCreation />
            
            

        </div>
    )
}

export default MyStore

