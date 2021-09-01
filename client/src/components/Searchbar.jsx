import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getProductsByName } from '../actions';


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

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductsByName(name));
    setName('');    
  }


    const classes = useStyles();
    return (
        <Paper component="form" className={classes.root}>
            <InputBase
            className={classes.input}
            placeholder="Search a product"
            inputProps={{ 'aria-label': 'Search' }}
            onChange = {(e) => handleInputChange(e)}
            />
            <IconButton 
            type="submit" 
            className={classes.iconButton} 
            aria-label="search"
            onClick = {(e) => handleSubmit(e)}
            >
            <SearchIcon />
            </IconButton>        
      </Paper>
    )
}

export default Navbar
