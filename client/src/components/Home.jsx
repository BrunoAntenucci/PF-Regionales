import React from 'react';
import Header from './Header';
import { getProducts, getCategories } from '../actions/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { makeStyles,Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NoHistory from '../img/no-history.svg'

const useStyles = makeStyles(e => ({
  root:{
    marginTop:"-50px ",
   // padding: "0 10px 0 30px",
   width:"100vw",
   background:e.palette.primary.light,
   padding:"0 30px 0 0",
   borderTop:"30px solid "+e.palette.primary.main,
   borderBottom:"30px solid "+e.palette.primary.main,
   display:"flex",
   flexDirection:"row",
   overflow:"scroll"
},
root2:{
  marginTop:"-160px ",
 // padding: "0 10px 0 30px",
 width:"100vw",
 background:e.palette.primary.light,
 padding:"0 30px 0 0",
 borderTop:"30px solid "+e.palette.primary.main,
 borderBottom:"30px solid "+e.palette.primary.main,
 display:"flex",
 flexDirection:"row",
 overflow:"scroll"
},
typografy:{
    padding:"0 20px"
},
  // products: {
  //   display:"flex",
  //   flexDirection:"row",
  //   justifyContent:"center",
  //   padding:"15px 40px",
  //   backgroundColor:"#0000001b",
  //   flexWrap:"wrap",
  //   flexBasis: "100%",
  //   // overflow:"scroll"
    
  //   // "&:hover": {
  //   //   backgroundColor: 'rgb(7, 177, 77, 0.42)'
  //   // }
  // },
  section:{
    display:"flex",
    margin: "40px auto",
    flexDirection:"column",
    // background:e.palette.secondary.dark,
   
    borderBottom: `1px solid ${ e.palette.primary.dark}` ,
    // overflow:"scroll",
   
    minWidth: "1300px",
  },leyend:{
    display:"flex",
    flexDirection:"row",
    margin: "0px 30px",
    background: "rgb(83,83,83)",
background: "linear-gradient(60deg, #ffffff 0%, "+e.palette.primary.light+" 75%, rgba(255,253,253,1) 75%,  rgba(255,253,253,1) 76%, "+e.palette.primary.light+" 76%, "+e.palette.primary.light+ " 78%, rgba(255,253,253,1) 78%)",
    color:e.palette.secondary.main,
    //background:"#ffffff32",
    flexWrap:"wrap",
    borderBottom: `1px solid ${ e.palette.primary.dark}`,
    //borderTop: `3px solid ${ e.palette.secondary.dark}`,
    borderRadius:"2px"
  },link:{
    margin:"50px 30px 0px 20px",
    textDecoration:"none",
    color:e.palette.secondary.light
  },
  h1:{
    fontSize:"2.2em",
    marginTop:"50px"
  }

}));

  
function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories)
    const classes = useStyles()
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])


    

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
      for (let i = 0; i < 3; i++) {
        
          arr.push(historyProducts[i])        
        
      }
      return arr

    }
    var historyProducts = JSON.parse(localStorage.getItem("historyProducts"))
   if(historyProducts){
       
       historyProducts = historyProducts.reverse()

   }
   console.log('hisotry!!'+historyProducts)

    return (
      
        <div>
          
            <section className={classes.section}>
            <div className={classes.leyend}>
             <h1 className={classes.h1}> Productos</h1>
             <Link className={classes.link} to="/products"><p>ver más</p></Link>
            </div>
            <Header />
            <div className={classes.root2}>
            {
                filterProductsByCat()?.map((p,i) => { 
                  return(<Card 
                    key={i}  
                    name= {p?.name}
                    price={p?.price}
                    category={p?.category.map((e, k) => {
                      const aux = categories.find(i => i._id === e)
                      return <p key={k}>{aux?.name}</p>
                  })}
                  image={p?.image }
                  id={p?.id}
                    />
                   
                )})
            }
            </div>
            <div className={classes.leyend}>
            <h1 className={classes.h1}>Basado en tu última visita</h1>
            <Link className={classes.link} to="/history"><p>ver más</p></Link>
            <>

    <Header />
        
        {historyProducts?
    <div className={classes.root}>
       {/* <Typography className={classes.typografy}
           variant="h4" component="h4" color="primary">
       últimos {historyProducts.length} productos 
                </Typography> */}
       
        {filterhistory()?.map((p,i )=>{
            return(<Card  
                key={i}                  
                name= {p?.name}
                price={p?.price}
                quantity={p?.quantity}
                category={p?.category.map((e, k) => {
                    const aux = categories.find(i => i._id === e)
                    return <p key={k}>{aux?.name}</p>
                })}
                image={p?.image }
                id={p?.id}
                
                />
            )
           
        })}
        
        </div>
        :
       <div style={{textAlign:"center"}}>
        <img src={NoHistory} style={{width:"50%",textAlign:"center"}}/>
        </div>
    }
  
    
   
    </>
            </div>
            </section>
            
        </div>
       
    )
}

export default Home
