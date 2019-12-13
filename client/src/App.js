import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Switch,Route, Link, Redirect} from 'react-router-dom';
import Home from './components/home-component/Home';
import HomePage from './components/HomePage';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import TopOutfits from './components/TopOutfits';


let errorMsg = ""
let theError = ""
let user = ""
export class App extends Component {
  state={
    skirts:{},
    womenShorts:{},
    clothes:[],
    topImages: [],
    bottomImages: [],
    currentlyLoggedInUser: null,
    ready: false
  }

componentDidMount() {
//Call fetchUserData in Component did mount:
    this.fetchUserData()
//------------------------------------------
//Call getClothes in Component did mount:
    this.getClothes();  
} 


getClothes = async() =>{
    await axios.get('http://localhost:5000/api/get-clothes')
    .then(response => {
      
      this.setState({clothes: response.data.allClothes})
    
      this.createImageArrays();  
    })
  }
  
createImageArrays =  () =>{
    if(this.state.clothes.length > 0){
      let tempTopArray = [];
      let tempBottomArray = [];
      this.state.clothes.forEach(element => {
        if(element.name.includes('Tops')||element.name.includes('Shirts')){
          element.data.image.forEach((img,ind)=>{
            if(img['data-herosrc']){
              tempTopArray.push(img['data-herosrc'])
            } else if(img['src']){
              tempTopArray.push(img['src']);
            } 
          })
        } else if(element.name.includes('Bottoms')||element.name.includes('Pants')){
          element.data.image.forEach((img,ind)=>{
            if(img['data-herosrc']){
              tempBottomArray.push(img['data-herosrc'])
            } else if(img['src']){
              tempBottomArray.push(img['src']);
            } 
          })
        }
      });
      if(this.state.skirts.results){
        
          let tempBottom = [...tempBottomArray];
          this.state.skirts.results.forEach((skirt,ind)=>{
            tempBottom.push(skirt.image)
          })
          tempBottomArray = tempBottom;
      
        }       
      this.setState({
        topImages:tempTopArray,
        bottomImages:tempBottomArray,
      })
    }  
  }

  fetchUserData =  async () =>{
    try{ 
      let currentUser = await axios.get('http://localhost:5000/api/get-user-info', {withCredentials: true} )
      this.setState({
        currentlyLoggedInUser: currentUser.data,
        ready: true,
       })
    }
    catch(err){
      console.log(err);
    }
  }

//Login function, we send as props to Login component
  login = (email, password) => {
    axios.post('http://localhost:5000/api/login', {email: email, password: password}, {withCredentials: true})
    .then((response)=>{
        if(response.data.error){         
            errorMsg= response.data.error
            this.setState({currentlyLoggedInUser: null})
            console.log(this.state.currentlyLoggedInUser)
        }
        else{
            user = response.data.user.email;
            this.setState({currentlyLoggedInUser: response.data})
        }  
    })
    .catch((err)=>{
      console.log(err);
      this.setState({currentlyLoggedInUser: null})
    })
  }
//LOGIN FUNCTION ENDS


//Login Validation Function checks for login errors from router, if no errors, redirects the user to Profile
loginValidation = () => {
if(!errorMsg && user){
    return <Redirect to='/profile'/>
              }
    else if (errorMsg) {
      theError = errorMsg
      //reset errorMsg variable:
      errorMsg=""
      return (
              <div className="alert alert-danger" role="alert"><p>{theError}</p></div>)
            } 
          }

//Logout function, redirects to homepage and set currentlyLoggedInUser to null
LogoutAction = () =>{
    axios.get('http://localhost:5000/api/logout').then((res)=>{
      console.log(res)
      this.setState({
        currentlyLoggedInUser: null
      }, () => {
           this.props.history.push('/');
      })
      
    })
      .catch((err)=>{
      console.log(err);
})
}
//Logout ends here

render() {
    console.log("the user", this.state.currentlyLoggedInUser)
    return (
  
      <div className="App">
      <header className="navheader">
      <div className="container-fluid">
      <div className="navbar">
          <div className="leftnav">
          <div className="homelogo">
            <Link to="/">GLAM CLOSET</Link>
          </div>
          <div className="leftnavmenu">
            <Link to="/about">About</Link>
            <Link to="/top-outfits">Top Outfits</Link>
          </div>
          </div>
{/* If there is no user logged in, we show Login and Signup links, otherwise we show Profile and Logout */}
          {!this.state.currentlyLoggedInUser ? 
          <div className="rightnav">
            <Link to="/signup" style={{textDecoration:"none"}}>Sign up</Link>
            <Link to="/login" style={{textDecoration:"none"}}>Log in</Link>
          </div>
          : 
          <div className="rightnav">
            <Link to="/profile" style={{textDecoration:"none"}}>Profile</Link>
            <a onClick={this.LogoutAction}>Logout</a>
          </div>
          }
          <div className="mobile-menu">
            <input type="checkbox" id="menuToggle" />
            <label for="menuToggle" className="menu-icon"><i className="fa fa-bars"></i></label>
            <ul>
            <Link to="/about">About</Link>
            <Link to="/top-outfits">Top Outfits</Link>
            <Link to="/signup" style={{textDecoration:"none"}}>Sign up</Link>
            <Link to="/login" style={{textDecoration:"none"}}>Log in</Link>
            </ul>
          </div>
      </div>
      </div>
      </header>
      <div className="container-fluid page">
      <Switch>
            <Route exact path='/' render = { (props) => <HomePage {...props} clothes = {this.state.clothes}
                                                                             skirts = {this.state.skirts}
                                                                             shorts = {this.state.womenShorts}
                                                                             topImages = {this.state.topImages}
                                                                             bottomImages = {this.state.bottomImages}
                                                                               
            /> } />
            <Route path='/about' component={About} />
            <Route exact path="/signup" component={Signup}/> 
            <Route exact path="/login" render={() => <Login login={this.login}/>}/>
            <Route exact path="/profile" render={(props) => <Profile 
            {...props} user ={this.state.currentlyLoggedInUser}/>}/>
            <Route exact path="/top-outfits" component={TopOutfits}/> 
      </Switch>
      </div>
      {this.loginValidation()}
   </div>
   
    )
  }
}

export default App

