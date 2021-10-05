/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment }  from 'react';
import Header from './Header';
import { getProducts } from '../actions/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { makeStyles} from '@material-ui/core';
import { Link } from 'react-router-dom';
import NoHistory from '../img/no-history.svg';
import { getStore } from '../actions';
import stores from '../img/stores.svg';
import Grid from '@material-ui/core/Grid';
import Footer from './Footer';

const useStyles = makeStyles(e => ({
  root:{  
    width:"100%",
   background:e.palette.primary.superLight,
   borderTop: e.palette.primary.main,
   borderBottom: e.palette.primary.main,
    overflow:"auto",    
  '@media(max-width: 375px)':{
    flexDirection: 'column',
    
  }
},

typografy:{
  padding:"0 20px"
},

  section:{
    margin: '0',
  },
  products:{
    margin:"0px auto",
    maxWidth: "1600px",
    minWidth:"250px",
    display:"flex",
    justifyContent:"center",
    flexWrap:"wrap",
    marginBottom:"20px",
borderRadius: '1%',
},
  leyend:{
    display:"flex",
    flexDirection:"row",
    margin: "0px 30px",

    // background: "linear-gradient(60deg,  "+e.palette.primary.superLight+" 75%,"+e.palette.secondary.superLight+"  75%, "+e.palette.secondary.superLight+" 76%, "+e.palette.primary.superLight+" 76%, "+e.palette.primary.superLight+ " 78%, "+e.palette.secondary.superLight+"  75%, "+e.palette.secondary.superLight+" 78%, #fff)78%",
    // color:e.palette.secondary.superDark,
    //background: "rgb(83,83,83)",
    // background:e.palette.primary.superLight,
     background: "linear-gradient(60deg,  "+e.palette.primary.superLight+" 75%,"+e.palette.secondary.superLight+"  75%, "+e.palette.secondary.superLight+" 76%, "+e.palette.primary.superLight+" 76%, "+e.palette.primary.superLight+ " 78%, "+e.palette.secondary.superLight+"  75%, "+e.palette.secondary.superLight+" 78%, #fff)78%",
    color:e.palette.secondary.dark,
    //background:"#ffffff32",
    flexWrap:"wrap",
    padding:"0 20px", 
    borderRadius:"2px"
  },
  link:{
    padding:"15px",
    height:"fit-content",
    alignSelf:"center",
    textDecoration:"none",
    marginTop:"30px",
    color:e.palette.secondary.light,    
  },
  link2:{
    padding:"15px",
    height:"fit-content",
    alignSelf:"center",
    textDecoration:"none",
    marginTop:"30px",
    color:e.palette.secondary.light,
    '@media(max-width: 500px)':{
      marginTop: '-60px',
      marginRight:"55px",
      
    }
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
     background:"#eee",
     borderRadius:"10px"
  },
  info:{
    margin:"0",
    color:"#eee",
    fontSize:"1em",
    textAlign:"center"
 },

infoDiv:{
   position:"relative",
   top:"75%",
   margin:"0 auto",
   display:"flex",
   alignContent:"center",
   justifyContent:"center",
   flexDirection:"column",
   width: "fit-content",
   height: "fit-content",
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
    
    const filterProductsByCat = () => {
      var arr = []
      for (let i = 0; i < 4; i++) {
        
          arr.push(allProducts[i])
        
        
      }
      return arr
    }
    const filterhistory = () =>{
      var arr = []
      if(historyProducts.length>=4){
        for (let i = 0; i < 4; i++) {
        
          arr.push(historyProducts[i])        
        
      }
      }else{
        for (let i = 0; i < historyProducts.length; i++) {
        
          arr.push(historyProducts[i])        
        
      }
      }
      
      return arr

    }
    const filterStores = () =>{
      var arr = []
      if(allStores.length>=3){
        for (let i = 0; i < 3; i++) {
        
          arr.push(allStores[i])        
        
      }
    }else{
        for (let i = 0; i < allStores.length; i++) {
        
          arr.push(allStores[i])        
        
      }
      }
     
      return arr

    }
    
   if(historyProducts){
       
       historyProducts = historyProducts.reverse()

   }
   console.log('hisotry!!'+historyProducts)
   const HandleHistoryOnClick=(name,price,category,image,id,quantity)=>{
    var historyArray= [];
    
    
   
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
      <>
      
      
            <Header searchbar={true}/>
        <div  className={classes.root}>
            <section className={classes.section}>
           
            <div className={classes.leyend}>
             <h1 className={classes.h1}> Productos</h1>
             <Link className={classes.link} 
      
             to="/products"><p>ver más</p></Link>
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
            <Link className={classes.link2} to="/history"><p>ver más</p></Link>
            </div>
            {historyProducts?
            <div 
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
         </div>
         :
       <div style={{textAlign:"center"}}>
        <img src={NoHistory} style={{width:"25%",textAlign:"center"}}/>
        </div>  }  
        </section>
      </div>


      <div  className={classes.root}>
            <section className={classes.section}>
           
            <div className={classes.leyend}>
            <h1 className={classes.h1}> Tiendas</h1>
            <Link className={classes.link} to="/stores"><p>ver más</p></Link>
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
                      <Link to={`/storedetail/${store?._id}`} style={{textDecoration:"none",color:"inherit"}}>
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
       </>
       <Footer />
       </div>
    )
}

export default Home