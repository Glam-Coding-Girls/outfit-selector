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
        {/* <div className="outfitsleft">
         
        </div> */}
        <div className="outfitsright">
         <div className="outfit-title">
            <h4>CREATE YOUR FAVORITE OUTFIT!</h4>
          </div>
          <div className="outfit-title">
             <label>Select a category</label>
             <div>
             <select onChange={this.props.setDefaultSelection}>
               <option value='Women'>Women</option>
               <option value='Men'>Men</option>
             </select>
             {/* <button onClick={()=>this.props.setDefaultSelection('Women')}>Women</button>
             <button onClick={()=>this.props.setDefaultSelection('Men')}>Men</button> */}
             </div>
          </div>
          
         {this.showDefault()}
        </div>
      </div>
    )
  }
}
export default HomePage