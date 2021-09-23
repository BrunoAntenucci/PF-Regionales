import React, { Fragment }  from 'react';
import Header from './Header';
import { getProducts, getCategories } from '../actions/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { makeStyles,Typography ,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import NoHistory from '../img/no-history.svg';
import Rating from '../utils/rating';
import {FaStar} from 'react-icons/fa';
import { getStore } from '../actions';
import stores from '../img/stores.svg';
import Grid from '@material-ui/core/Grid';
import Footer from './Footer';

const useStyles = makeStyles(e => ({
  root:{
    // marginTop:"-50px ",
   // padding: "0 10px 0 30px",
   width:"100vw",
 
   background:e.palette.primary.light,
   padding:"0 30px 0 0",
  //  borderTop:"30px solid "+e.palette.primary.main,
  //  borderBottom:"30px solid "+e.palette.primary.main,
   borderTop: e.palette.primary.main,
   borderBottom: e.palette.primary.main,

   display:"flex",
   flexDirection:"row",
    overflow:"scroll",
    
  '@media(max-width: 375px)':{
    // marginLeft: '30px',
    flexDirection: 'column',
    overflow:"scroll",
  }
},


typografy:{
  padding:"0 20px"
},

  section:{
    // display:"flex",
    // margin: "80px auto",
    // flexDirection:"column",
    // // background:e.palette.secondary.dark,
   
    // borderBottom: `1px solid ${ e.palette.primary.dark}` ,
    // // overflow:"scroll",
   
    // minWidth: "1300px",
    margin: '0',
  },
  products:{
    // background:"#eaeff1",
    maxWidth: "1800px",
    minWidth:"450px",
    display:"flex",
    flexWrap:"wrap",

borderRadius: '1%',


},
  leyend:{
    display:"flex",
    flexDirection:"row",
    margin: "0px 30px",
    background: "rgb(83,83,83)",
    background:e.palette.primary.light,
    // background: "linear-gradient(60deg, #ffffff 0%, "+e.palette.primary.light+" 75%, rgba(255,253,253,1) 75%,  rgba(255,253,253,1) 76%, "+e.palette.primary.light+" 76%, "+e.palette.primary.light+ " 78%, rgba(255,253,253,1) 78%)",
    color:e.palette.secondary.main,
    //background:"#ffffff32",
    flexWrap:"wrap",
    // borderBottom: `1px solid ${ e.palette.primary.dark}`,
    //borderTop: `3px solid ${ e.palette.secondary.dark}`,
    borderRadius:"2px"
  },link:{
    margin:"50px 30px 0px 20px",
    textDecoration:"none",
    color:e.palette.secondary.light
  },
  h1:{
    fontSize:"2.2em",
    marginTop:"50px",
    
  },
  
  storeImg:{
    backgroundImage:`url(${stores})`,
    width:"420px",
      height:"300px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
  },
  divStores:{
      display:"flex",
      flexDirection:"row",
      flexWrap:"wrap",
     
      alignContent:"center",
     justifyContent:"center",
     // width:"80%",
     background:"#eee",
     borderRadius:"10px"
  },
  info:{
    margin:"0",
    color:"#eee",
    fontSize:"1em",
    textAlign:"center"
    // position:"absolute",
     //bottom:"300px"
 },
 infoDiv:{
     position:"relative",
     top:"75%",
     left:"36%",
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
   
    alignContent:"center",
   justifyContent:"center",
   // width:"80%",
   background:"#eee",
   borderRadius:"10px"
},
info:{
  margin:"0",
  color:"#eee",
  fontSize:"1em",
  textAlign:"center"
  // position:"absolute",
   //bottom:"300px"
},
infoDiv:{
   position:"relative",
   top:"75%",
   left:"36%",
  display:"flex",
    alignContent:"center",
   justifyContent:"center",
   flexDirection:"column",
   width: "fit-content",
   height: "fit-content",
   //border: "1px solid #c3c3c3",
   display: "flex",
   flexWrap: "wrap",
   
},
title:{
   borderTop:"1px solid"+e.palette.primary.dark,
textAlign:"center",
color:"#fff",
padding:"30px",
background:"linear-gradient( "+e.palette.primary.main+" 70%, #eee)"
}

}));


  
function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);
    const allStores = useSelector(state => state.stores);
    const classes = useStyles()
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getStore());
    }, [dispatch])

    var historyProducts = JSON.parse(localStorage.getItem("historyProducts"))
    
    //solo función de ejemplo
    const filterProductsByCat = () => {
      var arr = []
      for (let i = 0; i < 4; i++) {
        
          arr.push(allProducts[i])
        
        
      }
      return arr
    }
    const filterhistory = () =>{
      var arr = []
      for (let i = 0; i < 4; i++) {
        
          arr.push(historyProducts[i])        
        
      }
      return arr

    }
    const filterStores = () =>{
      var arr = []
      for (let i = 0; i < 3; i++) {
        
          arr.push(allStores[i])        
        
      }
      return arr

    }
    
   if(historyProducts){
       
       historyProducts = historyProducts.reverse()

   }
   console.log('hisotry!!'+historyProducts)
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


    return (
      <div >
      
            <Header />
        <div  className={classes.root}>
            <section className={classes.section}>
           
            <div className={classes.leyend}>
             <h1 className={classes.h1}> Productos</h1>
             <Link className={classes.link} to="/products"><p>ver más</p></Link>
            </div>
            <Grid 
                    container direction="row"
                justifyContent="center"
                alignItems="flex-start"
                className={classes.products}>  
          
           
            {
                filterProductsByCat()?.map((p,i) => {
                  return (
                      
                      <Fragment key={i}>              
                                     

                                  <Grid item lg={3} 
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
                                                  price={p?.price}
                                                  quantity={p?.quantity}
                                                  category={p?.category?.map((e, k) => {
                                                      const aux = categories.find(i => i._id === e)
                                                      return <p key={k}>{aux?.name}</p>
                                                  })}
                                                  image={p?.image }

                                                  id={p?._id}
                                                  
                                                  />
                                    

                                  </Grid>
                      </Fragment>
                  )
              })
            }
         </Grid>    
        </section>
      </div>


      <div  className={classes.root}>
            <section className={classes.section}>
           
            <div className={classes.leyend}>
            <h1 className={classes.h1}>Basado en tu última visita</h1>
            <Link className={classes.link} to="/history"><p>ver más</p></Link>
            </div>
            <Grid 
                    container direction="row"
                justifyContent="center"
                alignItems="flex-start"
                className={classes.products}>  
          
           
            {
                filterhistory()?.map((p,i )=>{
                  return (
                      
                      <Fragment key={i}>              
                                     

                                  <Grid item lg={3} >                                                                           
                                          <Card  
                                              key={i}                  
                                              name= {p?.name}
                                              price={p?.price}
                                              quantity={p?.quantity}
                                              category={p?.category?.map((e, k) => {
                                                  const aux = categories.find(i => i._id === e)
                                                  return <p key={k}>{aux?.name}</p>
                                              })}
                                              image={p?.image }
                                              id={p?.id}                
                                              />
                                    

                                  </Grid>
                      </Fragment>
                  )
              })
            }
         </Grid>    
        </section>
      </div>


      <div  className={classes.root}>
            <section className={classes.section}>
           
            <div className={classes.leyend}>
            <h1 className={classes.h1}> Tiendas</h1>
            <Link className={classes.link} to="/store"><p>ver más</p></Link>
            </div>
            <Grid 
                    container direction="row"
                justifyContent="center"
                alignItems="flex-start"
                className={classes.products}>  
          
           
            {
                filterStores()?.map(store => {
                  return(
                      <>
                      <Link to={`/storedetail/${store?._id}`}>
                      <div className={classes.divStore}>
                      <div  className={classes.storeImg}>

                      <section className={classes.infoDiv}>
                      <h4  className={classes.info}>{store?.name}</h4>
                      <p  className={classes.info}>{store?.description}</p>
                      <p  className={classes.info}
                          style={{marginTop:"10px", color:"yellow"}}
                      >{store?.city}</p>
                      </section>
                      </div> 
                      </div>
                      </Link>
                      <div>    
                      </div>
                      </>
                  )
              })
            }
         </Grid>    
        </section>
      </div>
     
        
        <Footer  />
      </div>
    )
}

export default Home