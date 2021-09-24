import React from "react";
import Navigator from "./Navigator"
import { makeStyles } from "@material-ui/styles";
import Header from "./Header";
import Users from "../Users";
import MyStore from "../MyStore";
import Petitions from "../Petitions";
import MyOrders from "../MyOrders";
import Orders from "../Orders";
import PanelProduct from "../PanelProduct";
import BarChart from "../BarChart";
import AdminAnalytics from "../AdminAnalytics";
const useStyles = makeStyles(()=>({ 
    root:{
       display:"flex",
       flexDirection:"row"
    },
    content:{
        width:"100vw"
    },
    components:{
        margin:"30px 50px"
    }
    }))
    
function AdminPanel(){
    const classes = useStyles()
    const [component, setComponent] = React.useState("")
    return(
        <>
        <div className={classes.root}>
        <Navigator
         setComp={setComponent}
        />
        <div className={classes.content}>

        <Header/>  
        <div className={classes.components}>
        {component === "Users" ? <Users />
            : component === "Create"? <MyStore/>
            : component === "Petitions"?  <Petitions />
            : component === "Mis compras"? <MyOrders />
            : component === "Orders"? <Orders />
            : component === "Products"? <PanelProduct />
            :  component === "Analytics"? <BarChart />
            :  component === "AdminAnalytics"? <AdminAnalytics />
            : ""}
            </div>
        </div>
      
        </div>
        </>
    )
}

export default AdminPanel