import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Navigation extends Component {
  render() {
    return (

        <header className="navheader">
          <div className="container">
            <div className="navbar">
              <div className="leftnav">
                <div className="homelogo">
                   <Link to="/">GLAM CLOSET</Link>
                </div>
                <div className="leftnavmenu">
                   <Link to="/about">About</Link>
                   <Link to="/shared-outfits">Shared Outfits</Link>
                   {!this.props.currentlyLoggedInUser ? 
                  <Link to="/my-outfits"style={{display:'none'}}>My Outfits</Link>
                  :
                  <Link to="/my-outfits" >My Outfits</Link>
                  }
                </div>
              </div>
              {/* If there is no user logged in, we show Login and Signup links, otherwise we show Profile and Logout */}
              {!this.props.currentlyLoggedInUser ? 
                 <div className="rightnav">
                     <Link to="/login" style={{textDecoration:"none"}}>Log in</Link>
                 </div>
                 : 
                 <div className="rightnav">
                   <Link to="/profile" style={{textDecoration:"none"}}><img className="profile-nav-icon" src={this.props.profilePic}/></Link>
                   <a onClick={this.props.LogoutAction}>Logout</a>
                </div>
               }
             <div className="mobile-menu">
                <input type="checkbox" id="menuToggle" />
                <label htmlFor="menuToggle" className="menu-icon"><i className="fa fa-bars"></i></label>
                <ul>
                  <Link to="/about">About</Link>
                  <Link to="/shared-outfits">Shared Outfits</Link>
                  {!this.props.currentlyLoggedInUser ? 
                  <Link to="/my-outfits"style={{display:'none'}}>My Outfits</Link>
                  :
                  <Link to="/my-outfits" >My Outfits</Link>
                  }
                  <Link to="/login" style={{textDecoration:"none"}}>Log in</Link>
                </ul>
             </div>
           </div>
          </div>
        </header>

    )
  }
}

export default Navigation
