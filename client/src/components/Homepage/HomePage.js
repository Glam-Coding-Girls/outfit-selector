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
        {/* <div className="inner-outfit-menu">
          <div className="outfit-title">
             <h1>Select a category</h1>
          </div>
          <div className="button-group">
          <button className={this.props.isActive === "Women" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Women')}>Women</button>
          <button className={this.props.isActive === "Men" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Men')}>Men</button>
          </div>
          <div>
            { <select onChange={this.props.setDefaultSelection}>
               <option value='Women'>Women</option>
               <option value='Men'>Men</option>
             </select> }
          </div>
        </div> */}
        </div>
        <div className="outfitsright">
         <div className="outfit-title">
            <h1>Create your favorite Outfit!</h1>
          </div>
          <div className="button-group">
          <button className={this.props.isActive === "Women" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Women')}>Women</button>
          <button className={this.props.isActive === "Men" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Men')}>Men</button>
          </div>
         {this.showDefault()}
        </div>
      </div>
    )

  }
}
export default HomePage