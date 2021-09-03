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
    //minHeight: "max-content",
   boxShadow:"none",
    //paddingTop: theme.spacing(1),
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
    width:"60px",
    height:"60px",
    position: "relative",
    backgroundSize:"cover",
    margin:"2px",
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
                
                <Link to="/">
                <img src={imgLogo}   className={classes.logo} alt="logo"/></Link>
                
                <Searchbar className={classes.searchbar} />   
                <Link to="/">
                <img src={imgLogo}   className={classes.logo} alt="logo"/></Link>
                {/*este div sirve para lograr el centrado del search sin margin*/ }
                </div>
                
                  
                <Navbar  />  
              
                   
              </Toolbar>
            </AppBar>
            

            
          </div>
    )
}

export default Header
