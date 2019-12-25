import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import Favorites from './Components/Favorites/Favorites';
import { Provider } from "react-redux";
import store from "../src/js/store/index";
import { getLocationData } from './js/actions/city';

function App() {

  useEffect(() => {
    store.dispatch(getLocationData());
  }, []);
  return (
  <Provider store={store}>

    <Router>
      <Navbar></Navbar>
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/favorites' component={Favorites} />
      </Switch>
    </Router>
    </Provider>

  );
}

export default App;
