import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export class MyOutfits extends Component {
 displayMyClothes = (clothes) =>{
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
       return (
         <div key={ind} className="outfit-display">
            {this.displayMyClothes(outfit.selectedClothes)}
         </div>
       )
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
