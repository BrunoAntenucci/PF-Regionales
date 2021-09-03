import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from './Searchbar';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import imgLogo from '../img/market.png'

const useStyles = makeStyles((theme) => ({

  root: {
    // display:"flex",
    // alignItems:"space-around"
    alignItems: "none",
    marginTop:"170px"
  },
                                         
  toolbar: {
    // backgroundColor:theme.palette.primary.light,
    display:"flex",
    flexDirection: "column",
    justifyContent:"center",
    minHeight: "max-content",
   boxShadow:"none",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    alignItems: "flex-start",
    
    
  },
  searchAndLogo: {
    width: "100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:"10px"
  },searchbar:{
    
  },
  logo:{
    backgroundImage:`url (${imgLogo})`,
    width:"20px",
    height:"20px",
    backgroundSize:"cover",
    margin:"2px 10px",
    textDecoration: "none",
    color:"white"
  }
 
}));


function Header() {
        const classes = useStyles();

        return (
          <div className={classes.root} >
            <AppBar position="fixed" color="primary" >
              <Toolbar className={classes.toolbar}  >
              
                <div className={classes.searchAndLogo}>
                <div className={classes.logo}></div>
                <Searchbar className={classes.searchbar} />   
               <div className={classes.logo} style={{width:"50px"}}></div>{/*este div sirve para lograr el centrado del search sin margin*/ }
                </div>
                
                  
                <Navbar  />  
              
                   
              </Toolbar>
            </AppBar>
          </div>
    )
}

export default Header
