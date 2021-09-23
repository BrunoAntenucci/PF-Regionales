import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, page, getCategories } from '../actions/index';
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paginate from './Paginate';
import Header from './Header';
import History from './History';
import Loading from './Loading';
import Footer from './Footer'


const useStyles = makeStyles((theme) => ({
    root: {
       display:"flex",
    flexDirection:"row",
     justifyContent:"center",
    margin: "230px 0 auto " ,
    // textAlign: 'left',
    // marginLeft: '60px',
    '@media(max-width: 375px)':{
        marginLeft: '30px',
        flexDirection: 'column',
  }

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
   
    section:{
        margin:"0 "
    },
    gridCard:{
    minWidth:"350px",
    maxWidth:"400px"
    },
    products:{
        background:"#eaeff1",
        maxWidth: "1800px",
        minWidth:"450px",
        display:"flex",
        flexWrap:"wrap",

    borderRadius: '1%',
   

    },
    cpaginate:{
        margin: "20px auto",
        width:"max-content"
    }
  }));

function Products(props) {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    console.log(allProducts, "dqwdqwdqwdqwdqwdqw")
    const categories = useSelector((state) => state.categories)
    // const pageN = useSelector((state) => state.page);
    const [pageN, setPageN] = useState(1);
    const [render, setRender] = useState('');
    // const [prodPerPage] = useState(9);
    const [prodPerPage , setProdPerPage] = useState(12)
    const indexOfLastProd = pageN * prodPerPage; 
    const indexOfFirstProd = indexOfLastProd - prodPerPage;  

    const currentProd = allProducts && allProducts?.slice(indexOfFirstProd, indexOfLastProd); 
    //const currentProd = Array.isArray(allProducts) && allProducts.slice(indexOfFirstProd, indexOfLastProd); 


    const paginate = (pageNumber) => {
        setPageN(pageNumber);
        window.scroll(0, 0)//UX
    }
    
    useEffect(() => {
        dispatch(getProducts());
        document.title = "E-Market"
    }, [dispatch])

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])
    
    const HandleHistoryOnClick=(name,price,category,image,id,quantity)=>{
        var historyArray= [];
        
        
       // var historyArraySTringify = JSON.stringify(historyArray)
        if(!localStorage.getItem("historyProducts")){
            historyArray.push({name,price,category,image,id,quantity })
            localStorage.setItem("historyProducts", JSON.stringify(historyArray))
        }else{
            historyArray = JSON.parse(localStorage.getItem("historyProducts"))
            if(historyArray.some(e => e.id === id)) {
                historyArray = historyArray.filter(e => e.id!==id)
            }
            historyArray.push({name,price,category,image,id, quantity })
            
            localStorage.setItem("historyProducts", JSON.stringify(historyArray))
        }
       
      
        
        console.log( JSON.parse(localStorage.getItem("historyProducts")))
    }    
  
    const classes = useStyles();

    // function checkStorage() {
    //     console.log("CHECK STORAGE")
    //     const Storage = JSON.parse(localStorage.getItem('history'));
    //     console.log("STORAGE: ", Storage)

    // }
    // function cleanStorage() {
    //     console.log("CHECK STORAGE")
    //     localStorage.clear();
    //     const StorageCleaned = JSON.parse(localStorage.getItem('history'))
    //     console.log("STORAGE: ", StorageCleaned)
    // }

    return (
        <div >

       
        <div className={classes.root}>
        
            {/* <button onClick={cleanStorage}>borrar localStorage</button>
            <button onClick={checkStorage}>check localStorage</button> */}
            <Header guest={props.guest} setGuest={props.setGuest}/>
               {/* <aside className={classes.aside}>
                    <div></div>
                </aside> */}
                {/* <Button
         style={{height:"min-content" , marginTop:"10px"}}
         
              variant="contained" color="primary">
                <Link to='/' style={{textDecoration:"none", color:"white"}}>volver</Link>
                 </Button> */}
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
                currentProd?.length > 0 ? currentProd.map((p, i) => {
                    return (
                        
                        <Fragment key={i}>              
                                    <Grid item xs={6}  className={classes.gridCard}>     

                                    <div 
                                    onClick={() => {HandleHistoryOnClick(
                                       
                                        p?.name,
                                        p?.price,
                                        p?.category,
                                        p?.image,
                                        p?._id,
                                        p?.quantity
                                        )}}
                                        >
                                       

                                            <h3>{p?.id}</h3>
                                                <Card                    
                                                    name= {p?.name}
                                                    price={p?.isInOffer ? p?.priceInOffer: p?.price}
                                                    quantity={p?.quantity}
                                                    category={p?.category?.map((e, k) => {
                                                        const aux = categories.find(i => i._id === e)
                                                        return <p key={k}>{aux?.name}</p>
                                                    })}
                                                    image={p?.image }

                                                    id={p?._id}
                                                    description={p?.description}
                                                    />
                                       </div>

                                    </Grid>
                                
                            
                        </Fragment>
                    )
                })
                : allProducts?.length > 0 ? allProducts.map((p, i) => {
                    
                    return (
                        
                        <Fragment key={i}>
                            
                             
                               
                                    <Grid item xs={6} className={classes.gridCard}>     

                                    <div 

                                    onClick={e => {HandleHistoryOnClick(
                                        e,
                                        p?.name,
                                        p?.price,
                                        p?.category,
                                        p?.image,
                                        p?._id
                                        )}}
                                        >
                                    
                                            <h3>{p?.id}</h3>

                                                <Card                    
                                                    name= {p?.name}
                                                    price={p?.price}
                                                    quantity={p?.quantity}
                                                    category={p?.category.map((e, k) => {
                                                        const aux = categories.find(i => i._id === e)
                                                        return <p key={k}>{aux?.name}</p>
                                                    })}
                                                    image={p?.image }
                                                    description={p?.description}
                                                    id={p?._id}
                                                    onClick={e => {HandleHistoryOnClick(
                                                        e,
                                                        p?.name,
                                                        p?.price,
                                                        p?.category,
                                                        p?.image,
                                                        p?._id
                                                        )}}



                                                    />
                                        </div>

                                    </Grid>
                                
                            
                        </Fragment>
                    )
                })
                : <Loading/>
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
        <Footer/>  

        </div>
        
    )
}

export default Products;