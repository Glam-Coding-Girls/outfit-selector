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
            <form onSubmit={this.saveUser}>
            <h3>Email:</h3>
                <input type="text" name="emailInput" 
                value={this.state.emailInput} 
                onChange={this.updateInput}/>
            <h3>Password:</h3>  
                <input type="text" name="passwordInput"
                value={this.state.passwordInput} 
                onChange={this.updateInput}/>
             {this.renderRedirect()}
            <button>Create the Account</button>
            </form>         
            </>
        )
    }
}

export default Signup