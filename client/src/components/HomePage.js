import React, { Component } from 'react'
import axios from 'axios';
import Bottom from './Bottom';
import {Link} from 'react-router-dom';

let allSkirts =[];
let allWomenShorts = [];
export class HomePage extends Component {
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
        <div><h1>Create an Outfit!</h1>
        <Link to="/signup" style={{textDecoration:"none"}}><button>Sign up</button></Link>
        <Link to="/login" style={{textDecoration:"none"}}><button>Log in</button></Link></div>
        
        {this.showSkirts()}
        {this.showWomenShorts()}
      </>
    )
  }
}

export default HomePage
