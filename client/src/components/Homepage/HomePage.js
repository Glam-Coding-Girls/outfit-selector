import React, { Component } from 'react';
import Bottom from '../Bottom/Bottom';
import './homepage.css';


export class HomePage extends Component {

showTops = () =>{
  if(this.props.topImages){
    let tops = [...this.props.topImages];
    let selectOption = this.props.catSelection;
    if(tops.length > 0){
      return (
        <Bottom updateIndex={this.props.setTopIndex} imgs={tops} optionSelected={selectOption} />
        )
    }
    
  } 
}
showBottoms = () =>{
 if(this.props.bottomImages){
  let bottoms = [...this.props.bottomImages]
    if(bottoms.length > 0 ){
      return (
        <Bottom updateIndex={this.props.setBottomIndex} imgs={bottoms} />
        )
    } 
 }
}
showDefault = () =>{
  
   return (
     <>
      {this.showTops()}
      {this.showBottoms()}
      </>
   )
 }

 savePics = () => {
  //  so now just make an axios call here and send these 2 things
  if(!this.props.currentlyLoggedInUser){
    this.props.history.push('/login');
  } else{
  
    if(this.props.catSelection === 'Dress'){
    
      this.props.saveOutfit([this.props.topImages[this.props.currentTopIndex]]);
    } else {
     console.log(this.props.currentTopIndex,this.props.currentBottomIndex)
      this.props.saveOutfit([this.props.topImages[this.props.currentTopIndex],this.props.bottomImages[this.props.currentBottomIndex]]);
    }
  }
 }
displayTopOptions = () => {
  return this.props.categoryTop.map((cat,ind)=>{
    return (
      <option value={cat}>{cat}</option>
    )
  })
}
displayBottomOptions = () => {
  return this.props.categoryBottom.map((cat,ind)=>{
    return (
      <option value={cat}>{cat}</option>
    )
  })
}
  render() {
   // this.props.checkMyOutfits(this.props.topImages[this.props.currentTopIndex],this.props.bottomImages[this.props.currentBottomIndex])
      return (
        <div className="outfitpanel">
        <div className="home-wrapper">
        
          <div className="outfitsright"> 
            <div className="button-group">
            <select name = "catTopSelection" value = {this.props.catTopSelection} onChange={this.props.setCatSelection}>
                 {this.displayTopOptions()}
            </select>
            <button className={this.props.isActive === "Women" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Women')}>Women</button>
            <button className={this.props.isActive === "Men" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Men')}>Men</button>
            <select name = "catBottomSelection" value = {this.props.catBottomSelection} onChange={this.props.setCatSelection}>
                 {this.displayBottomOptions()}
            </select>
            </div>
           {this.showDefault()}
           {this.props.cannotSave  ? 
            <div className="saved-button-group">
             <button onClick={this.savePics} className="btn btn-primary" disabled>I am Disabled Save</button>
           </div>
           :
           <div className="saved-button-group">
             <button onClick={this.savePics} className="btn btn-primary">Save</button>
           </div>
           }
           {/* <div className="saved-button-group">
             <button onClick={this.savePics} className="btn btn-primary">Save</button>
           </div> */}
          </div>
          </div>
        </div>
      )

  
  }
}
export default HomePage