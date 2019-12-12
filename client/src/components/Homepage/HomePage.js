import React, { Component } from 'react';
import Bottom from '../Bottom/Bottom';
import './homepage.css';

export class HomePage extends Component {
showTops = () =>{
  if(this.props.topImages){
    let tops = [...this.props.topImages];
    return (
    <Bottom imgs={tops} />
    )
  } 
}
showBottoms = () =>{
 if(this.props.bottomImages){
  let bottoms = [...this.props.bottomImages]
  return (
  <Bottom imgs={bottoms} />
  )
 }
}
showDefault = () =>{
   return (
     <div>
      {this.showTops()}
      {this.showBottoms()}
    </div>
   )
 }

  render() {
    return (
      <div className="outfitpanel">
        <div className="outfitsleft">
          <div className="outfit-title">
             <h1>Select a category</h1>
          </div>
          <button onClick={()=>this.props.setDefaultSelection('Women')}>Women</button>
          <button onClick={()=>this.props.setDefaultSelection('Men')}>Men</button>
        </div>
        <div className="outfitsright">
         <div className="outfit-title">
            <h1>Create your favorite Outfit!</h1>
          </div>
         {this.showDefault()}
        </div>
      </div>
    )
  }
}
export default HomePage