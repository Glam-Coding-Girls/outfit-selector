import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Switch,Route, Link} from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import TopOutfits from './components/TopOutfits';


export class App extends Component {
  state={
    clothes:[],
    topImages: [],
    bottomImages: [],
    defaultSelection:'Women',
    user:{},
    emailInput: "",
    passwordInput: "",
    redirect:false,
    theError:null,
  }
  componentDidMount() {
    this.getClothes();
  } 

  //homePage method calls
  getClothes = async() =>{
    await axios.get('http://localhost:5000/api/get-clothes')
    .then(response => {
      console.log(response.data)
      this.setState({clothes: response.data.allClothes})
      this.createImageArrays();  
    })
  }
 setDefaultSelection = (e) =>{
    this.setState({
       defaultSelection: e.target.value
      },()=>{
    this.createImageArrays(); 
  })
 }
  createImageArrays =  () =>{
    if(this.state.clothes.length > 0){
      let tempTopArray = [];
      let tempBottomArray = [];
      this.state.clothes.forEach(element => {
        if(element.type === this.state.defaultSelection){
        if(element.name.toUpperCase().includes('Tops'.toUpperCase())||element.name.toUpperCase().includes('Shirts'.toUpperCase())||element.name.toUpperCase().includes('Blouses'.toUpperCase())){
          element.data.image.forEach((img,ind)=>{
            if(img['data-herosrc']){
              tempTopArray.push(img['data-herosrc'])
            } else if(img['src']){
              tempTopArray.push(img['src']);
            } 
          })
        } else if(element.name.toUpperCase().includes('Bottoms'.toUpperCase())||element.name.toUpperCase().includes('Pants'.toUpperCase())){
          element.data.image.forEach((img,ind)=>{
            if(img['data-herosrc']){
              tempBottomArray.push(img['data-herosrc'])
            } else if(img['src']){
              tempBottomArray.push(img['src']);
            } 
          })
        }
      }
      });  
      this.setState({
        topImages:tempTopArray,
        bottomImages:tempBottomArray,
      })
    }
  }

  //Login and signup method calls
  updateInput = (e) =>{
    this.setState({[e.target.name]: e.target.value});
    }

  login = () => {
  axios.post('http://localhost:5000/api/login', {
        email: this.state.emailInput,
        password: this.state.passwordInput,
    }, {
        withCredentials: true
    })
    .then((response)=>{
        if(response.data.error){ 
          this.setState({
            theError:response.data.error,
          })        
        }
      // user = response.data.user.email;
      if(response.data.user){
      this.setState({
        currentlyLoggedInUser: response.data,
        redirect:true,
        theError:null
      })
      }
    })
    .catch((err)=>{
      console.log(err);
      this.setState({
        currentlyLoggedInUser: null
      })
    })
}


  render() {
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
          <div className="rightnav">
            {/* <Link to="/signup" style={{textDecoration:"none"}}>Sign up</Link> */}
            <Link to="/login" style={{textDecoration:"none"}}>Log in</Link>
          </div>
          <div className="mobile-menu">
            <input type="checkbox" id="menuToggle" />
            <label htmlFor="menuToggle" className="menu-icon"><i className="fa fa-bars"></i></label>
            <ul>
            <Link to="/about">About</Link>
            <Link to="/top-outfits">Top Outfits</Link>
            {/* <Link to="/signup" style={{textDecoration:"none"}}>Sign up</Link> */}
            <Link to="/login" style={{textDecoration:"none"}}>Log in</Link>
            </ul>
          </div>
      </div>
      </div>
      </header>
      <div className="container-fluid page">
      <Switch>
            <Route exact path='/' render = { (props) => <HomePage {...props} clothes = {this.state.clothes}
                                                                             topImages = {this.state.topImages}
                                                                             bottomImages = {this.state.bottomImages}
                                                                            defaultSelection = {this.state.defaultSelection}
                                                                            setDefaultSelection = {this.setDefaultSelection}
                                                                               
            /> } />
            <Route path='/about' component={About} />
            <Route exact path="/signup" component={Signup}/> 
            <Route exact path="/login" render = { (props) => <Login {...props}    login = {this.login}
                                                                                  updateInput = {this.updateInput}
                                                                                  emailInput = {this.state.emailInput}
                                                                                  passwordInput = {this.state.passwordInput}
                                                                                  redirect = {this.state.redirect} 
                                                                                  theError = {this.state.theError}
                                                                                  /> } />
            <Route exact path="/profile" component={Profile}/> 
            <Route exact path="/top-outfits" component={TopOutfits}/> 
      </Switch>
      </div>
   </div>
    )
  }
}

export default App

