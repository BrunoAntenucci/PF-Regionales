import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import ProductCreation from "./components/ProductCreation";
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm'
import './App.css';
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import { createTheme , ThemeProvider} from '@material-ui/core';
import Header from "./components/Header";

const theme = createTheme({
    palette: {
      primary: {
        light: '#d0ebc1',
        main: '#BAD799',
        dark: '#798f60',
        contrastText: '#fff',
      },
      secondary: {
        light: '#b3a773e4',
        main: '#97630e',
        dark: '#5f3e0a',
        contrastText: '#000',
      },
      transparent: {
        light: '#ffffff',
        main: '#fafafa0',
        dark: '#000000',
        contrastText: '#000',
      },
    //   error:{

    //   },
    //   warning:{

    //   },
    //   info:{

    //   },
    //   success:{

    //   }
    },
  });
function App() {
  return (
    
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Header />
      <Switch>
        {/* <Route exact path = "/" component = {Home} /> */}
        <Route exact path = "/creation" component = {ProductCreation} />
        <Route exact path="/signin" component={SignInForm} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path = "/" component = {Products} />
        <Route path="/detail/:id" component={ProductDetail} /> 
      </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
