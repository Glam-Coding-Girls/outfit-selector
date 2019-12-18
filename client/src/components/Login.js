import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Login extends Component {

passLoginInfoToAppComponent = (e) =>{
    e.preventDefault();
    this.props.login();
  //  setTimeout(() => {
  //      if(this.props.redirect){
  //        console.log(this.props)
  //       this.props.history.push('/');
  //     }
  //    },300);
  }
  displayValidationMessage = () =>{
    return(
        <span style={{fontSize:'10px',color:'red'}}> {this.props.msg}</span>
    )    
}
displayValidationMessageForPassword = () =>{
return(
<span style={{fontSize:'10px',color:'red'}}> {this.props.msgPswd}</span>
)    
}
displayValidation = () => {
if(this.props.theError) {
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
                 {this.displayValidationMessage()}
                 <div className="form-group">
                   <label>Password:</label>  
                   <input type="password" className="form-control" name="passwordInput"
                          value={this.props.passwordInput}
                          onChange={this.props.updateInput}/>
                 </div>
                 {this.displayValidationMessageForPassword()}
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