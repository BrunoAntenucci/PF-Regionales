import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from './Searchbar';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    // display:"flex",
    // alignItems:"space-around"
    alignItems: "none"
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
    width: "50%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:"20px"
  },searchbar:{
    
  }
 
}));


function Header() {
        const classes = useStyles();

        return (
          <div className={classes.root} >
            <AppBar position="static" color="primary" >
              <Toolbar className={classes.toolbar}  >
              
                <div className={classes.searchAndLogo}>
                LOGO
                <Searchbar className={classes.searchbar} />   
               
                </div>
                
                  
                <Navbar  />  
              
                   
              </Toolbar>
            </AppBar>
          </div>
    )
}

export default Header
