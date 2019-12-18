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
      if(!this.props.currentlyLoggedInUser){
        setTimeout(() => {
          if(!this.props.currentlyLoggedInUser){
            console.log("Hello")
            return this.props.sharedOutfits.map((outfit,ind)=>{
              return (
                <div key={ind} className="outfit-display">
                   {this.displayMyClothes(outfit.selectedClothes)}
                </div>
              )
           })
         // }
        }
        },350);
        } else{
      //if(this.props.sharedOutfits.length > 0) {
        return this.props.sharedOutfits.map((outfit,ind)=>{
          return (
            <div key={ind} className="outfit-display">
               {this.displayMyClothes(outfit.selectedClothes)}
{/* below we check if current user has already liked this outfit, and if yes, we call Unlike function */}
            {outfit.likedBy.includes(this.props.currentlyLoggedInUser._id)?  
            <div className= "like-section">
            <a onClick={ () => this.props.unlikeOutfit(outfit)}><i className="fas fa-heart"></i></a>
            <span>{outfit.likedBy.length}</span><p>Likes</p>       
            </div>
            :
            <div className= "like-section">
            <a onClick={ () => this.props.likeOutfit(outfit)}><i className="far fa-heart"></i></a>
            <span>{outfit.likedBy.length} </span><p> Likes</p>       
            </div>}
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
