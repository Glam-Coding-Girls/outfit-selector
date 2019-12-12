import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

let errorMsg = ""
let theError = ""
let redirect = false
let user = ""
export class Login extends Component {

state = {
        emailInput: "",
        passwordInput: "",
        currentlyLoggedInUser: null,   
    }


updateInput = (e) =>{
this.setState({[e.target.name]: e.target.value});
}

logTheUser= (e) =>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', {
        email: this.state.emailInput,
        password: this.state.passwordInput,
    }, {
        withCredentials: true
    })
    .then((response)=>{
        if(response.data.error){         
            errorMsg= response.data.error
        }
      user = response.data.user.email;
      this.setState({currentlyLoggedInUser: response.data})
      if(user){
          redirect=true
      }
    })
    .catch((err)=>{
      console.log(err);
      this.setState({currentlyLoggedInUser: null})
    })
  }

renderRedirect = () => {
    if (redirect) {
    return <Redirect to='/profile' />
    }
     }

loginValidation = () => {

if (errorMsg) {
    console.log(this.state)
    console.log(redirect)
    theError = errorMsg
    //reset errorMsg variable:
    errorMsg=""
    return (
    <div className="alert alert-danger" role="alert"><p>{theError}</p></div>)
            } 
        }
       
    render() {

        return (
            <>
            <h1>Log in</h1>  
            <form className="formstyles" onSubmit={this.logTheUser}>
            <div className="form-group">
            <label>Email:</label>
                <input type="text" className="form-control"  name="emailInput"
                  value={this.state.emailInput}
                  onChange={this.updateInput}/>
                  </div>
            <div className="form-group">
            <label>Password:</label>  
            <input type="password" className="form-control" name="passwordInput"
                value={this.state.passwordInput}
                onChange={this.updateInput}/>
            </div>
            <p>If you don't have an account yet, you can create one
            <Link to="/signup" style={{textDecoration:"none"}}> here</Link></p>
            {this.renderRedirect()}
            <button type="submit" className="btn btn-primary">Log in</button>
            </form>
            {this.loginValidation()} 
                
            </>
        )
    }
}



export default Login