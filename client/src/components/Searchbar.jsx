import React from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
// import { Autocomplete } from '@material-ui/lab';
// import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
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
  // const [name, setName] = useState('');

  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   setName(e.target.value);
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(name){
  //   dispatch(getProductsByName(name));
  //   //history.push("/products");
  //   setName('');   
  //   // let inputId = document.getElementById("dataInput");
  //   // inputId.value = ""; 
  //   }
  // }


  // --------------------AUTOCOMPLETE---------------------------------

  const [prod, setProd] = useState("")
  useEffect(async() => {
    const response = await axios.get("/product")
    console.log("response", response)
    setProd(response.data)
  }, []);
  //console.log(prod)

  const handleOnSelect = ({name}) => {
    // the item selected

    if(name){
    dispatch(getProductsByName(name));
    //history.push("/products");
    // setName('');
    // let inputId = document.getElementById("dataInput");
    // inputId.value = ""; 
    }
    //console.log(name)
  }

  const handleOnSearch = (e) => {
    if(e){
      dispatch(getProductsByName(e));
      //history.push("/products");
      // setName('');
      // let inputId = document.getElementById("dataInput");
      // inputId.value = ""; 
      }
      console.log(e, "hola")
  
  }


    const classes = useStyles();
    return (
        <Paper component="form" className={classes.root}>
         
          <div style={{ width: 500 }}>
            <ReactSearchAutocomplete
             id="dataInput"
             className={classes.input}
             showIcon={true}
             maxResults={"5"}
            items={prod}
            fuseOptions={{ keys: ["name", "description"] }}
            resultStringKeyName="name"
            onSearch={handleOnSearch}
            
            // onClick = {handleSubmit}
            onSelect={handleOnSelect}
            // size={"small"}
            style={{ width: 300 }}
            placeholder={"Search products..."}
            />               
          </div>
           
           
      </Paper>
      
    )
}

export default Navbar
