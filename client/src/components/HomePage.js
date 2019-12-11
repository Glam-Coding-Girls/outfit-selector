import React, { Component } from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
import Bottom from './Bottom/Bottom';

export class HomePage extends Component {
  state={
    skirts:[],
    womenShorts:[],
    skirtImages: [],
    shortsImages: []
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/skirts')
    .then(response => {
      // console.log("this is skirt ",response.data.results);
      let s = response.data.results;
      let copySkirts = [];
      for(let i = 0; i < s.length; i++) {
        copySkirts.push(s[i].image);
      }

      this.setState({
        skirts: s,
        skirtImages: copySkirts
    });
  
    })
    .catch(error => {
      console.log(error);
    });
    axios.get('http://localhost:5000/api/women-shorts')
    .then(response => {
      console.log("this is shorts ",response.data.results);
      let ws = response.data.results;
      let copyShorts = [];
      for(let i = 0; i < ws.length; i++) {
        copyShorts.push(ws[i].image);
      }

      this.setState({
        womenShorts: ws,
        shortsImages: copyShorts
    });
    })
    .catch(error => {
      console.log(error);
    });
  } 

showSkirts = () =>{
  let bottomSkirtImages = [...this.state.skirtImages];
  // console.log("this is bottomSkirtImages arr", bottomSkirtImages);
  return (
  <Bottom imgs={bottomSkirtImages} />
  )
}
showShorts = () =>{
  let bottomShortstImages = [...this.state.shortsImages];
  return (
  <Bottom imgs={bottomShortstImages} />
  )
}

  render() {
    // console.log("this is copy arr", this.state.skirtImages);
    return (
      <div>
      <div>
      <h1>Create an Outfit!</h1>
      </div>
      {this.showSkirts()}
      {this.showShorts()}
    </div>
    )
  }
}
export default HomePage