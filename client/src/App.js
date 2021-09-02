import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import SignupForm from './components/SignupForm';
import LogInForm from './components/LogInForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {Home} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/login" component={LogInForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
