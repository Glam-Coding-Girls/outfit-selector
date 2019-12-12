import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Switch,Route, Link} from 'react-router-dom';
// import Home from './components/home-component/Home';
import HomePage from './components/Homepage/HomePage';
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
    menArr: [],
    womenArr: [],
    defaultTopWomenImages: [],
    defaultBottomWomenImages: []
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
      this.createMenArrays();
      this.createWomenArrays();
      this.createDefaultArray();
    })
  }

  createMenArrays = () => {
    if(this.state.clothes.length > 0){
      let tempManArr = [];
      this.state.clothes.forEach(pickmen => {
        if(pickmen.type.includes('Men')) {
          tempManArr.push(pickmen);
        }
      })
      this.setState({
        menArr:tempManArr
      })
    }
  }
  createWomenArrays = () => {
    if(this.state.clothes.length > 0){
      let tempWomanArr = [];
      this.state.clothes.forEach(pickwomen => {
        if(pickwomen.type.includes('Women')) {
          tempWomanArr.push(pickwomen);
        }
      })
      this.setState({
        womenArr:tempWomanArr
      })
    }
  }
  
  createDefaultArray = () => {
    let temporaryDefaultWomenTop = [];
    let temporaryDefaultWomenBottom = [];
    let newDefaultWomenArr = [...this.state.womenArr];
    newDefaultWomenArr.forEach(defaultwomenitem => {
      if(defaultwomenitem.name.includes('Tops')||defaultwomenitem.name.includes('Shirts')) {
        defaultwomenitem.data.image.forEach((img)=>{
          if(img['data-herosrc']){
            temporaryDefaultWomenTop.push(img['data-herosrc'])
          } else if(img['src']){
            temporaryDefaultWomenTop.push(img['src'])
          }
        })
      } else if (defaultwomenitem.name.includes('Pants')){
        defaultwomenitem.data.image.forEach((img)=>{
          if(img['data-herosrc']){
            temporaryDefaultWomenBottom.push(img['data-herosrc'])
          } else if(img['src']){
            temporaryDefaultWomenBottom.push(img['src'])
          }
        })
      }
    })
    this.setState({
      defaultTopWomenImages: temporaryDefaultWomenTop,
      defaultBottomWomenImages: temporaryDefaultWomenBottom
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
    // console.log("men arrays", this.state.menArr);
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
            <label htmlFor="menuToggle" className="menu-icon"><i className="fa fa-bars"></i></label>
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
                                                                             selectMen = {this.state.menArr}
                                                                             selectWomen = {this.state.womenArr}
                                                                             topDefault = {this.state.defaultTopWomenImages}
                                                                             bottomDefault = {this.state.defaultBottomWomenImages}
                                                                               
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

