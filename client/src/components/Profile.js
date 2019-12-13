import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

export class Profile extends Component {

render() {
  if(!this.props.user){
    return ( 
      <>
        <Redirect to='/login'/>
      </>
    )

    }
else{
  return ( 
    <>
      <p>Hey {this.props.user.user.email}!</p>

  <div>  
      <h1>Profile</h1>      
    <form>
            <div>
            <label>PHOTO</label>
            </div>
            <div>
                <label>Account Email</label>
                <span>{this.props.user.user.email}</span>

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
}

export default Profile



  