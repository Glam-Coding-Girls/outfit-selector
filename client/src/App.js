import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import {Switch,Route, Link} from 'react-router-dom';
import Bottom from './components/Bottom';
import Home from './components/home-component/Home';
import Amazon from './components/Amazon';

let allSkirts =[];
let allWomenShorts = [];

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
      <>
        <h1>Test</h1>
        <Link to="/home">Home</Link>
        <Link to="/amazon">Amazon</Link>
        
        <Switch>
        <Route exact path="/home" render = { (props) => <Home {...props} clothes = {this.state.clothes}
                                                                                  
                                                                                  /> } />
        <Route exact path="/amazon" render = { (props) => <Amazon {...props} skirts = {this.state.skirts}
                                                                            shorts = {this.state.womenShorts}
                                                                                  
                                                                                  /> } />
        </Switch>
        
      </>
    )
  }
}

export default App

