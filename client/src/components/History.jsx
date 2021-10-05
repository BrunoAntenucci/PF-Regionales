import { makeStyles } from "@material-ui/core"
import React from "react"
import Header from "./Header"
import Card from './Card'
import { useSelector } from "react-redux"
import NoHistory from '../img/no-history.svg';
const useStyles = makeStyles((theme) => ({
root:{
    margin:"80px auto",
   // padding: "0 10px 0 30px",
   width:"95vw",
   background:theme.palette.primary.light,
//    padding:"0 30px 0 0",
    borderTop:"30px solid "+theme.palette.primary.main,
    //borderBottom:"30px solid "+theme.palette.primary.main,
    display:"flex",
   flexDirection:"row",
  flexWrap:"wrap",
   justifyContent:"center",
   "box-shadow": "inset 0 0 20px "+theme.palette.primary.main,
   '&::-webkit-scrollbar': {
    width: '0.4em'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius:"10px",
      border: '3px solid '+theme.palette.primary.dark
    },
    
    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
      backgroundColor: theme.palette.primary.dark,
  },
  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    backgroundColor: "#2b2b2b",
  },
    
 
  
   
},
typografy:{
    padding:"0 20px"
},
cardDiv:{
    margin:"10px"
}


}))
function History(){
    const categories = useSelector((state) => state.categories)
    const classes = useStyles()
   var historyProducts = JSON.parse(localStorage.getItem("historyProducts"))
   if(historyProducts){
       
       historyProducts = historyProducts.reverse()

   }
   console.log(historyProducts, "history Product")
return(<>

    <Header searchbar={false}/>

        
        {historyProducts?
    <div className={classes.root}>
       
       
        {historyProducts.map((p,i )=>{
            return(
            <div className={classes.cardDiv}>
            <Card  
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
                </div>
            )
           
        })}
        
        </div>
        :
       <div style={{textAlign:"center"}}>
        <img src={NoHistory} style={{width:"50%",textAlign:"center"}} alt=''/>
        </div>
    }
  
    
   
    </>
)


}

export default History