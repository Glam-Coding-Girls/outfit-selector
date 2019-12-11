import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import {Switch, Link, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';

export class App extends Component {

  render() {

      
    return (
      <div className="App">
      <header className="navheader">
      <div className="container">
      <div className="navbar">
      <Link className="homelogo" to="/">GLAM CLOSET</Link>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/signup" style={{textDecoration:"none"}}><button>Sign up</button></Link>
          <Link to="/login" style={{textDecoration:"none"}}><button>Log in</button></Link>
        </nav>
      </div>
      </div>
      </header>
      <div className="container">
      <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/about' component={About} />
            <Route exact path="/signup" component={Signup}/> 
            <Route exact path="/login" component={Login}/>
            <Route exact path="/profile" component={Profile}/>  
      </Switch>
      </div>
      </div>
    )
  }
}

export default App

