import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { getCategories, getProductDetail } from '../actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    image: {
        width:"200px",
        height:"200px",
    }
  }));

function ProductDetail(props) {

    const classes = useStyles();
    const history = useHistory();

    function handleClick(e) {
        e.preventDefault();
        history.push('/products')
    }

    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const categories = useSelector((state) => state.categories)
    
    useEffect(() => {
        dispatch(getProductDetail(props.match.params.id));
    },[dispatch, props.match.params.id]);
    
    const detail = useSelector((state) => state.prodDetail);
    console.log(detail)


    return (
        <div className={classes.root}>
            {
                detail.product?.map(p => {
                    return (
                        <div>
                            <Grid container spacing={3} direction="row"
                            justifyContent="center"
                            alignItems="center" marginTop="150px">
                                <Grid item xs={5}>
                                    <Paper className={classes.paper}><img src={p?.image} className={classes.image} alt="prod_img"/></Paper>
                                </Grid>
                                <Grid item xs={7}>
                                    <Paper className={classes.paper}>{p.name}</Paper>
                                    <Paper className={classes.paper}>{p.description}</Paper>
                                    <Paper className={classes.paper}>Categoria:
                                        <ul>{p.category.map(e => {
                                            const aux = categories.find(i => i._id === e)
                                            return <p>{aux.name}</p>
                                        })}</ul>
                                    </Paper>
                                    <Paper className={classes.paper}>Precio: ${p.price}</Paper>
                                </Grid>
                            </Grid>
                            <button type='submit' onClick={(e) => handleClick(e)}>Volver</button>   
                        </div>
                    )
                             })
            }
        </div>
    )
}

export default ProductDetail
