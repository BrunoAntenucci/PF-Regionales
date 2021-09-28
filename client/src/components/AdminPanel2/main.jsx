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
      flexDirection:"row",
      height:"100vh"
  },
  content:{
      width:"100vw"
  },
  components:{
      margin:"30px 50px",
      height:"100%",
      overflow:"auto"
  }
}))
  
function AdminPanel(){
  const classes = useStyles()
  const [component, setComponent] = React.useState("")
  const [mobile,setMobile] = React.useState(false)
  
  React.useEffect(()=>{
      if(window.screen.availWidth >800){
          setMobile(true)
      }
      console.log(mobile,"mobile use effect")
      console.log(window.screen.availWidth,"window.screen.availWidth use effect")
  },[mobile])

    return(
      <>
        <div className={classes.root}>
          <Navigator
            setComp={setComponent}
            mobile={mobile}
            setMobile={setMobile}
          />
          <div className={classes.content}>
            <Header setMobile={setMobile} mobile={mobile}/>  
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