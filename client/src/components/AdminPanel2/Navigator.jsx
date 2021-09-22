import {  Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
 
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useDispatch, useSelector } from "react-redux";
import { checkUser, getAllOrders, getAllPetitions, getAllUsers, getOrderDetail } from "../../actions";
const useStyles = makeStyles((e)=>({ 
root:{
    width:"256px",
    height:"100vh",
    background:e.palette.primary.superDark,
    color:"white",
    
},
typo:{
    padding:"12px 24px",
    borderBottom:"1px solid #8884",
    "&:hover":{
       background:"#8884"

    },
   
},
content:{
    
        background:"#101F33",
    borderBottom:"1px solid #8884",   
    padding:"10px 0" 
},
contentTypo:{
    padding:"12px 24px",
    fontWeight:"700",

},
contentActions:{
    padding:"12px 24px",
    fontWeight:"500",
    background: "rgba(0, 155, 229, 0.08)",
    margin:"10px 5px",
    cursor:"pointer",
    "&:hover":{
        background:"#8884"
 
     },
     display:"flex"
},
contentActionsTypo:{
    padding:"0 24px",
    fontWeight:"500",
    fontSize:"14px",
    color:e.palette.primary.light,
   
   
},
}))



function Navigator(props){
    const classes = useStyles()

    React.useEffect(()=>{
        dispatch(checkUser())
        document.title = "Admin Pannel (2)"
    },[])
    const dispatch = useDispatch();
  const role = useSelector(state => state.user.role)


  const handleClick = (e) => {
    e.preventDefault();
    if(e.target.innerText === "Users"){
      props.setComp("Users")
      dispatch(getAllUsers());
      console.log(e.target.innerText)

    }else if(e.target.innerText === "Create"){
      props.setComp("Create")
      console.log(e.target.innerText)
      
    } else if(e.target.innerText === "Petitions"){
      props.setComp("Petitions")
      dispatch(getAllPetitions());
      console.log(e.target.innerText)
      
    } else if(e.target.innerText === "Mis compras"){
      props.setComp("Mis compras")
      dispatch(getOrderDetail());
      console.log(e.target.innerText)

    } else if(e.target.innerText === "Orders"){
      props.setComp("Orders")
      dispatch(getAllOrders());
      console.log(e.target.innerText)
      
    } else if(e.target.innerText === "Products"){
      props.setComp("Products")
      console.log(e.target.innerText)
    }
      else if(e.target.innerText === "Analytics"){
      props.setComp("Analytics")
      console.log(e.target.innerText)
    }
    console.log(props.comp, "props comp")
  }
    return(
        <section className={classes.root}>

             <Typography className={classes.typo}
              variant="h6"> <Link to='/products' style={{textDecoration:"none",  color:"inherit"}}>
                  E-market</Link> </Typography> 
        
            <div className={classes.content}>
            <Typography className={classes.contentTypo}
              variant="body2"> Actions </Typography> 
              <div >
                <div className={classes.contentActions}
                  onClick={handleClick}>
                     <PeopleIcon/>
                <Typography className={classes.contentActionsTypo}
              variant="body1">Users</Typography> 
                </div>
                <div className={classes.contentActions}
                 onClick={handleClick}>
                <AssignmentIcon/>
                <Typography className={classes.contentActionsTypo}
               
              variant="body1">Orders</Typography> 
                </div>
                <div className={classes.contentActions}
                 onClick={handleClick}>
                <DnsRoundedIcon/>
                   
                <Typography className={classes.contentActionsTypo}
              
              variant="body1">Petitions</Typography> 
                </div >
                <div className={classes.contentActions}
                 onClick={handleClick}>
                    <CreateIcon/>
                <Typography className={classes.contentActionsTypo}
               
              variant="body1">Create</Typography> 
                </div>
                <div className={classes.contentActions}
                 onClick={handleClick}>
                    <LocalMallIcon/>
                <Typography className={classes.contentActionsTypo}
               
              variant="body1">Mis compras</Typography> 
                </div><div className={classes.contentActions}
                 onClick={handleClick}>
                <LocalMallIcon/>
                <Typography className={classes.contentActionsTypo}
               
              variant="body1">Products</Typography> 
                </div>
                
              </div>
            </div>
        </section>
    )
}

export default Navigator