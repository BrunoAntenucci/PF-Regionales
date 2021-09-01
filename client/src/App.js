import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import './App.css';
 
import { createTheme , ThemeProvider} from '@material-ui/core';
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
      <Switch>
        <Route exact path = "/" component = {Home} />
      </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
