import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
                            <Grid container spacing={4} direction="column"
                            justifyContent="center"
                            alignItems="center">
                                <Grid item xs>
                                    <Paper className={classes.paper}><img src={p?.image} className={classes.image} alt="prod_img"/></Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} direction="column"
                            justifyContent="center"
                            alignItems="center">
                                <Grid item xs>
                                    <Paper className={classes.paper}>{p.name}</Paper>
                                    <Paper className={classes.paper}>{p.description}</Paper>                                    
                                    <Paper className={classes.paper}>Categorias:</Paper>
                                    <Paper className={classes.paper}><ul>{p.category.map(e => {
                                                                        const aux = categories.find(i => i._id === e)
                                                                        return <p>{aux.name}</p>
                                                                    })}</ul>
                                    </Paper>
                                    <Paper className={classes.paper}>Precio: ${p.price}</Paper>
                                </Grid>
                            </Grid>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductDetail
