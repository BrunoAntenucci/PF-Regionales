import React from 'react';
import Header from './Header';
import { getProducts, getCategories } from '../actions/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(e => ({
  products: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    padding:"15px 40px",
    backgroundColor:"#0000001b",
    flexWrap:"wrap",
    flexBasis: "100%",
    // "&:hover": {
    //   backgroundColor: 'rgb(7, 177, 77, 0.42)'
    // }
  },section:{
    display:"flex",
    margin: "40px auto",
    flexDirection:"column",
    // background:e.palette.secondary.dark,
   
    borderBottom: `1px solid ${ e.palette.primary.dark}` ,
    
   
    minWidth: "1300px",
  },leyend:{
    display:"flex",
    flexDirection:"row",
    margin: "0px 30px",
    color:e.palette.secondary.main,
    background:"#ffffff32",
    flexWrap:"wrap",
    borderBottom: `1px solid ${ e.palette.primary.dark}`,
    //borderTop: `3px solid ${ e.palette.secondary.dark}`,
    borderRadius:"2px"
  },link:{
    margin:"50px 30px 0px 20px",
    textDecoration:"none",
    color:e.palette.secondary.light
  },
  h1:{
    fontSize:"2.2em",
    marginTop:"50px"
  }

}));

  
function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const classes = useStyles()
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])


    

    //solo función de ejemplo
    const filterProductsByCat = () => {
      var arr = []
      for (let i = 0; i < 4; i++) {
        
          arr.push(allProducts[i])
        
        
      }
      return arr
    }

    return (
      
        <div>
           
            <section className={classes.section}>
            <div className={classes.leyend}>
             <h1 className={classes.h1}> Productos</h1>
             <Link className={classes.link} to="/products"><p>ver más</p></Link>
            </div>
            
            <div className={classes.products}>
            {
                filterProductsByCat()?.map(p => { return(

                  <Card                
                  title= {p?.title}
                  price={p?.price}
                  category={p?.category}
                  image={p?.image}
              />
                   
                )})
            }
            </div>
            </section>
        </div>
       
    )
}

export default Home
