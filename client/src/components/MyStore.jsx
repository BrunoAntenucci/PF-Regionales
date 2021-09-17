import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ProductCreation from './ProductCreation';
import StoreCreation from './StoreCreation';
import { makeStyles } from '@material-ui/styles';
import createStore from '../img/market-create.svg'
import createProduct from '../img/product-create.svg'

const useStyles = makeStyles((e) => ({
root:{
margin:"0 auto",
display:"flex",
flexDirection:"row",
justifyContent:"center"
},
divElection:{
    width:"fit-content",
    height:"fit-content",
    margin:"10px 30px",
    textAlign:"center",
    padding:"50px",
   // background:"#eee",
    borderRadius:"9px",
    //boxShadow:"inset 0px 0px 70px #0001",
    color:"#555"

},imgElection:{
    width:"400px",
    transition: "all 0.25s",
    cursor:"pointer",
    "&:hover": {
        width:"450px",
        filter: "saturate(0%)"
      }
}


}))
const MyStore = () => {
    const classes = useStyles()
    const [store,setStore] = React.useState()
    
    const handlerStore = (e) => {
   
    if(e.target.nextSibling.innerHTML == "crear producto"){
        setStore("crear producto")
    }
    else if(e.target.nextSibling.innerHTML == "crear tienda"){
        setStore("crear tienda")
    }
    }
    console.log(store)
    return (
        <>
           
        <div className={classes.root}>
            
                    
          
           {store == "crear producto"?
           <>
            <Button
            style={{height:"min-content"}}
            onClick={e => {
                e.preventDefault()
                setStore("")
            }}
                 variant="contained" color="primary">
                  Volver
                    </Button>
                    <ProductCreation />
           </>:
           store == "crear tienda"?
           <>
            <Button
            style={{height:"min-content"}}
                onClick={e => {
                    e.preventDefault()
                    setStore("")
                }}
                 variant="contained" color="primary">
                  Volver
                    </Button>
                    <StoreCreation/>
          
           </>:
           <>
           <div className={classes.divElection}
           onClick={handlerStore}>
               <img className={classes.imgElection}
                src={createStore}/>
            <h2>crear tienda</h2>
           </div>
           <div className={classes.divElection}
            onClick={handlerStore}>
           <img className={classes.imgElection}
            src={createProduct}/> 
           <h2>crear producto</h2>
           </div>
           </>}
            {/* <StoreCreation/>
            
            <ProductCreation /> */}
            
            

        </div>
        </>
    )
}

export default MyStore

