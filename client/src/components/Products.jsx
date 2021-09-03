import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/index';
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    font: {
        marginLeft: '10px',
        marginTop: '10px'
    }
  }));

function Products() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])
    console.log(allProducts)
    return (
        <div className={classes.root}>
            <div className={classes.font}>
                <Typography variant="h4" gutterBottom="true" ml={2}>All Products</Typography>
            </div>
            <Grid container direction="row"
                justifyContent="center"
                alignItems="flex-start">
            {
                allProducts?.map(p => {
                    return (
                        <Fragment>
                            <Grid item xs={3}>     
                            <Link to={'/detail/' + p?._id}>
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
        </div>
    )
}

export default Products