import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';
//import Home from './components/Home';
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
import { createTheme , ThemeProvider} from '@material-ui/core';
// import Header from "./components/Header";
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
import FakeStore from "./components/FakeStore";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'


const theme = createTheme({
    palette: {
      primary: {
        light: '#d0ebc155',
        main: '#BAD799',
        dark: '#798f60',
        contrastText: '#fff',
      },
      secondary: {
        light: '#b3a77388',
        main: '#97630e',
        dark: '#5f3e0a',
        contrastText: '#fff',
      },
      transparent: {
        light: '#ffffff',
        main: '#fafafa0',
        dark: '#000000',
        contrastText: '#000',
      },
       error:{
        light:"#fdd6",
        main:"#722",
        dark:"#311"
      },
    //   warning:{

    //   },
    //   info:{

    //   },
      success:{
        main:"#55a"
      }
    },
  });



function App() {

  // const [guest, setGuest] = useState(true)

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
        <Route exact path = "/history" component = {History} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path = "/profile" component = {Profile} />
        <Route path="/detail/:id" component={ProductDetail} /> 
        <Route path='/storedetail/:id' component={StoreDetail} />
        <Route exact path = "/cart" component = {Cart} />
        <Route exact path = "/store" component = {MyStore} />
        <Route exact path = "/stores" component = {Stores} />
        <Route exact path = "/orders" component = {MyOrders} />

      
        

        <Route exact path = "/admin" component = {Paperbase} />

       
      </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;