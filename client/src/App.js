import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import Bottom from './components/Bottom';

let allSkirts =[];
let allWomenShorts = [];

export class App extends Component {
  state={
    skirts:{},
    womenShorts:{}
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
  } 



showSkirts = () =>{
  return allSkirts.map((eachSkirt,i)=>{
      return(
      <Bottom key={i} image={eachSkirt.image}/>
      )
  })
}

showWomenShorts = () =>{
  return allWomenShorts.map((eachShort,i)=>{
      return(
      <Bottom key={i} image={eachShort.image}/>
      )
  })
}

  render() {
    if(this.state.skirts.results){
      allSkirts = this.state.skirts.results;
      console.log(allSkirts)
    } 
    if(this.state.womenShorts.results){
      allWomenShorts = this.state.womenShorts.results;
      console.log(allWomenShorts)
    }
      
    return (
      <>
        <h1>Test</h1>
        {this.showSkirts()}
        {this.showWomenShorts()}
      </>
    )
  }
}

export default App

