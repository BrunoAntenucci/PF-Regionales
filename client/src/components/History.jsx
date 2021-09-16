import { makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Header from "./Header"
import Card from './Card'
import { useSelector } from "react-redux"
import NoHistory from '../img/no-history.svg'
const useStyles = makeStyles((theme) => ({
root:{
    margin:"250px 0",
   // padding: "0 10px 0 30px",
   width:"100vw",
   background:theme.palette.primary.light,
   padding:"0 30px 0 0",
//    borderTop:"30px solid "+theme.palette.primary.main,
//    borderBottom:"30px solid "+theme.palette.primary.main,
    display:"flex",
   flexDirection:"row",
//    overflow:"scroll",
   justifyContent:"center",
   
},
typografy:{
    padding:"0 20px"
}


}))
function History(){
    const categories = useSelector((state) => state.categories)
    const classes = useStyles()
   var historyProducts = JSON.parse(localStorage.getItem("historyProducts"))
   if(historyProducts){
       
       historyProducts = historyProducts.reverse()

   }
   console.log(historyProducts)
return(<>

    <Header />
        
        {historyProducts?
    <div className={classes.root}>
       <Typography className={classes.typografy}
           variant="h4" component="h4" color="primary">
       {/* últimos {historyProducts.length} productos  */}
                </Typography>
       
        {historyProducts.map((p,i )=>{
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
)


}

export default History