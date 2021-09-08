import { makeStyles } from "@material-ui/core"
import React from "react"
import Header from "./Header"

const useStyles = makeStyles((theme) => ({
root:{
    margin:"180px auto",
   width:"fit-content"
}


}))
function History({history}){

    const classes = useStyles()
    console.log(history)
return(<>

    <Header />
    <div className={classes.root}>
    
    <p>{history}</p>
    
    </div>
    </>
)


}

export default History