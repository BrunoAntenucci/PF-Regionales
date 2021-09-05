import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { getCategories, getProductDetail } from '../actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import market from '../img/market.png'
const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow:" 10px 5px 5px #0002",
      borderRadius:"10px",
      width: "fit-content",
      margin:"30px auto",
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
    },
    buttonBack:{
        background:"#fff",
        padding:"10px",
        color:"#555",
        fontFamily:"tahoma",
        fontWeight:"700",
        borderRadius:"10px",
        margin:"2px 40px",
        cursor:"pointer",
        border:"1px solid" +theme.palette.secondary.light
    }
  }));

function ProductDetail(props) {

    const classes = useStyles();
    const history = useHistory();
    const detail = useSelector((state) => state.prodDetail);

    function handleClick(e) {
        e.preventDefault();
        history.push('/products')
    }

    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        
    }, [dispatch])
    useEffect(() => {
        var product =   detail?.product?.find( e => e)
        document.title = product?.name
        return(()=>{
            document.title = "E-Market"
            
        })
    }, [detail?.product])

    const categories = useSelector((state) => state.categories)
    
    useEffect(() => {
        dispatch(getProductDetail(props.match.params.id));
    },[dispatch, props.match.params.id]);
    
    //const detail = useSelector((state) => state.prodDetail);
    console.log(detail)


    return (
        <div className={classes.root}>
            {
                detail.product?.map((p,i) => {
                    return (

                        <div className={classes.content} key={i}>
                        <div className={classes.contentLeft}>       
                    <div className={classes.imageDiv}>                       
                <img src={p?.image?p.image:market} className={classes.image} alt="producto"/>
               
                        </div>
                        <button type='submit'
                        className={classes.buttonBack}
                         onClick={(e) => handleClick(e)}>Volver</button> 
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
                            <h3 className={classes.paper}>Categoria: 
                              <ul className={classes.paper} >{p.category.map((e,i) => {
                                            const aux = categories.find(i => i._id === e)
                                            return <p key={i}>{aux.name}</p>
                                        })}</ul>
                              </h3>
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
