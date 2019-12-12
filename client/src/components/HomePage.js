import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import Bottom from './Bottom/Bottom';

export class HomePage extends Component {

showSkirts = () =>{
  if(this.props.topImages){
    let tops = [...this.props.topImages];
    return (
    <Bottom imgs={tops} />
    )
  }
  
}
showShorts = () =>{
 if(this.props.bottomImages){
  let bottoms = [...this.props.bottomImages]
  return (
  <Bottom imgs={bottoms} />
  )
 }

}

  render() {
    // console.log("this is copy arr", this.state.skirtImages);
    return (
      <div>
      <div>
      {/* <h1>Create an Outfit!</h1> */}
      </div>
      {this.showSkirts()}
      {this.showShorts()}
    </div>
    )
  }
}
export default HomePage