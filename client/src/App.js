import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Switch,Route, Link} from 'react-router-dom';
import Home from './components/home-component/Home';
import HomePage from './components/HomePage';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import TopOutfits from './components/TopOutfits';



export class App extends Component {
  state={
    skirts:{},
    womenShorts:{},
    clothes:[],
    topImages: [],
    bottomImages: [],
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/skirts')
    .then(response => {
   
      this.setState({ skirts:response.data });
    })
    .catch(error => {
      console.log(error);
    });
    axios.get('http://localhost:5000/api/women-shorts')
    .then(response => {
      this.setState({ womenShorts:response.data });
    })
    .catch(error => {
      console.log(error);
    });
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
            <Link to="/signup" style={{textDecoration:"none"}}>Sign up</Link>
            <Link to="/login" style={{textDecoration:"none"}}>Log in</Link>
          </div>
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
            <Route exact path="/login" component={Login}/>
            <Route exact path="/profile" component={Profile}/> 
            <Route exact path="/top-outfits" component={TopOutfits}/> 
      </Switch>
      </div>
   </div>
    )
  }
}

export default App

