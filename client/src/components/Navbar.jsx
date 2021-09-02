import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Button, ButtonGroup } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {

    width:"90%",
    color:"#8C4A3C",
   backgroundColor:theme.palette.primary.dark,
    padding:"20px 50px",
    margin: "40px 0 0 50px",
    borderRadius:"5px",
    display:"flex",
    justifyContent:"space-between",
    flexDirection:"row",
    
  },
  navegation:{
    
    display:"flex",
    flexDirection:"row",
    backgroundColor:"#0000001b",
     color:"#fff",
     padding:"0px 55px"
  },
  buttons:{
    color:"#fff",
  },paper:{
    width: "max-content"
  },formControl:{
    margin: theme.spacing(1),
    minWidth: 120,
  
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




function Navbar() {
    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
      <div className={classes.root} color="primary"> 
        

         <Paper  className={classes.paper}>
       <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered
      >
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Categorías</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >
          <MenuItem value={"Todo"}>Todo</MenuItem>
          <MenuItem value={"Indumentaria"}>Indumentaria</MenuItem>
          <MenuItem value={"Tecnología"}>Tecnología</MenuItem>
          <MenuItem value={"Muebles"}>Muebles</MenuItem>
        </Select>
      </FormControl>
        <Tab label="historial" color="secondary"/>
        <Tab label="ofertas" color="secondary"/>
   
        {/* <Tab label="Item Three" /> */}
        
      </Tabs>
      </div>
    </Paper>
    {/* <Paper  className={classes.navegation}> */}
         
    <div className={classes.navegation}> 
  <Button className={classes.buttons}>conectá</Button>
  <Button  className={classes.buttons}>ingresá</Button>
  <Button  className={classes.buttons}>mis compras</Button>
</div>

        {/* </Paper> */}
    </div>
    )
}

export default Navbar
