import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export class MyOutfits extends Component {
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
          <div key={index} className="clothe-sections">
             <img style={{'borderRadius':'7px'}} src={clothe.image} alt="outfit" />
          </div>
        )
      })
      }
     

 }

  displayOutfits = () =>{
    if(!this.props.currentlyLoggedInUser){
      setTimeout(() => {
        if(!this.props.currentlyLoggedInUser){
          return ( 
            <>
              <Redirect to='/login'/>
            </>
          )
        }
      },250);
      } else{
    return this.props.myOutfits.map((outfit,ind)=>{
      if(this.props.myOutfits.length > 0){
        return (
          <div key={ind} className="outfit-display">
             {this.displayMyClothes(outfit.selectedClothes)}
          </div>
        )
      } else{
        return(
          <div>

          </div>
        )
      }
       
    })
  }
  }
  render() {
    console.log(this.props.myOutfits)
    return (
      <div className="outfits-wrapper">
        {this.displayOutfits()}
      </div>
    )
  }
}

export default MyOutfits
