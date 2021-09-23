import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getCategories, getFilterProducts } from '../actions';
import IconButton from '@material-ui/core/IconButton';
import { checkUser, getCartByUser } from '../actions';
import {  useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import cartEmpty from '../img/cart-empty.png'
import List from '@material-ui/core/List';
import User from './User';
import History from './History';
import { Button, ButtonGroup ,Hidden} from '@material-ui/core';
import iconUser from '../img/icon-user.png'
import SearchBar from './Searchbar'

const drawerWidth = 240;
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
    '@media(max-width: 480px)':{
      padding: '0 -5rem',
      width: '100%',
    whiteSpace: 'nowrap',
    margin: '1%',
   
    }
    
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    marginTop: 100,
    width: 150,
    height: 200,
    
  },
  title: {
    flexGrow: 1	 
    },
    appBar: {
    [theme.breakpoints.up('sm')]: {
            width: `calc(100% - 240px)`,
            marginLeft: 240,
        }
  },
  
    
    grow:{
      flexGrow:1,
  
    },
    
  navegation:{
    
    display:"flex",
    flexDirection:"row",
    //backgroundColor:"#0000001b",
     color:"#fff",
    //  padding:"0px 55px",
     padding: `${theme.spacing(1)}px ${theme.spacing(0)}px ${
      theme.spacing(1) + 2
  }px`,
  },
  buttons:{
    
    color:"#fff",
    padding:"0 8px"
  },
  paper:{
    width: "max-content",
    // padding: theme.spacing(2),
    textAlign: 'center',
  },
  tabs:{
    
    padding:"0 10px",
    '@media(max-width: 480px)':{
      padding: '0 -5rem',
      width: '50%',
    whiteSpace: 'auto'

    }
  },
  formControl:{
    margin:"0 10px",
    minWidth: 120,
  
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
  myCart:{
    //background:theme.palette.secondary.dark
  },
  cart:{
    padding:"7px",
    margin:"0 5px",
    width:"20px",
   alignSelf:"center",
    height:"20px",
    justifySelf: "end",
    background:theme.palette.primary.main,
     borderRadius:"50%",
     border:"3px solid white"
    
  },
  cardTypo:{
    height:"max-content",
    padding:"3px 5px",
    color:theme.palette.primary.dark,
  },
  search:{
    width: "500px",
    zIndex:"100",
    flexDirection:"row",
    '@media(max-width: 480px)':{
      padding: '0 -1rem',
      width: '-70%',
    whiteSpace: 'nowrap',
    

    },
  }
}));









function Navbar(props) {



  const dispatch = useDispatch();
  const categ = useSelector((state) => state.categories);
  const classes = useStyles();
 
  const { window } = props;
 
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }


  function handlerFilterCategory(e) {
    e.preventDefault()
    dispatch(getFilterProducts(e.target.value))
  }

  async function handleClickCart(e) {
    e.preventDefault();
    await dispatch(getCartByUser())
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  // const handleOnClickLogSign = (e) => {
  //   e.preventDefault()
  //   if(!log){
  //     setLog(true)
  //   }else{
  //     setLog(false)
  //   }
  //   console.log(log)
  // }
  // const NoUser = () => {
  //   return (
  //     <>
  // <Button  size="small" onClick={handleOnClickLogSign} className={classes.buttons}>
  //   <Link style={{textDecoration:"none" , color:"white"}} to='/signup' >crear cuenta</Link>
  // </Button>
  // <Button  size="small" onClick={handleOnClickLogSign} className={classes.buttons}>
  //   <Link style={{textDecoration:"none", color:"white"}} to='/signin' >ingresá</Link>  
  // </Button>
  //   </>)



    
    
  // }
  // const User = () => {
  //   return (
  //     <>
  // <img src={iconUser} onClick={handleOnClickLogSign} className={classes.iconuser}/>
  // <Button  size="small" onClick={handleOnClickLogSign} className={classes.buttons}>
  //   Usuario
  // </Button>
  // <Button  size="small"  className={classes.buttons}>
  //   Favoritos
  // </Button>
  // <Button  size="small"  className={classes.buttons}>
  //   Cerrar Sesión 
  // </Button>
  //     </>)
  //   }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
     
      {/* <List>
        {['Categorias', 'Historial', 'Tiendas'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
      <Tabs
          value={value}
          onChange={handleChange}
          size="small" 
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <List>
    
        <Link to="/history" style={{textDecoration:"none", color:"inherit"  }}>
        <Tab label="historial" size="small"  className={classes.tabs} color="secondary"/>
        </Link>
        <Divider />
        <Link to="/stores" style={{textDecoration:"none", color:"inherit"}}>
        <Tab label="tiendas" size="small"  className={classes.tabs} color="secondary"/>
        </Link>
        <Divider />
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Categorías</InputLabel>
        <Select size="small" 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={e => handlerFilterCategory(e)}
        >
          <option className={classes.formControl} value="" selected defaultValue>Todo</option>
          {
            categ?.map(
              (c, i) => <MenuItem value={c.name} className={classes.tabs} key={i}>
                {c.name}
                </MenuItem>
              )}
              
          {/* <MenuItem value={"Todo"}>Todo</MenuItem>
          <MenuItem value={"Indumentaria"}>Indumentaria</MenuItem>
          <MenuItem value={"Tecnología"}>Tecnología</MenuItem>
          <MenuItem value={"Muebles"}>Muebles</MenuItem> */}
        </Select>
      </FormControl>
      
        </List>

       
        {/* <Tab label="Item Three" /> */}
        
        
      </Tabs>
      
      
    </div>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <div className={classes.root} color="primary"> 
        
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        <Hidden xsDown implementation="css">
          
        <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
           {drawer}
           
          </Drawer>
        
          {SearchBar}
          
      
        
        
        
       


       <Paper  className={classes.paper}>
       <div >
       {/* <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor= "left"
          variant= {props.variant}
          open={props.open}>
            

          </Drawer> */}
        <Tabs
          value={value}
          onChange={handleChange}
          size="small" 
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Categorías</InputLabel>
        <Select size="small" 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={e => handlerFilterCategory(e)}
        >
          <option className={classes.formControl} value="" selected defaultValue>Todo</option>
          {
            categ?.map(
              (c, i) => <MenuItem value={c.name} className={classes.tabs} key={i}>
                {c.name}
                </MenuItem>
              )}
              
          {/* <MenuItem value={"Todo"}>Todo</MenuItem>
          <MenuItem value={"Indumentaria"}>Indumentaria</MenuItem>
          <MenuItem value={"Tecnología"}>Tecnología</MenuItem>
          <MenuItem value={"Muebles"}>Muebles</MenuItem> */}
        </Select>
      </FormControl>
      <Link to="/history" style={{textDecoration:"none", color:"inherit"}}>
        <Tab label="historial" size="small"  className={classes.tabs} color="secondary"/>
        </Link>
        <Link to="/stores" style={{textDecoration:"none", color:"inherit"}}>
        <Tab label="tiendas" size="small"  className={classes.tabs} color="secondary"/>
        </Link>

       
        {/* <Tab label="Item Three" /> */}
        
        
      </Tabs>
      </div>
    </Paper>
    </Hidden>
    {/* <Paper  className={classes.navegation}> */}

    {/* comentado de momento, perdón mati */}
    {/* <NavBarMati guest={props.guest} setGuest={props.setGuest}/> */}
    <div className={classes.navegation}> 
      <User />
   
    {/* <Button  size="small"  className={classes.buttons}>mis compras</Button> */}

    {/* Boton mi carrito */}
    {/* <Button  size="small"  className={classes.buttons+" "+classes.myCart} onClick={handleClickCart}>
      <Link to="/cart">mi carrito</Link>
    <img src={cartEmpty} className={classes.cart}></img>
    </Button> */}
    </div>

        {/* </Paper> */}
    </div>
    )
}

export default Navbar;