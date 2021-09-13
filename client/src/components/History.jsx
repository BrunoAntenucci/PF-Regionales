import { makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Header from "./Header"
import Card from './Card'
import { useSelector } from "react-redux"
const useStyles = makeStyles((theme) => ({
root:{
    margin:"180px auto",
   // padding: "0 10px 0 30px",
   width:"fit-content",
   background:theme.palette.primary.light,
   padding:"0 30px 0 0",
   borderRight:"30px solid "+theme.palette.primary.main,
   borderLeft:"30px solid "+theme.palette.primary.main,
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
    <div className={classes.root}>
        {historyProducts?
       <>
       <Typography className={classes.typografy}
           variant="h4" component="h4" color="primary">
       últimos {historyProducts.length} productos 
                </Typography>
       
        {historyProducts.map((p,i )=>{
            return(<Card  
                key={i}                  
                name= {p?.name}
                price={p?.price}
                category={p?.category.map(e => {
                    const aux = categories.find(i => i._id === e)
                    return <p>{aux?.name}</p>
                })}
                image={p?.image }
                id={p?.id}
                
                />
            )
           
        })}
        </>
        : <h4>no hay historial en tu vida</h4>
    }
  
    
    </div>
    </>
)


}

export default History