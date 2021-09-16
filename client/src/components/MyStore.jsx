import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ProductCreation from './ProductCreation';
import StoreCreation from './StoreCreation';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((e) => ({
root:{

}


}))

const handlerStore = () => {

}

const MyStore = () => {
    const classes = useStyles()
    return (
        <>
            <Button
            style={{height:"min-content"}}
                
                 variant="contained" color="primary">
                   <Link to='/products' style={{textDecoration:"none", color:"white"}}>Volver</Link>
                    </Button>
        <div className={classes.root}>
            
                    
           <div onClick={handlerStore}></div>
            <StoreCreation/>
            
            <ProductCreation />
            
            

        </div>
        </>
    )
}

export default MyStore

