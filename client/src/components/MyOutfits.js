import React, { Component } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {Redirect} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { MDBTooltip, MDBBtn } from "mdbreact";

var serverURL = ''
if(process.env.NODE_ENV == 'development'){
  serverURL = 'http://localhost:8080'
} else {
  serverURL = 'https://glamcloset.herokuapp.com'
}


export class MyOutfits extends Component {
  state = {
    faceImg:"",
    uploadFace: true
  }

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
            {/* <div className="content-overlay"></div> */}
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
                  {/* <div className="content-overlay"></div> */}
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



 uploadFaceImage = (e) =>{
  const uploadData = new FormData();
  uploadData.append("faceImg", e.target.files[0]);
  
  return axios.post(`${serverURL}/api/face-img-upload/`, uploadData, 
  {withCredentials: true})
  .then(response => {
      this.setState({ faceImg: response.data.secure_url, uploadFace: !this.state.uploadFace})
    })
    .catch(err => {
      console.log("Error while uploading the file: ", err);
    }); 
 }

 removeFaceImage = () =>{
  this.setState({ faceImg:"", uploadFace: !this.state.uploadFace});
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
      } else if(this.props.elements[0]==undefined){
   
        return (
          <div className="no-outfit-container">
          <div className="no-outfit-text">         
          <h2>You currently don't have any saved outfits.</h2>
          <p>Go back to the <a href="/">homepage</a>, and click "Save" under your favorite outfit to see it here.</p>
          </div> 
          <img src="./empty-outfit.png"/>
          </div>
        )
      }    
      else{
      
    return this.props.elements.map((outfit,ind)=>{
       return (
         <>
         <div key={ind} className="outfit-display">
            <img className="face-upload" src={this.state.faceImg} />
            <button className="delete" onClick={()=>this.deleteSelected(outfit)}><i className="fas fa-times-circle"></i></button>
            {this.displayMyClothes(outfit.selectedClothes)}
            <MDBTooltip placement="left">
            <MDBBtn onClick={()=>this.sharePics(outfit)} className="btn btn-primary sharebtn">Share</MDBBtn>
            <div>Your headshot will not be shared with this outfit.</div>
            </MDBTooltip>
         </div>
         </>
       )
    })
  }
  }


  render() {
    return (
      <div className="my-outfit-wrapper">
      {this.props.elements[0]!=undefined?
    
      
      <div className="pagination-wrapper">  
      {this.state.uploadFace?
      <label className="upload-headshot-btn" >
      Upload your headshot<input type="file" style={{display: "none"}} onChange={(e) => this.uploadFaceImage(e)}/>
      </label>:
      <button className="upload-headshot-btn" onClick ={() => this.removeFaceImage()}> Remove headshot</button>}
       <ReactPaginate containerClassName="pagination-container"
                       pageClassName="page-list"
                       activeClassName="active-page"
                       previousLinkClassName="page-list"
                       nextLinkClassName="page-list"
                       breakLabel={'...'}
                       pageCount={this.props.pageCount}
                       breakClassName="page-ellipsis"
                       breakLinkClassName="page-ellipsis-a"
                       pageRangeDisplayed={1}
                       marginPagesDisplayed={1}
                       onPageChange={this.props.handlePageClick}
                       forcePage={this.props.currentPage}
                       previousLabel={"Prev"}
                       nextLabel={"Next"}
        />
        </div>:<></>}
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
