import { makeStyles } from "@material-ui/core"
import React from "react"
import Header from "./Header"

const useStyles = makeStyles((theme) => ({
root:{
    margin:"180px auto",
   width:"fit-content"
}


}))
function History(){

    const classes = useStyles()
   var historyProducts = JSON.parse(localStorage.getItem("historyProducts"))
   historyProducts = historyProducts.reverse()
   console.log(historyProducts)
return(<>

    <Header />
    <div className={classes.root}>
        {historyProducts.map((e)=>{
            return( <div>
                <h1>{e.name}</h1>
                <p>{e.price}</p>
                </div>)
           
        })}
  
    
    </div>
    </>
)


}

export default History