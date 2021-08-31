import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from './Searchbar';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));


function Header() {
        const classes = useStyles();

        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar className={classes.toolbar}>
                LOGO
                <Searchbar />   
                <Navbar />              
              </Toolbar>
            </AppBar>
          </div>
    )
}

export default Header
