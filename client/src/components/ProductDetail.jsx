import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductDetail } from '../actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow:" 10px 5px 5px #0002",
      borderRadius:"10px",
      width: "fit-content",
      margin:"220px auto",
      padding:"20px",
      background:"#eee",
    },
    paper: {
      padding: theme.spacing(1),
      margin:"0",
      textAlign: 'center',
      color: theme.palette.text.secondary,
      textAlign:"justify"
    },
    image: {
        width:"500px",
        height:"500px",
        borderRadius:"10px",
        border:"1px solid"+theme.palette.secondary.light  
    },
    imageDiv:{
        padding:" 10px 40px",
    },
    content:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"


    },
    info:{
        background:"#fff",
        padding:"10px",
        borderRadius:"10px",
        textAlign:"justify",
        margin:"20px 0",
        border:"1px solid"+theme.palette.primary.main
    },
    cname:{
        fontSize:"22px",
        color:"#333",
        fontFamily:"tahoma"
    },
    cprice:{
        fontSize:"36px",
        color:"black",
        fontFamily:"roboto"
    }
  }));

function ProductDetail(props) {

    const classes = useStyles();

    console.log(props)
    const dispatch = useDispatch();
    
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
                        <div className={classes.content}>
                        <div className={classes.contentLeft}>       
                    <div className={classes.imageDiv}>                       
                <img src={p?.image} className={classes.image} alt="prod_img"/>
               
                        </div>
                         </div>     
                         <div className={classes.contentRight}>     
                             <div className={classes.info}>  
                            <Grid container spacing={2} direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start">
                                <Grid item xs>
                                    <h3 className={classes.paper +" "+classes.cname }>{p.name}</h3>
                                    <h3 className={classes.paper  +" "+classes.cprice} >${p.price}</h3>
                                    
                                </Grid>
                            </Grid>
                            </div>
                            <div className={classes.info}>
                            <h3 className={classes.paper}>Usuario: usuario</h3>
                                    <h3 className={classes.paper}>puntuación: 5</h3>
                            
                            </div>
                            <div className={classes.info}>
                            <h3 className={classes.paper}>Categoria: {p.category}</h3>
                                    <h3 className={classes.paper}>{p.description}</h3>
                            </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductDetail
