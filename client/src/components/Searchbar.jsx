import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getProductsByName } from '../actions';


const useStyles = makeStyles((theme) => ({

  

  root: {
    width: "500px",
    zIndex:"100",
    flexDirection:"row",
    marginTop: '5px',
    '@media(max-width: 900px)':{
      padding: '0 -1rem',
      width: '80%',
      marginLeft: '25px',
      marginTop: '5px',
    whiteSpace: 'nowrap',
    },
  
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

  // --------------------AUTOCOMPLETE---------------------------------

  const [prod, setProd] = useState([])
  useEffect(async() => {
    const response = await axios.get("/product")
    console.log("response", response)
    setProd(response.data)
  }, []);

  const handleOnSelect = ({name}) => {
    // the item selected

    if(name){
    dispatch(getProductsByName(name));
    }
  }

  const handleOnSearch = (e) => {
    if(e){
      dispatch(getProductsByName(e));
      } 
  
  }


    const classes = useStyles();
    return (
        <div component="form" className={classes.root}>
          <div className={classes.root}>
            <ReactSearchAutocomplete
             id="dataInput"
             className={classes.input}
             showIcon={true}
             maxResults={5}
            items={prod}
            fuseOptions={{ keys: ["name", "description"] }}
            resultStringKeyName="name"
            onSearch={handleOnSearch}         
            onSelect={handleOnSelect}      
            style={{ width: 300 }}
            placeholder={"Buscar..."}
            />               
          </div>
           
           
      </div>
      
    )
}

export default Navbar
