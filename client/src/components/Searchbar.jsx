import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getProductsByName } from '../actions';
//import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({

  

  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height:"40px",
    width: 500,
  },
  input: {
    marginLeft: theme.spacing(1),
    boxShadow:"none",
   
    borderBottom:"1px solid #8C4A3C66",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },

}));

function Navbar() {

  const dispatch = useDispatch();
  //let history = useHistory ();
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name){
    dispatch(getProductsByName(name));
    //history.push("/products");
    setName('');   
    }
  }


    const classes = useStyles();
    return (
        <Paper component="form" className={classes.root}>
            <InputBase
            className={classes.input}
            placeholder="Search a product"
            inputProps={{ 'aria-label': 'Search' }}
            onChange = {(e) => handleInputChange(e)}
            value={name}
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
