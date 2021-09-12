import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStore } from '../actions';
import { Button, Typography } from '@material-ui/core';
import stores from '../img/stores.svg'
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((e)=>({
    root:{
        display:"flex",
        flexDirection:"row",
        //flexWrap:"wrap",
        //width:"80%",
    },
    storeImg:{
      backgroundImage:`url(${stores})`,
      width:"800px",
        height:"600px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    divStores:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
       
        alignContent:"center",
       justifyContent:"center",
       // width:"80%",
       background:"#eee",
       borderRadius:"10px"
    },
    divStore:{
     
    },info:{
       margin:"0",
       color:"#eee",
       fontSize:"1.5em",
       textAlign:"center"
       // position:"absolute",
        //bottom:"300px"
    },
    infoDiv:{
        position:"relative",
        top:"75%",
        left:"37%",
       display:"flex",
         alignContent:"center",
        justifyContent:"center",
        flexDirection:"column",
        width: "fit-content",
        height: "fit-content",
        //border: "1px solid #c3c3c3",
        display: "flex",
        flexWrap: "wrap",
        
    },
    title:{
        borderTop:"1px solid"+e.palette.primary.dark,
   textAlign:"center",
   color:"#fff",
   padding:"30px",
   background:"linear-gradient( "+e.palette.primary.main+" 70%, #eee)"
}
    

}))
const Stores = () => {
    const dispatch = useDispatch();
    const allStores = useSelector(state => state.stores);
    const classes = useStyles()

    useEffect(() => {
        dispatch(getStore());
    },[dispatch])


    return (
        <>
            <Button
         style={{height:"min-content"}}
         
              variant="contained" color="primary">
                <Link to='/products' style={{textDecoration:"none", color:"white"}}>volver</Link>
                 </Button>
        <div className={classes.root}>
            <div style={{ marginTop:"50px"}}>
                <Typography variant="h2" className={classes.title}>
                    Tiendas
                    </Typography>
                
                 <div  className={classes.divStores}>
            {
                allStores.map(store => {
                    return(
                        <>
                        <div className={classes.divStore}>
                        <div  className={classes.storeImg}>

                        <section className={classes.infoDiv}>
                        <h4  className={classes.info}>{store.name}</h4>
                        <p  className={classes.info}>{store.description}</p>
                        <p  className={classes.info}
                            style={{marginTop:"10px", color:"yellow"}}
                        >{store.city}</p>
                        </section>
                        </div>
                        
                        </div>
                        </>
                    )
                })
            }</div>
            </div>
          
                 </div>
                 </>
        
    )
}

export default Stores
