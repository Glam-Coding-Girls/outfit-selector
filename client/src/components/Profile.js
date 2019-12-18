import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';


export class Profile extends Component {
  state = {
    showEditEmail:false,
    showEditPass:false,
    saveIcon1: "./save-icon.png",
    saveIcon2: "./save-icon.png",
    editIcon1: "./edit-icon.png",
    editIcon2: "./edit-icon.png",
  }



  handleEditEmailClick = () =>{
    this.setState({showEditEmail: !this.state.showEditEmail})
  }
  handleEditPassClick = () =>{
    this.setState({showEditPass: !this.state.showEditPass})
  }

  editValidation = () => {
    //if user passed the server validation check, a user exists, 
    //therefore registration was successful
        if(!this.props.theError && this.props.registered){
            return(
                <div className="alert alert-success" role="alert">
                <strong>Updated Successfully!</strong>  
                </div>
            )      
        }
    //if the user didn't pass server validation check, a error message exists, so we show the error msg
        else if(this.props.theError && !this.props.registered){
            return (   
                <div className="alert alert-danger" role="alert">
                    <p>{this.props.theError}</p>
                </div>
            )
        } else if(!this.props.theError && !this.props.registered) {
            return (
                <div>
                </div>
            )
        }
    }


 checkUserSession = () =>{
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
      return ( 
         <div className="profile">
         <div className="profile-content">
          <div className="welcome-msg">
          <p>Hey {this.props.currentlyLoggedInUser.username}!</p>
          </div>  
          <div className="profile-main-content">  
          <h3>ACCOUNT SETTINGS</h3>     
          <form onSubmit= {this.props.editTheUser}>         
                <div className="field">
                  <label>PHOTO</label>
                  <div className ="profile-pic-upload">
                  <label htmlFor="file-input">
                  <img id="profile-image" alt="profile-img" src={this.props.profilePic}/></label>
                     <input id="file-input" type="file" onChange={(e) => this.props.handleFileUpload(e)} />
                    </div>
                </div>
                <div className="field">
                    <label>ACCOUNT EMAIL</label>
                    {!this.state.showEditEmail?
                    <> 
                      <span> {this.props.currentlyLoggedInUser.email}</span>
                      <img src={this.state.editIcon1} id="edit-icon" onClick={this.handleEditEmailClick}
                        onMouseEnter={() => {
                        this.setState({
                          editIcon1:"./edit-icon-hover.png"
                           })
                         }}
                       onMouseOut={() => {
                         this.setState({
                          editIcon1: "./edit-icon.png"
                         })}}
                      />
                      </>
                      :
                      <>
                      <input type="text" className="form-control" name="currentEmail" 
                           value={this.props.currentEmail} 
                           onChange={this.props.updateInput}/>
                      <button className="save-button"><img id="save-image" alt="save-icon" src={this.state.saveIcon1}
                       onMouseEnter={() => {
                        this.setState({
                          saveIcon1:"./save-icon1.png"
                           })
                         }}
                       onMouseOut={() => {
                         this.setState({
                          saveIcon1: "./save-icon.png"
                         })
                      }}/></button>
                      </>
                    }
                </div>
                <div className="field">
                    <label>PASSWORD</label>  
                    {!this.state.showEditPass?
                    <>
                    <span> ••••••••</span>
                    <img src={this.state.editIcon2} id="edit-icon" onClick={this.handleEditPassClick}
                        onMouseEnter={() => {
                        this.setState({
                          editIcon2:"./edit-icon-hover.png"
                           })
                         }}
                       onMouseOut={() => {
                         this.setState({
                          editIcon2: "./edit-icon.png"
                         })}}/>
                    </>
                    :
                    <>
                    <input type="password" className="form-control" name="currentPass"
                           defaultValue={''} 
                           onChange={this.props.updateInput}/>
                    <button className="save-button"><img id="save-image" alt="save icon" src={this.state.saveIcon2}
                       onMouseEnter={() => {
                        this.setState({
                          saveIcon2:"./save-icon1.png"
                           })
                         }}
                       onMouseOut={() => {
                         this.setState({
                          saveIcon2: "./save-icon.png"
                         })
                      }}/></button>
                    </>
                    }
                </div>
                {this.editValidation()}
                </form>
                </div>
            </div>
          </div>
      )
    } 
 }
render() {
  console.log(this.props.currentlyLoggedInUser)
  return(
     <>
      {this.checkUserSession()}
     </>
  )
 }
}

export default Profile


          
