import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import Bottom from './components/Bottom';

let allSkirts =[];

export class App extends Component {
  state={
    skirts:{}
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/skirts')
    .then(response => {
      this.setState({ skirts:response.data });
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

  render() {
    if(this.state.skirts.results){
      allSkirts = this.state.skirts.results;
      console.log(allSkirts)
    }   
    return (
      <>
        <h1>Test</h1>
        {this.showSkirts()}
      </>
    )
  }
}

export default App

