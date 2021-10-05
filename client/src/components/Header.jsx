import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from './Searchbar';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import imgLogo from '../img/market.png';
import { useDispatch } from 'react-redux';
import { getProducts } from '../actions';



const useStyles = makeStyles((theme) => ({

  root: {
    // display:"flex",
    // alignItems:"space-around"
    alignItems: "none",
    marginTop:"170px"
  },
                                         
  toolbar: {
    // backgroundColor:theme.palette.primary.light,
    display:"flex",
    flexDirection: "column",
    justifyContent:"center",
    //minHeight: "max-content",
   boxShadow:"none",
    //paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    alignItems: "flex-start",
    
    
  },
  searchAndLogo: {
    width: "100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:"10px"
  },searchbar:{
    
  },
  logo:{
    backgroundImage:`url (${imgLogo})`,
    width:"50px",
    height:"50px",
    position: "relative",
    backgroundSize:"cover",
    margin:"2px",
    textDecoration: "none",
    color:"white"
  },
  buttonLogo:{
    background:"#0000",
    border: "none"

  },
  button:{
    height:"fit-content",
    backgroundColor:theme.palette.primary.dark
  }
 
}));




function Header(props) {
  const dispatch = useDispatch();
        const classes = useStyles();

        const handleClick = (e) => {
          e.preventDefault();
          dispatch(getProducts());
        }

        return (
          <div className={classes.root} >
            <AppBar position="fixed" color="primary" >
              <Toolbar className={classes.toolbar}  >
              
                <div className={classes.searchAndLogo}>
                <button className={classes.buttonLogo}
                onClick={(e) => handleClick(e)}>
                  <Link to = '/'><img src={imgLogo}   className={classes.logo} alt="logo"/></Link></button>
                {/* <Link to="/products">
                <img src={imgLogo}   className={classes.logo} alt="logo"/></Link> */}
                {props.searchbar? <Searchbar className={classes.searchbar} />:
                 <button className={classes.buttonLogo}
                 onClick={(e) => handleClick(e)}>
                   <Link to = '/products'><img src={imgLogo}  style={{display:"none"}}
                    className={classes.logo} alt="logo"/></Link></button>
                }
               
                

                {/*este div sirve para lograr el centrado del search sin margin*/ }
                <button className={classes.buttonLogo}
                onClick={(e) => handleClick(e)}>
                  <Link to = '/products'><img src={imgLogo}  style={{display:"none"}}
                   className={classes.logo} alt="logo"/></Link></button>
                {/* <Button
                className={classes.button}
                 variant="contained" color="primary">
                   <Link to = '/creation' style={{textDecoration:"none", color:"white"}}>  crear producto</Link>
                    </Button> */}
                    
                </div>
                
                  
                <Navbar guest={props.guest} setGuest={props.setGuest}/>  
              
                   
              </Toolbar>
            </AppBar>
            

            
          </div>
    )
}

export default Header
