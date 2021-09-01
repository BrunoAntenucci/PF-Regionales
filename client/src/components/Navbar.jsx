import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


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
  }
}));




function Navbar() {
    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
      <div className={classes.root} color="primary"> 
        

         <Paper  >
       
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered
      >
        
        <Tab label="historial" color="secondary"/>
        <Tab label="ofertas" color="secondary"/>
        <Tab label="categorias" color="secondary"/>
        {/* <Tab label="Item Three" /> */}

      </Tabs>
     
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
