import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';


let user=""
let errorMsg=""
let theError=""
export class Signup extends Component {
state = {
    emailInput: "",
    passwordInput: "", 
    passwordInput2:""
}


updateInput = (e) =>{
    this.setState({[e.target.name]: e.target.value});
}


saveUser = (e)=>{
    e.preventDefault();

    axios.post('http://localhost:5000/api/signup', {
        email: this.state.emailInput,
        password: this.state.passwordInput,
        password2: this.state.passwordInput2
    }, {
        withCredentials: true
    })
    .then((response)=>{
        if(response.data.error){         
            errorMsg= response.data.error
        }
        if(response.data.user){
            user= response.data.user.email
        }
        this.setState({
            emailInput: "",
            passwordInput: "",
            passwordInput2: ""
        })
    })
    .catch((err)=>{
        console.log(err);
    }
)
}
signupValidation = () => {
//if user passed the server validation check, a user exists, 
//therefore registration was successful
console.log(this.state)
    if(user){
//reset user variable
        user="" 
        return(
            <div class="alert alert-success" role="alert">
            <strong>You're registered!<Link to="/login" style={{textDecoration:"none"}}> Login </Link> to start</strong>  
            </div>
        )      
    }
//if the user didn't pass server validation check, a error message exists, so we show the error msg
    else if (errorMsg) {
        theError = errorMsg
//reset errorMsg variable:
        errorMsg=""
        return (
            <div class="alert alert-danger" role="alert">
                <p>{theError}</p>
            </div>
        )
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
                <input type="password" name="passwordInput"
                value={this.state.passwordInput} 
                onChange={this.updateInput}/>
            <h3>Type your password again:</h3>  
                <input type="password" name="passwordInput2"
                value={this.state.passwordInput2} 
                onChange={this.updateInput}/>
            <button>Create the Account</button>
            </form> 
            {this.signupValidation()}    
            </>
        )
    }
}

export default Signup


  

