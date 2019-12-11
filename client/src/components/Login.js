import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export class Login extends Component {

state = {
        emailInput: "",
        passwordInput: "",
        currentlyLoggedInUser: null,
        redirect: false
    }


updateInput = (e) =>{
this.setState({[e.target.name]: e.target.value});
}

   

renderRedirect = () => {
if (this.state.redirect) {
return <Redirect to='/profile' />
}
 }

    render() {
        return (
            <>
            <h1>Log in</h1>  
            <form onSubmit={this.saveInput}>
            <h3>Email:</h3>
                <input type="text" name="emailInput"
                  value={this.state.emailInput}
                  onChange={this.updateInput}  
                />
            <h3>Password:</h3>  
                <input type="text" name="passwordInput"
                value={this.state.passwordInput}
                onChange={this.updateInput}

                />
            <p>If you don't have an account yet, you can create one
            <Link to="/signup" style={{textDecoration:"none"}}> here</Link></p>
            {this.renderRedirect()}
            <button>Log in</button>
            </form>
                
            </>
        )
    }
}
export default Login