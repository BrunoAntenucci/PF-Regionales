import React from "react";
import Navbar from "../Navbar";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default function Redirect(){
  

    return(
        <div>
            <Navbar />
            <div>
                <h2>Revisá tu casilla de Email</h2>
            </div>
            <Button
                style={{height:"min-content"}}
         
              variant="contained" color="primary">
                <Link to='/products' style={{textDecoration:"none", color:"white"}}>volver</Link>
            </Button>
        </div>
    )
}