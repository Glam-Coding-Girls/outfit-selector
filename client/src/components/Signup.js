import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Signup extends Component {
saveUser = (e)=>{
    e.preventDefault();
    this.props.signup();
}
signupValidation = () => {
//if user passed the server validation check, a user exists, 
//therefore registration was successful
    if(!this.props.theError && this.props.registered){
        return(
            <div className="alert alert-success" role="alert">
            <strong>You're registered!<Link to="/login" style={{textDecoration:"none"}}> Login </Link> to start</strong>  
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
    render() {
        return (
            <div className="container innerpage">        
               <h1>Sign up</h1>  
               <form className="formstyles" onSubmit={this.saveUser}>
                 <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="emailInput" 
                           value={this.props.emailInput} 
                           onChange={this.props.updateInput}/>
                 </div>
                 <div className="form-group">
                    <label>Password:</label>  
                    <input type="password" className="form-control" name="passwordInput"
                           value={this.props.passwordInput} 
                           onChange={this.props.updateInput}/>
                 </div>
                 <div className="form-group">
                    <label>Type your password again:</label>  
                    <input type="password" className="form-control" name="passwordInput2"
                           value={this.props.passwordInput2} 
                           onChange={this.props.updateInput}/>
                 </div>
                 <button type="submit" className="btn btn-primary">Create the Account</button>
                </form> 
                {this.signupValidation()}    
            </div>
        )
    }
}

export default Signup


  

