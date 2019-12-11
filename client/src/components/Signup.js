import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom';


export class Signup extends Component {
state = {
    emailInput: "",
    passwordInput: "", 
    redirect: false
}

updateInput = (e) =>{
    this.setState({[e.target.name]: e.target.value});
}

saveUser = (e)=>{
    e.preventDefault();

    axios.post('http://localhost:5000/api/signup', {
        email: this.state.emailInput,
        password: this.state.passwordInput,
    }, {
        withCredentials: true
    })
    .then((response)=>{
        this.setState({
            emailInput: "",
            passwordInput: "",
            redirect:true,
        })
     
    })
    .catch((err)=>{
        console.log(err);
    })
}


renderRedirect = () => {
  if (this.state.redirect) {
    return <Redirect to='/login'/>
  }
}
    render() {
        return (
            <>
            <h1>Sign up</h1>  
            <form className="formstyles" onSubmit={this.saveUser}>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" name="emailInput" 
                value={this.state.emailInput} 
                onChange={this.updateInput}/>
            </div>
            <div className="form-group">
                <label>Password</label>  
                <input type="text" className="form-control" name="passwordInput"
                value={this.state.passwordInput} 
                onChange={this.updateInput}/>
            </div>
             {this.renderRedirect()}
            <button type="submit" className="btn btn-primary">Create the Account</button>
            </form>         
            </>
        )
    }
}

export default Signup