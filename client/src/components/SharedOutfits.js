import React, { Component } from 'react'

export default class SharedOutfits extends Component {
 
  displayMyClothes = (clothes) =>{
    if(clothes.length > 1){
      return clothes.map((clothe,index)=>{
          return (
            <div key={index} className="clothe-sections">
              {index === 0 ? 
               <img style={{'borderTopLeftRadius':'7px','borderTopRightRadius':'7px'}} src={clothe.image} alt="outfit" />
               :
               <img style={{'borderBottomLeftRadius':'7px','borderBottomRightRadius':'7px'}} src={clothe.image} alt="outfit" />
              }
            </div>
          )
        })
        } else if(clothes.length === 1){
          return clothes.map((clothe,index)=>{
            return (
            <div key={index} className="clothe-sections" style={{height:'46vh'}}>
               <img style={{'borderRadius':'7px',height:'46vh'}} src={clothe.image} alt="outfit" />
            </div>
          )
        })
        }
       
  
   }
  
    displayOutfits = () =>{
      console.log(this.props.sharedOutfits)
    
      //if(this.props.sharedOutfits.length > 0) {
        return this.props.sharedOutfits.map((outfit,ind)=>{
          return (
            <div key={ind} className="outfit-display">
               {this.displayMyClothes(outfit.selectedClothes)}
            </div>
          )
       })
     // }
    }
  render() {
    return (
      <div className="container innerpage">
        <div className="outfits-wrapper">
          {this.displayOutfits()}
         </div>
      </div>
    )
  }
}
