import React, { Component } from 'react'
import {Link} from 'react-router-dom';

// let errorMsg = ""
// let theError = ""
// let redirect = false
// let user = ""
export class Login extends Component {

// state = {
//         emailInput: "",
//         passwordInput: "",
//         currentlyLoggedInUser: null,   
//     }


// updateInput = (e) =>{
// this.setState({[e.target.name]: e.target.value});
// }

passLoginInfoToAppComponent = (e) =>{
    e.preventDefault();
    this.props.login();
    setTimeout(() => {
       if(this.props.redirect){
         console.log(this.props)
        this.props.history.push('/profile');
      }
     },270);
  }

// renderRedirect = () => {
//     if (redirect) {
//     return <Redirect to='/profile' />
//     }
//      }

displayValidation = () => {
if(this.props.theError) {
    // console.log(this.state)
    // console.log(this.props.redirect)
    // theError = errorMsg
    //reset errorMsg variable:
    // errorMsg=""
    return (
    <div className="alert alert-danger" role="alert"><p>{this.props.theError}</p></div>
    )
            } 
        }
       
    render() {

        return (
            <div className="container innerpage">
               <h1>Log in</h1>  
               <form className="formstyles" onSubmit={this.passLoginInfoToAppComponent}>
                 <div className="form-group">
                   <label>Email:</label>
                   <input type="text" className="form-control"  name="emailInput"
                          value={this.props.emailInput}
                          onChange={this.props.updateInput}/>
                 </div>
                 <div className="form-group">
                   <label>Password:</label>  
                   <input type="password" className="form-control" name="passwordInput"
                          value={this.props.passwordInput}
                          onChange={this.props.updateInput}/>
                 </div>
                 <p>If you don't have an account yet, you can create one
                 <Link to="/signup" style={{textDecoration:"none"}}> here</Link></p>
                 <button type="submit" className="btn btn-primary">Log in</button>
               </form>
                {this.displayValidation()}   
            </div>
        )
    }
}



export default Login