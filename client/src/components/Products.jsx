import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, page } from '../actions/index';
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paginate from './Paginate';

const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
     margin: "230px 0 " 
    },
    font: {
        marginLeft: '10px',
        padding: "2px 20px",
        marginTop: '10px',
        marginBottom: '30px',
        textAlign:"center",
        borderLeft:"3px solid "+theme.palette.secondary.dark,
        borderRight:"3px solid "+theme.palette.secondary.dark,
        //borderBottom:"6px solid "+theme.palette.secondary.dark,
        borderRadius:"25px",
        background:"#eee"
    },
    aside:{
        maxHeight:"500px",
        margin:"100px 20px",
        minWidth:"200px",
        border: "5px solid "+theme.palette.primary.main,
        borderRadius:"20px",
        position:"sticky",
        background:theme.palette.primary.light,

    },
    section:{
        margin:"0 52px"
    },
    products:{
        background:"#eee",
    }
  }));

function Products() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const pageN = useSelector((state) => state.page);

    const [render, setRender] = useState('');
    const [prodPerPage] = useState(9);
    const indexOfLastProd = pageN * prodPerPage; 
    const indexOfFirstProd = indexOfLastProd - prodPerPage;  
    const currentProd = allProducts.slice(indexOfFirstProd, indexOfLastProd); 

    const paginate = (pageNumber) => {
        dispatch(page(pageNumber));
    }
    
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])
    console.log(allProducts)
    
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
               <aside className={classes.aside}>
                    <div></div>
                </aside>
                <section className={classes.section}>
            <div className={classes.font}>
                <Typography 

                variant="h4"
                 gutterBottom="true" 
                 ml={1} color="secondary">
                    Lista de Productos
                </Typography>
            </div>
            
            <Grid container direction="row"
                justifyContent="center"
                alignItems="flex-start"
                className={classes.products}>
            {
                currentProd?.map(p => {
                    return (
                        <Fragment>
                            
                             
                               
                                    <Grid item xs={4}>     
                                        <Link to={'/detail/' + p?._id}
                                        style={{textDecoration:"none"}}>
                                            <h3>{p.id}</h3>
                                                <Card                    
                                                    name= {p?.name}
                                                    price={p?.price}
                                                    category={p?.category?.name}
                                                    image={p?.image}
                                                    />
                                        </Link>
                                    </Grid>
                                
                            
                        </Fragment>
                    )
                })
            }
            </Grid>
            </section>
            <Paginate
                    prodPerPage = {prodPerPage}
                    allProducts = {allProducts.length}
                    paginate = {paginate}
                />
        </div>
    )
}

export default Products