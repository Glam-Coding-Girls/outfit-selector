import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

export class Profile extends Component {
  state = {
    img: "./profile_icon.png"
  }

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
          }}
            />
            </div>
            <div>
                <label>ACCOUNT EMAIL </label>
                <span>{this.props.user.user.email}</span>
                <i class="fas fa-pen-square"></i>


                {/* <input type="text" name="emailInput"/> */}
            </div>
      <div>
                <label>PASSWORD </label>  
                <span>••••••••</span>
                <i class="fas fa-pen-square"></i>
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



  