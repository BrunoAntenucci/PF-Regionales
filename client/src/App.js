import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import ProductCreation from "./components/ProductCreation";
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm'
import Profile from './components/Profile';
import Favourites from "./components/Favourites";
import Paperbase from "./components/AdminPanel/Paperbase";
import './App.css';
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart"
import StoreCreation from './components/StoreCreation';
import StoreDetail from './components/StoreDetail'
import ModifyStore from './components/ModifyStore'
import { createTheme , ThemeProvider} from '@material-ui/core';
import Header from "./components/Header";
// import { useDispatch } from "react-redux";
// import { guestMati } from "./actions";
// import { userCheck } from "./actions";
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
import OrderDetail from "./components/OrderDetail";




const theme = createTheme({
    palette: {
      primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
        superDark:"#081627"
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
    //   warning:{

    //   },
    //   info:{

    //   },
      
    
  });



function App() {
  return (
    
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <ReactNotification />
    {/* <Header /> */}
      <Switch>
        {/* <Route exact path="/" >
          <Products guest={guest} setGuest={setGuest}/> 
          <Products/>
        </Route> */}
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
        {/* <Route exact path = "/orderdetail/:id" component = {OrderDetail} /> */}
        <Route exact path = "/" component = {Home} />
      </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;