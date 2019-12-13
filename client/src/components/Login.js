import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Login extends Component {

state = {
        emailInput: "",
        passwordInput: "",
    }


updateInput = (e) =>{
this.setState({[e.target.name]: e.target.value});
}

passLoginInfoToAppComponent = (e) =>{
    e.preventDefault();
    this.props.login(this.state.emailInput, this.state.passwordInput)
}

       
    render() {

        return (
            <>
            <h1>Log in</h1>  
            <form className="formstyles" onSubmit={this.passLoginInfoToAppComponent}>
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
            <button type="submit" className="btn btn-primary">Log in</button>
            </form>             
            </>
        )
    }
}



export default Login