import React, { Component } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {Redirect} from 'react-router-dom';

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
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                      <div className="tools">
                        <button onClick={zoomIn}>+</button>
                        <button onClick={zoomOut}>-</button>
                        <button onClick={resetTransform}>x</button>
                      </div>
                        <TransformComponent>
                        <img style={{'borderTopLeftRadius':'7px','borderTopRightRadius':'7px'}} src={clothe.image} alt="outfit" />
                        </TransformComponent>
                        </React.Fragment>
                    )}
                  </TransformWrapper>
             :
             <TransformWrapper>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                      <div className="tools">
                        <button onClick={zoomIn}>+</button>
                        <button onClick={zoomOut}>-</button>
                        <button onClick={resetTransform}>x</button>
                      </div>
                        <TransformComponent>
                        <img style={{'borderBottomLeftRadius':'7px','borderBottomRightRadius':'7px'}} src={clothe.image} alt="outfit" />
                        </TransformComponent>
                        </React.Fragment>
                    )}
                  </TransformWrapper>
            }
          </div>
        )
      })
      } else if(clothes.length === 1){
        return clothes.map((clothe,index)=>{
          return (
          <div key={index} className="clothe-sections one-piece-outfit">
             <TransformWrapper>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                      <div className="tools">
                        <button onClick={zoomIn}>+</button>
                        <button onClick={zoomOut}>-</button>
                        <button onClick={resetTransform}>x</button>
                      </div>
                        <TransformComponent>
                        <img style={{'borderRadius':'7px'}} src={clothe.image} alt="outfit" />
                        </TransformComponent>
                        </React.Fragment>
                    )}
                  </TransformWrapper>
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
         <div key={ind} className="outfit-display">
               <button className="delete" onClick={()=>this.deleteSelected(outfit)}><i class="fas fa-times-circle"></i></button>
            {this.displayMyClothes(outfit.selectedClothes)}
            <button onClick={()=>this.sharePics(outfit)} className="btn btn-primary">Share</button>
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
