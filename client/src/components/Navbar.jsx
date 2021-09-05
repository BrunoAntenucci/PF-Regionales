import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../actions';
import NavBarMati from "../components/NavBarMati";


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Button, ButtonGroup } from '@material-ui/core';
import iconUser from '../img/icon-user.png'
const useStyles = makeStyles(theme => ({
  root: {

    width:"90%",
    color:"#8C4A3C",
   backgroundColor:theme.palette.primary.dark,
    padding:"10px",
    margin: "0px auto 0px",
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
    padding:"0 8px"
  },paper:{
    width: "max-content"
  },tabs:{
    
    padding:"0 10px"
  },formControl:{
    margin:"0 10px",
    minWidth: 120,
  
  },
  divLeft:{
    display:"flex",
    flexDirection:"row"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },iconuser:{
    width:"20px",
    height:"20px",
    margin:"auto",
    borderRadius:"50%",
    color:"white",
    border:"2px solid black"
  },
  divSelect:{
    display:"flex",
    flexDirection:"column",
    margin:"0 8px",
    background:"#fff",
    borderRight:"3px solid"+theme.palette.primary.main,
    borderLeft:"3px solid"+theme.palette.primary.main,
  },
  select:{
    color:"#959595",
    border:"none",
    background:"#eeeeeeee",
    
    width:"150px",
    height:"2em",
    fontSize:"1.1em",
    textAlign:"center",
    borderTop:"3px solid #fff",
   
    
    outline:"none",
    '&:active': {
      background: "#cecece",
   },
   '&:focus': {
    //borderTop:"2px solid"+theme.palette.secondary.main,
 },
  },
  label:{
    color:"#959595",
    fontSize:"0.8em",
    textAlign:"center",
    letterSpacing:".5px",
    
    background:"#ffffff"
    
  },
  
}));




function Navbar(props) {

  const dispatch = useDispatch();
    const categ = useSelector((state) => state.categories);
    const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [log,setLog] = React.useState(false)

  useEffect(() => {
    dispatch(getCategories())
}, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnClickLogSign = (e) => {
    e.preventDefault()
    if(!log){
      setLog(true)
    }else{
      setLog(false)
    }
    console.log(log)
  }
  const NoUser = () => {
    return (
      <>
<Button  size="small" onClick={handleOnClickLogSign} className={classes.buttons}>
  crear cuenta
  </Button>
  <Button  size="small" onClick={handleOnClickLogSign} className={classes.buttons}>
    ingresá
    </Button>
    </>)
    
    
  }
  const User = () => {
    return (
      <>
 <img src={iconUser} onClick={handleOnClickLogSign} className={classes.iconuser}/>
<Button  size="small" onClick={handleOnClickLogSign} className={classes.buttons}>
  Usuario
  </Button>
 <Button  size="small"  className={classes.buttons}>
  favoritos
  </Button>
    </>)
  }
    return (
      <div className={classes.root} color="primary">
        <div className={classes.divLeft}>
        <div className={classes.divSelect}>
        <label htmlFor="categories" className={classes.label}>Categorías</label>
        <select name="categories" className={classes.select}
          onChange={handleChange}
        >
          <option className={classes.options} value="selected" >
               Todas
                </option >
          {
            categ?.map(
              (c,i) => <option className={classes.options} value={c.name} className={classes.tabs} key={i}>
                {c.name}
                </option >
              )}
          {/* <MenuItem value={"Todo"}>Todo</MenuItem>
          <MenuItem value={"Indumentaria"}>Indumentaria</MenuItem>
          <MenuItem value={"Tecnología"}>Tecnología</MenuItem>
          <MenuItem value={"Muebles"}>Muebles</MenuItem> */}
        </select >
        </div>
         <Paper  className={classes.paper}>
       <div>
      
      <Tabs
        value={value}
        onChange={handleChange}
        size="small" 
        indicatorColor="secondary"
        textColor="secondary"
        centered
      >
     
        <Tab label="historial" size="small"  className={classes.tabs} color="secondary"/>
        <Tab label="ofertas" size="small"  className={classes.tabs} color="secondary"/>
   
        {/* <Tab label="Item Three" /> */}
        
        
      </Tabs>
    
      </div> 
    </Paper>
   
    </div> 
    {/* <Paper  className={classes.navegation}> */}
    <NavBarMati guest={props.guest} setGuest={props.setGuest}/>
    <div className={classes.navegation}> 
  {!log&&
  <NoUser/>
  }
  {log&&
  <User/>
  }
  <Button  size="small"  className={classes.buttons}>mis compras</Button>
</div>

        {/* </Paper> */}
    </div>
    )
}

export default Navbar
