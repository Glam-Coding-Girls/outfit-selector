import React, { Component } from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
import Bottom from './Bottom/Bottom';

export class HomePage extends Component {
  state={
    skirts:[],
    womenShorts:{},
    skirtImages: []
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/skirts')
    .then(response => {
      console.log("this is skirt ",response.data.results);
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
      this.setState({ womenShorts:response.data });
    })
    .catch(error => {
      console.log(error);
    });
  } 

showSkirts = () =>{
  let bottomSkirtImages = [...this.state.skirtImages];
  return (
  <Bottom images={bottomSkirtImages} />
  )
}

  render() {
    
    return (
      <div>
      <div>
      <h1>Create an Outfit!</h1>
      </div>

      {this.showSkirts()}
    </div>
    )
  }
}
export default HomePage