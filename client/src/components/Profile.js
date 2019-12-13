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
      <p>Welcome {this.props.user.user.email}</p>
    </>
  )
}
  }
}

export default Profile



  