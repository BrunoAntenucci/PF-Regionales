import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {Home} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
