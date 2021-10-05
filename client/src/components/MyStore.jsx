import React from 'react';
import { Button } from '@material-ui/core';
import ProductCreation from './ProductCreation';
import StoreCreation from './StoreCreation';
import CategoryCreation from './CategoryCreation';
import { makeStyles } from '@material-ui/styles';
import createStore from '../img/market-create.svg'
import createProduct from '../img/product-create.svg'
import createCategory from '../img/category-create.svg'
const useStyles = makeStyles((e) => ({
root:{
margin:"0 auto",
display:"flex",
flexDirection:"row",
justifyContent:"center",
    flexWrap:"wrap",
},
divElection:{
    width:"fit-content",
    height:"fit-content",
    margin:"10px 10px",
    textAlign:"center",
    padding:"30px",
   
    
   // background:"#eee",
    borderRadius:"9px",
    //boxShadow:"inset 0px 0px 70px #0001",
    color:"#555"

},imgElection:{
    width:"300px",
    transition: "all 0.25s",
    cursor:"pointer",
    filter: "saturate(0%)",
    "&:hover": {
        width:"310px",
        filter: "saturate(100%)"
      }
}


}))
const MyStore = () => {
    const classes = useStyles()
    const [store,setStore] = React.useState()
    
    const handlerStore = (e) => {
   
    if(e.target.nextSibling.innerHTML === "crear producto"){
        setStore("crear producto")
    }
    else if(e.target.nextSibling.innerHTML === "crear tienda"){
        setStore("crear tienda")
    }else if(e.target.nextSibling.innerHTML === "crear categoria"){
        setStore("crear categoria")
    }
    }
    console.log(store)
    return (
        <>
           
        <div className={classes.root}>
            
                    
          
           {store === "crear producto"?
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
           store === "crear tienda"?
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
           store === "crear categoria"?
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
                    <CategoryCreation />
           </>:
           <>
           <div className={classes.divElection}
           onClick={handlerStore}>
               <img className={classes.imgElection}
                src={createStore} alt=''/>
            <h2>crear tienda</h2>
           </div>
           <div className={classes.divElection}
            onClick={handlerStore}>
           <img className={classes.imgElection}
            src={createProduct} alt=''/> 
           <h2>crear producto</h2>
           </div>
           <div className={classes.divElection}
            onClick={handlerStore}>
           <img className={classes.imgElection}
            src={createCategory} alt=''/> 
           <h2>crear categoria</h2>
           </div>
           </>}
            {/* <StoreCreation/>
            
            <ProductCreation /> */}
            
            

        </div>
        </>
    )
}

export default MyStore

