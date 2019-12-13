import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

export class Profile extends Component {
  state = {
    img: "./profile_icon.png",
    showEditEmail:false,
    showEditPass:false
  }

  handleEditEmailClick = () =>{
    this.setState({showEditEmail: !this.state.showEditEmail})
  }
  handleEditPassClick = () =>{
    this.setState({showEditPass: !this.state.showEditPass})
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
          <p>Hey {this.props.currentlyLoggedInUser.email}!</p>
          </div>  
          <div className="profile-main-content">  
          <h3>ACCOUNT SETTINGS</h3>     
            <form>

           
                <div className="field">
                  <label>PHOTO</label>
                  <span>
                  <img id="profile-image" src={this.state.img}
                       onMouseEnter={() => {
                        this.setState({
                              img:"./profile_icon_cam.png"
                           })
                         }}
                       onMouseOut={() => {
                         this.setState({
                           img: "./profile_icon.png"
                         })
                      }}/>
                    </span>
                </div>
                <div className="field">
                    <label>ACCOUNT EMAIL</label>
                    {!this.state.showEditEmail?
                    <> 
                      <span> {this.props.currentlyLoggedInUser.email}</span>
                      </>
                      :
                      <>
                      <input type="text" name="email" 
                      value={this.props.currentlyLoggedInUser.email}
                      onChange={this.props.updateInput}
                      />
                      </>
                    }
                      {!this.state.showEditEmail?
                        <> 
                      <i className="fas fa-pen-square" onClick={this.handleEditEmailClick}/>
                      </> 
                      :
                      <>
                      <i class="far fa-save"></i>
                      </>
                    }
                </div>
                <div className="field">
                    <label>PASSWORD</label>  
                    {!this.state.showEditPass?
                    <>
                    <span> ••••••••</span>
                    
                    {/* <i className="fas fa-pen-square" onClick={this.handleEditPassClick}/></> */}
                    </>
                    :
                    <>
                    {/* <form> */}
                    <input type="password" name="password" 
                    value={this.props.currentlyLoggedInUser.password}
                    onChange={this.props.updateInput}
                    />
                    {/* </form> */}
                    </>
                    }
                    {!this.state.showEditPass?
                    <>
                    <i className="fas fa-pen-square" onClick={this.handleEditPassClick}/></>
                    :
                    <>
                    <i class="far fa-save"></i>
                    </>}
                </div>
                </form>
            </div>
          </div>
        </div>
      )
    } 
 }
render() {
  // console.log(this.props.currentlyLoggedInUser)
  return(
     <>
      {this.checkUserSession()}
     </>
  )
 }
}

export default Profile


          
