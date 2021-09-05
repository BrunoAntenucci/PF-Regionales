import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, page, getCategories } from '../actions/index';
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paginate from './Paginate';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
     margin: "230px 0 " 
    },
    font: {
        marginLeft: '10px',
        padding: "10px 20px",
        //marginTop: '10px',
        marginBottom: '0px',
        textAlign:"center",
        color:theme.palette.primary.dark,
        borderLeft:"3px solid "+theme.palette.secondary.dark,
        borderRight:"3px solid "+theme.palette.secondary.dark,
        //borderBottom:"6px solid "+theme.palette.secondary.dark,
        borderRadius:"2px",
        background: "rgb(83,83,83)",
background: "linear-gradient(60deg, #ffffff 0%, "+theme.palette.primary.light+" 75%, rgba(255,253,253,1) 75%,  rgba(255,253,253,1) 76%, "+theme.palette.primary.light+" 76%, "+theme.palette.primary.light+ " 78%, rgba(255,253,253,1) 78%)",
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
        margin:"0 "
    },
    products:{
        background:"#eee",
    },
    cpaginate:{
        margin: "20px auto",
        width:"max-content"
    }
  }));

function Products(props) {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const pageN = useSelector((state) => state.page);
    const categories = useSelector((state) => state.categories)

    const [render, setRender] = useState('');
    const [prodPerPage] = useState(9);
    const indexOfLastProd = pageN * prodPerPage; 
    const indexOfFirstProd = indexOfLastProd - prodPerPage;  
    const currentProd = allProducts.slice(indexOfFirstProd, indexOfLastProd); 

    const paginate = (pageNumber) => {
        dispatch(page(pageNumber));
        window.scroll(0, 0)//UX
    }
    
    useEffect(() => {
        dispatch(getProducts());
        document.title = "E-Market"
    }, [dispatch])

    useEffect(() => {
        dispatch(getCategories());
        
    }, [dispatch])
    
  
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Header guest={props.guest} setGuest={props.setGuest}/>
               {/* <aside className={classes.aside}>
                    <div></div>
                </aside> */}
                <section className={classes.section}>
            <div className={classes.font}>
                <Typography 

                variant="h4"
                 
                 ml={1} >
                    Lista de Productos
                </Typography>
            </div>
            
            <Grid container direction="row"
                justifyContent="center"
                alignItems="flex-start"
                className={classes.products}>
            {

                    return (
                        
                        <Fragment >
                            
                             
                               
                                    <Grid item xs={4}>     
                                        <Link to={'/detail/' + p?._id}
                                        style={{textDecoration:"none"}}>
                                            <h3>{p.id}</h3>
                                                <Card                    
                                                    name= {p?.name}
                                                    price={p?.price}
                                                    category={p?.category.map((e,i) => {
                                                        const aux = categories.find(i => i._id === e)
                                                        return <p key={i}>{aux?.name}</p>
                                                    })}
                                                    image={p?.image }
                                                    />
                                        </Link>
                                    </Grid>
                                
                            
                        </Fragment>
                    )
                })
                : <p>No existen productos bajo esa descripcion</p>
            }
            </Grid>
            
           <div className={classes.cpaginate}>
            <Paginate 
                    prodPerPage = {prodPerPage}
                    allProducts = {allProducts?.length}
                    paginate = {paginate}
                    pageN = {pageN}
                />
                </div>
                 </section>
        </div>
        
    )
}

export default Products