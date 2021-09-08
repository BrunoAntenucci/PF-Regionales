import React from 'react';
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from "@material-ui/core/TextField"
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getProductsByName, getProducts } from '../actions';
//import { useHistory } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

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

  const [prod, setProd] = useState("")
  useEffect(async() => {
    const response = await axios.get("http://localhost:3001/product")
    console.log("response", response)
    setProd(response.data)
  }, []);
  console.log(prod)
   
    
    



  
  
  const dispatch = useDispatch();
  //let history = useHistory ();
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    
    setName();
  }

  const handleSubmit = (e) => {
    
    if(name){
    dispatch(getProductsByName(name));
    //history.push("/products");
    setName('');   
    // let inputId = document.getElementById("dataInput");
    // inputId.value = ""; 
    }
  }

  const handleOnSelect = ({name}) => {
    // the item selected
    
    if(name){
    dispatch(getProductsByName(name));
    //history.push("/products");
    setName('');   
    // let inputId = document.getElementById("dataInput");
    // inputId.value = ""; 
    }
    console.log(name)
  }
  
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }
  //--------------AUTOCOMPLETE
  
  


    const classes = useStyles();
    return (
      
        <Paper component="form" className={classes.root}>
          <div style={{ width: 300 }}>
            <Autocomplete
              id="combo-box-demo"
              options={prod}
              size={"small"}
              getOptionLabel={(option) => `${option.name} | ${option.description}`}
              
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
              renderOption={(option) => {
                return <h4>{`${option.name} |${option.description}`}</h4>
              }}
              
              onSelect={handleSubmit()}
              onInputChange={handleSubmit()}
              
            />
          </div>
          <div className="App">
      <header className="App-header">
      
      </header>
          </div>

      </Paper>
      
    )
    }

export default Navbar
