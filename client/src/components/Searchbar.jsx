import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(2),

    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function Navbar() {
    const classes = useStyles();
    return (
        <Paper component="form" className={classes.root}>
            <InputBase
            className={classes.input}
            placeholder="Search a product"
            inputProps={{ 'aria-label': 'Search' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
            </IconButton>        
      </Paper>
    )
}

export default Navbar
