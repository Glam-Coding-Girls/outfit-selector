import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Switch,Route, Link} from 'react-router-dom';
import Home from './components/home-component/Home';
import HomePage from './components/HomePage';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';


export class App extends Component {
  state={
    skirts:{},
    womenShorts:{},
    clothes:[]
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/skirts')
    .then(response => {
      this.setState({ skirts:response.data });
    })
    .catch(error => {
      console.log(error);
    });
    axios.get('http://localhost:5000/api/women-shorts')
    .then(response => {
      this.setState({ womenShorts:response.data });
    })
    .catch(error => {
      console.log(error);
    });
    axios.get('http://localhost:5000/api/get-clothes')
         .then(response => {
           console.log(response)
           this.setState({clothes: response.data.allClothes})
         },()=>{
           console.log(this.state.clothes)
         })
  } 

  render() {
   
      
    return (
  
      <div className="App">
      <header className="navheader">
      <div className="container">
      <div className="navbar">
          <div className="leftnav">
          <div className="homelogo">
            <Link to="/">GLAM CLOSET</Link>
          </div>
          <Link to="/about">About</Link>
          </div>
          <div className="rightnav">
            <Link to="/signup" style={{textDecoration:"none"}}>Sign up</Link>
            <Link to="/login" style={{textDecoration:"none"}}>Log in</Link>
          </div>
      </div>
      </div>
      </header>
      <div className="container page">
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

