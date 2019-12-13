import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

export class Profile extends Component {
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
        <>
          <p>Hey {this.props.currentlyLoggedInUser.email}!</p>
          <div>  
             <h1>Profile</h1>      
             <form>
                <div>
                  <label>PHOTO</label>
                </div>
                <div>
                    <label>Account Email</label>
                    <span>{this.props.currentlyLoggedInUser.email}</span>
    
                    {/* <input type="text" name="emailInput"/> */}
                </div>
                <div>
                    <label>Password</label>  
                    <span></span>
                    {/* <input type="password" name="passwordInput"/> */}
                </div>
             </form>  
           </div>
        </>
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



  