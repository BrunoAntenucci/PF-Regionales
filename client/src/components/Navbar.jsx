import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getCategories, getFilterProducts } from '../actions';

import SearchBar from './Searchbar'
import User from './User';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { Hidden} from '@material-ui/core';


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
  },
  menuButton: {
    color:"white",
    marginRight: theme.spacing(2),
    fontSize:"1.3rem",
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
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
    [theme.breakpoints.up('md')]: {
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
     color:"#fff",
     padding: `${theme.spacing(1)}px ${theme.spacing(0)}px ${
      theme.spacing(1) + 2
  }px`,
  },
  list:{
    
  },
  buttons:{    
    color:"#fff",
    padding:"0 8px"
  },
  paper:{
    width: "max-content",
    '@media(max-width: 960px)':{
      display:"none"
      },
    textAlign: 'center',
  },
  tabs:{
    padding:"0 10px",
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />     
      <Tabs
          value={value}
          onChange={handleChange}
          size="small" 
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
        <List >
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
              </Select>
          </FormControl>      
        </List>  
      </Tabs>           
    </div>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <div className={classes.root} color="primary">   
        <IconButton
            color="white"
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
                    </Select>
                  </FormControl>
                    <Link to="/history" style={{textDecoration:"none", color:"inherit"}}>
                      <Tab label="historial" size="small"  className={classes.tabs} color="secondary"/>
                    </Link>
                    <Link to="/stores" style={{textDecoration:"none", color:"inherit"}}>
                      <Tab label="tiendas" size="small"  className={classes.tabs} color="secondary"/>
                    </Link>

                </Tabs>
              </div>
          </Paper>
        </Hidden>

        <div className={classes.navegation}> 
          <User />
        </div>

    </div>
    )
}

export default Navbar;