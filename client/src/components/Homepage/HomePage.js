import React, { Component } from 'react';
import Bottom from '../Bottom/Bottom';
import './homepage.css';


export class HomePage extends Component {

showTops = () =>{
  if(this.props.topImages){
    let tops = [...this.props.topImages];
    let selectOption = this.props.catSelection;
    // console.log(tops)
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
  console.log(bottoms)
  // setTimeout(()=>{
    if(bottoms.length > 0 ){
      return (
        <Bottom updateIndex={this.props.setBottomIndex} imgs={bottoms} />
        )
    } 
  // },250)
  
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
    console.log('else: ' + this.props.currentlyLoggedInUser)
    if(this.props.catSelection === 'Dress'){
      console.log('entering dress')
      this.props.saveOutfit([this.props.topImages[this.props.currentTopIndex]]);
    } else {
      console.log('entering tops,pants')
      this.props.saveOutfit([this.props.topImages[this.props.currentTopIndex],this.props.bottomImages[this.props.currentBottomIndex]]);
    }
  }
 }

  render() {
    console.log("-=-=-=-=-=-",this.state);
   
      return (
        <div className="outfitpanel">
          <div className="outfitsleft">
          </div>
          <div className="outfitsright">
            <div className="button-group">
            {this.props.defaultSelection === "Women" ? 
              <div>
              <select value = {this.props.catSelection} onChange={this.props.setCatSelection}>
                 <option value='Dress'>One piece</option>
                 <option value='twoPiece'>Two piece</option>
               </select>
            </div>
             : 
             <div>
             </div>
             }
            
            <button className={this.props.isActive === "Women" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Women')}>Women</button>
            <button className={this.props.isActive === "Men" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Men')}>Men</button>
            </div>
           {this.showDefault()}
           <div className="button-group">
  
   <button onClick={this.savePics} className="btn btn-primary">Save</button>
   </div>
          </div>
        </div>
      )

  
  }
}
export default HomePage