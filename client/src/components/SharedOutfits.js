import React, { Component } from 'react'
import {MDBTooltip,MDBBtn } from "mdbreact";



export default class SharedOutfits extends Component {


  displayMyClothes = (clothes) =>{
    if(clothes.length > 1){
      return clothes.map((clothe,index)=>{
          return (
      
            <div key={index} className="clothe-sections">
              <div className="content-overlay"></div>
              {index === 0 ? 
               <img style={{'borderTopLeftRadius':'7px','borderTopRightRadius':'7px'}} src={clothe.image} alt="outfit" />
               :
               <img style={{'borderBottomLeftRadius':'7px','borderBottomRightRadius':'7px'}} src={clothe.image} alt="outfit" />
              }
              <a href={clothe.href} target="_blank">
                  <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">Click to see details</h3>
                  </div>
                  </a>
            </div>
    
          )
        })
        } else if(clothes.length === 1){
          return clothes.map((clothe,index)=>{
            return (
            <div key={index} className="clothe-sections" style={{height:'400px'}}>
              <div className="content-overlay"></div>
               <img style={{'borderRadius':'7px'}} src={clothe.image} alt="outfit" />
               <a href={clothe.href} target="_blank">
                  <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">Click to see details</h3>
                  </div>
                  </a>
            </div>
           
          )
        })
        } 
   }


    displayOutfits = () =>{
      if(!this.props.currentlyLoggedInUser){
        // setTimeout(() => {
          if(!this.props.currentlyLoggedInUser){
            let sorted = this.props.sharedOutfits.sort((a, b) => {
              return b.likedBy.length - a.likedBy.length
            })
            return sorted.map((outfit,ind)=>{
              return (
                <div key={ind} className="outfit-display">
                   {this.displayMyClothes(outfit.selectedClothes)}
                   <div className= "like-section">
            <i className="fas fa-heart"></i>
            <span>{outfit.likedBy.length}</span><p>Likes</p>       
            </div>
                </div>
              )
           })
         // }
        }
        // });
        } else{
      //if(this.props.sharedOutfits.length > 0) {

      let sorted = this.props.sharedOutfits.sort((a, b) => {
        return b.likedBy.length - a.likedBy.length
      })
        
        return sorted.map((outfit,ind)=>{
          console.log(outfit.selectedClothes)
          return (
            <div key={ind} className="outfit-display">
               {this.displayMyClothes(outfit.selectedClothes)}
{/* below we check if current user has already liked this outfit, and if yes, we call Unlike function */}
            {outfit.likedBy.includes(this.props.currentlyLoggedInUser._id)?  
            <>
            <div className= "like-section">
            <a className="heart-link" onClick={ () => this.props.unlikeOutfit(outfit)}><i className="fas fa-heart"></i></a>
            <span>{outfit.likedBy.length}</span><p>Likes</p>       
            </div>
            <MDBTooltip placement="left">
            <MDBBtn color="primary" onClick={()=>this.props.saveOutfit(outfit.selectedClothes)}>Save</MDBBtn>
            <div>Saves to My Outfits page</div>
            </MDBTooltip>
            </>
            :
            <>
            <div className= "like-section">
            <a className="heart-link" onClick={ () => this.props.likeOutfit(outfit)}><i className="far fa-heart"></i></a>
            <span>{outfit.likedBy.length} </span><p> Likes</p>       
            </div>
            <MDBTooltip placement="left">
            <MDBBtn color="primary" onClick={()=>this.props.saveOutfit(outfit.selectedClothes)}>Save</MDBBtn>
            <div>Saves to My Outfits page</div>
            </MDBTooltip>
            </>
            }
            </div>
          )
       })
     // }
    }
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
