import React, { Component } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {Redirect} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export class MyOutfits extends Component {

  sharePics = (outfit) =>{
    this.props.shareOutfit(outfit);
  }
  showPopup = () => {
    return ( 
      <div className="delete-pop-up">
        <h6>Are you sure you want to delete this?</h6>
        <div className="confirmation-controls">
        <button  onClick={()=>this.props.setUserConfirmation(true)}>Yes</button>
        <button  onClick={()=>this.props.setUserConfirmation(false)}>Cancel</button>
        </div>
        
      </div>
    )
  }
  deleteSelected= (outfit) =>{
    this.props.setDeleteClickedStatus(outfit);
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

    return this.props.elements.map((outfit,ind)=>{
       return (
         <div key={ind} className="outfit-display">
               <button className="delete" onClick={()=>this.deleteSelected(outfit)}><i class="fas fa-times-circle"></i></button>
            {this.displayMyClothes(outfit.selectedClothes)}
            <button onClick={()=>this.sharePics(outfit)} className="btn btn-primary sharebtn">Share</button>
         </div>
       )
    })
  }
  }
  render() {
    console.log(this.props.elements)
    return (
      <div className="my-outfit-wrapper">
       <ReactPaginate containerClassName="pagination-container"
                       pageClassName="page-list"
                       activeClassName="active-page"
                       previousLinkClassName="page-list"
                       nextLinkClassName="page-list"
                       breakLabel={<span >...</span>}
                       pageCount={this.props.pageCount}
                       pageRangeDisplayed={4}
                       marginPagesDisplayed={4}
                       onPageChange={this.props.handlePageClick}
                       forcePage={this.props.currentPage}
                       previousLabel={"Prev"}
                       nextLabel={"Next"}
        />
      <div className="outfits-wrapper">
      {this.props.deleteClicked ? 
        this.showPopup()
        :
        <div style={{display:'none'}}></div>
        }
      
        {this.displayOutfits()}
        
      </div>
      
        {this.props.deleteClicked ? 
        <div id="overlay"></div>
        :
        <div id="overlay" style={{display:'none'}}></div>
        }

      </div>
      
    )
  }
}

export default MyOutfits
