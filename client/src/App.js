import React, { Component } from 'react'
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Profile from './components/Profile';

export class App extends Component {

  render() {  
    return (

        <Switch>
          <Route exact path="/signup" component={Signup}/> 
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profile" component={Profile}/>  
          <Route exact path="/" component={HomePage}/>    
        </Switch>

    )
  }
}

export default App

