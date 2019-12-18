import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export class MyOutfits extends Component {
  sharePics = (outfit) =>{
    this.props.shareOutfit(outfit);
  }
  deleteSelected= (outfit) =>{
    this.props.deleteOutfit(outfit);
  }
 displayMyClothes = (clothes) =>{
  if(clothes.length > 1){
    return clothes.map((clothe,index)=>{
        return (
          <div key={index} className="clothe-sections">
            {index === 0 ? 
              <TransformWrapper>
                    {({ zoomIn, zoomOut, ...rest }) => (
                        <TransformComponent>
                       <img style={{'borderTopLeftRadius':'7px','borderTopRightRadius':'7px'}} src={clothe.image} alt="outfit" />
                        </TransformComponent>
                    )}
                  </TransformWrapper>      
             :  
             <TransformWrapper>
                    {({ zoomIn, zoomOut, ...rest }) => (
                        <TransformComponent>
                        <img style={{'borderBottomLeftRadius':'7px','borderBottomRightRadius':'7px'}} src={clothe.image} alt="outfit" />
                        </TransformComponent>
                    )}
                  </TransformWrapper>          
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
       return (
         <>
         <div key={ind} className="outfit-display">
               <button className="delete" onClick={()=>this.deleteSelected(outfit)}>Del</button>
            {this.displayMyClothes(outfit.selectedClothes)}
            <button onClick={()=>this.sharePics(outfit)} className="btn btn-primary">Share</button>
         </div>
         </>
       )
    })
  }
  }
  render() {
    console.log(this.props.myOutfits)
    return (
      <>
      <div className="outfits-wrapper">
        {this.displayOutfits()}
      </div>
      
      </>
    )
  }
}

export default MyOutfits
