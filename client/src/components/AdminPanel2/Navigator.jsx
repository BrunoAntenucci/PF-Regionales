import {  Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StyleIcon from '@mui/icons-material/Style';
import { useDispatch, useSelector } from "react-redux";
import { checkUser, getAllOrders, getAllPetitions, getAllUsers, getOrderDetail } from "../../actions";

const useStyles = makeStyles((e)=>({ 
  root:{
      width:"256px",
      height:"100%",
      background:e.palette.primary.superDark,
      color:"white",
      '@media(max-width: 800px )':{
      display:"none",
      zIndex:"10000000",
        position:"absolute"
      }
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
  }
}))


function Navigator(props){
  const classes = useStyles()
  const name = useSelector(state => state.user);
  const role = useSelector(state => state.user.role)
  const dispatch = useDispatch();

  React.useEffect(()=>{
      dispatch(checkUser())
      document.title = "Admin Pannel (2)"
  },[dispatch])
  
  const handleClick = (e) => {
    e.preventDefault();
    if(e.target.innerText === "Users"){
      props.setComp("Users")
      dispatch(getAllUsers());
      console.log(e.target.innerText)
    } else if(e.target.innerText === "Create"){
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
    } else if(e.target.innerText === "Analytics"){
      props.setComp("Analytics")
      console.log(e.target.innerText)
    } else if(e.target.innerText === "AdminAnalytics"){
      props.setComp("AdminAnalytics")
      console.log(e.target.innerText)
    }
  }
  
  const setDisplay = () =>{
    if(props.mobile){
      return "inline-block"
    }else if(!props.mobile){
      return "none"
    }
  }

  const setBackground = () =>{
    if(window.screen.availWidth >800){
      return "#fff5"
    } else if( window.screen.availWidth <800){
        return "#0000"
    }
   }

  return(
      <section className={classes.root}
      style={{display:setDisplay()}}
      >
        <Typography className={classes.typo} variant="h6"> 
          <Link to='/products' style={{textDecoration:"none",  color:"inherit"}}>
            E-market
          </Link> 
        </Typography> 
        <Typography className={classes.typo} variant="h6"> Hola {name.first_name}!</Typography> 
        <Typography className={classes.typo}
          style={{cursor:"pointer", background:setBackground()}}
          onClick={()=>{
            props.setMobile(false)
          }}
          variant="h6"> cerrar Navegador 
        </Typography> 
        <div className={classes.content}>
          <Typography className={classes.contentTypo} variant="body2"> Actions </Typography> 
            <div >
              {
                role === "superAdmin" ? 
                <>
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
                  </div>
                  <div className={classes.contentActions}
                    onClick={handleClick}>
                    <StyleIcon/>
                    <Typography className={classes.contentActionsTypo}
                    variant="body1">Products</Typography> 
                  </div>
                  <div className={classes.content}>
                    <Typography className={classes.contentTypo}>Analytics</Typography>
                  </div>
                  <div className={classes.contentActions}
                    onClick={handleClick}>
                    <SettingsIcon />
                    <Typography className={classes.contentActionsTypo}
                    variant="body1">Analytics</Typography> 
                  </div>
                  <div className={classes.contentActions}
                    onClick={handleClick}>
                    <StyleIcon />
                    <Typography className={classes.contentActionsTypo}
                    variant="body1">AdminAnalytics</Typography> 
                  </div>
                </>
                :role === "Admin" ?
                <>
                  <div className={classes.contentActions}
                    onClick={handleClick}>
                    <AssignmentIcon/>
                    <Typography className={classes.contentActionsTypo}
                    variant="body1">Orders</Typography> 
                  </div>
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
                  </div>
                  <div className={classes.contentActions}
                    onClick={handleClick}>
                    <StyleIcon/>
                    <Typography className={classes.contentActionsTypo}
                    variant="body1">Products</Typography> 
                  </div>
                  <div className={classes.content}>
                    <Typography className={classes.contentTypo}>Analytics</Typography>
                  </div>
                  <div className={classes.contentActions}
                    onClick={handleClick}>
                    <SettingsIcon />
                    <Typography className={classes.contentActionsTypo}
                    variant="body1">Analytics</Typography> 
                  </div>
                  <div className={classes.contentActions}
                    onClick={handleClick}>
                    <StyleIcon />
                    <Typography className={classes.contentActionsTypo}
                    variant="body1">AdminAnalytics</Typography> 
                  </div>
                </>
                : role === "User" ?
                <>
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
                  </div>
                  <div className={classes.contentActions}
                    onClick={handleClick}>
                    <StyleIcon/>
                    <Typography className={classes.contentActionsTypo}
                    variant="body1">Products</Typography> 
                  </div>
                </>
                :""
              }
            </div>
        </div>
        <Typography className={classes.typo}
          variant="body1"> 
          <Link style={{textDecoration:"none",color:"inherit",margin:"0",padding:"0"}}
          to="/admin">R</Link>
          ole: {role} </Typography> 
    </section>
  )
}

export default Navigator