import React from 'react';
import Header from './Header';
import { getProducts } from '../actions/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(e => ({
  products: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
    padding:"15px 40px",
    backgroundColor:"#0000003e",
    flexWrap:"wrap"
    // "&:hover": {
    //   backgroundColor: 'rgb(7, 177, 77, 0.42)'
    // }
  },section:{
    display:"flex",
    margin: "40px 60px",
    flexDirection:"column",
    background:e.palette.secondary.light,
  },leyend:{
    display:"flex",
    flexDirection:"row",
    margin: "20px 60px",
    color:"#ffffff",
  },link:{
    margin:"10px 20px 10px 20px",
    textDecoration:"none",
    color:"#1626b1"
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
      for (let i = 0; i < 5; i++) {
        
          arr.push(allProducts[i])
        
        
      }
      return arr
    }

    return (
      
        <div>
           
            <section className={classes.section}>
            <div className={classes.leyend}>
             <h1> Productos</h1>
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
