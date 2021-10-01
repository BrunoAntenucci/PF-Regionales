import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import ProductCreation from "./components/ProductCreation";
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm'
import Profile from './components/Profile';
import Favourites from "./components/Favourites";
import Paperbase from "./components/AdminPanel/Paperbase";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart"
import StoreCreation from './components/StoreCreation';
import StoreDetail from './components/StoreDetail'
import ModifyStore from './components/ModifyStore'
import { createTheme , ThemeProvider} from '@material-ui/core';
import ModifyProduct from "./components/ModifyProduct";
import CategoryCreation from "./components/CategoryCreation";
import ModifyCategory from "./components/ModifyCategory";
import History from "./components/History";
import MyStore from "./components/MyStore";
import Stores from "./components/Stores";
import MyOrders from "./components/MyOrders";
import Reviews from "./components/Reviews";
import ForgotPass from "./components/Password/ForgotPass";
import Redirect from "./components/Password/RedirectMail";
import ResetPass from "./components/Password/ResetPass";
import Main from "./components/AdminPanel2/main"
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { useDispatch } from "react-redux";
import { getOffers } from "./actions";




const theme = createTheme({
    palette: {

      primary: {
        superLight:'#63ccff10',
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
        superDark:"#081627"
      },
      secondary: {
        superLight:'#f8bbd030',
        light: '#f8bbd0',
        main: '#f06292',
        dark: '#f50057',
        superDark:"#ab003c"
      },
    },
    typography: {
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
      },

      // primary: {
      //   superLight:"#d0ebc133",
      //   light: '#d0ebc155',
      //   main: '#BAD799',
      //   dark: '#798f60',
      //   contrastText: '#fff',
      // },
      // secondary: {
      //   light: '#b3a77388',
      //   main: '#97630e',
      //   dark: '#5f3e0a',
      //   contrastText: '#fff',
      // },
      // transparent: {
      //   light: '#ffffff',
      //   main: '#fafafa0',
      //   dark: '#000000',
      //   contrastText: '#000',
      // },
      //  error:{
      //   light:"#fdd6",
      //   main:"#722",
      //   dark:"#311"
      // },
      // "@global": {
      //   body: {
      //     scrollbarColor: "#6b6b6b #2b2b2b",
      //     "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
      //       backgroundColor: "#2b2b2b",
      //     },
      //     "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
      //       borderRadius: 8,
      //       backgroundColor: "#6b6b6b",
      //       minHeight: 24,
      //       border: "3px solid #2b2b2b",
      //     },
      //     "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
      //       backgroundColor: "#959595",
      //     },
      //     "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
      //       backgroundColor: "#959595",
      //     },
      //     "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
      //       backgroundColor: "#959595",
      //     },
      //     "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
      //       backgroundColor: "#2b2b2b",
      //     },
      //   },
      // },

    //   warning:{

    //   },
    //   info:{

    //   },

  });



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOffers())
  })
  return (
    
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <ReactNotification />
      <Switch>
        <Route exact path = "/creation" component = {ProductCreation} />
        <Route exact path="/signin" component={SignInForm} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path = "/products" component = {Products} />
        <Route exact path = "/storecreation" component = {StoreCreation} />
        <Route exact path = "/categorycreation" component = {CategoryCreation} />
        <Route exact path = "/modifyProduct/:id" component = {ModifyProduct} />
        <Route exact path= "/modifycategory/:id" component = {ModifyCategory} />
        <Route exact path= "/modifystore/:id" component = {ModifyStore} />
        <Route exact path = "/history" component = {History} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path = "/profile" component = {Profile} />
        <Route path="/detail/:id" component={ProductDetail} /> 
        <Route path='/storedetail/:id' component={StoreDetail} />
        <Route exact path = "/cart" component = {Cart} />
        <Route exact path = "/stores" component = {Stores} />
        <Route exact path = "/orders" component = {MyOrders} />
        <Route exact path= "/store/:id/reviews" component = {Reviews} /> 
        <Route exact path = "/forgot" component={ForgotPass}/>
        <Route exact path = "/forgot/redirect" component={Redirect}/>
        <Route exact path = "/user/reset/:token" component={ResetPass}/>
        <Route exact path = "/store" component = {MyStore} />
        <Route exact path = "/admin" component = {Paperbase} />
        <Route exact path = "/admin2" component = {Main} />
        <Route exact path = "/" component = {Home} />
      </Switch>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;