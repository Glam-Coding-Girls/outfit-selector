import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Switch,Route} from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import SharedOutfits from './components/SharedOutfits';
import MyOutfits from './components/MyOutfits';
import Navigation from './components/Navigation';

export class App extends Component {
  state={
    clothes:[],
    topImages: [],
    bottomImages: [],
    defaultSelection:'Women',
    currentlyLoggedInUser:null,
    emailInput: "",
    passwordInput: "",
    passwordInput2:"",
    redirect:false,
    theError:null,
    isActive: 'Women',
    ready: false,
    registered: false,
  }

  componentDidMount() {
    //Call fetchUserData in Component did mount:
    this.fetchUserData()
   //------------------------------------------
   //Call getClothes in Component did mount:
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
//  setDefaultSelection = (e) =>{
//     this.setState({
//        defaultSelection: e.target.value
//       },()=>{
//     this.createImageArrays(); 
//   })
//  }
setDefaultSelection = (selection) =>{
  this.setState({
     defaultSelection:selection,
     isActive: selection
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
              });
          }
        }
    });  
      this.setState({
        topImages:tempTopArray,
        bottomImages:tempBottomArray,
      })
    } 
  }
// <-------------------End HomePage method calls ----------------->
  //check session
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

  //Login and signup method calls
  updateInput = (e) =>{
    this.setState({[e.target.name]: e.target.value});
    }

  signup = () => {
    axios.post('http://localhost:5000/api/signup', {
      email: this.state.emailInput,
      password: this.state.passwordInput,
      password2: this.state.passwordInput2
  }, {
      withCredentials: true
  })
  .then((response)=>{
      if(response.data.error){         
          this.setState({
            theError: response.data.error,
          })
      }
      if(response.data.user){
        this.setState({
          theError:null,
          registered: true
        })
      }
      this.setState({
          // emailInput: "",
          passwordInput: "",
          passwordInput2: ""
      })
  })
  .catch((err)=>{
      console.log(err);
  }
)
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
              if(response.data.user){
                 this.setState({
                    currentlyLoggedInUser: response.data.user,
                    ready: true,
                    redirect:true,
                    theError:null
                  })
                }
              this.setState({
                  emailInput: "",
                  passwordInput: "",
               })
          })
            .catch((err)=>{
                console.log(err);
                this.setState({
                   currentlyLoggedInUser: null,
                   ready: false,
                })
          })
      }
// <-------------------------End Login and Signup method calls ----------------------------->

//Logout function, redirects to homepage and set currentlyLoggedInUser to null
LogoutAction = () =>{
    axios.get('http://localhost:5000/api/logout').then((res)=>{
      console.log(res)
      this.setState({
        currentlyLoggedInUser: null,
        ready: false,
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
    // console.log("my user",this.state.currentlyLoggedInUser)
    return (
      <>
      <Navigation currentlyLoggedInUser = {this.state.currentlyLoggedInUser} LogoutAction = {this.LogoutAction}/>
          <Switch>
            <Route exact path='/' render = { (props) => <HomePage {...props} clothes = {this.state.clothes}
                                                                             topImages = {this.state.topImages}
                                                                             bottomImages = {this.state.bottomImages}
                                                                            defaultSelection = {this.state.defaultSelection}
                                                                            setDefaultSelection = {this.setDefaultSelection}
                                                                            isActive = {this.state.isActive}
                                                                               
            /> } />
            <Route path='/about' component={About} />
            <Route exact path="/signup" render = { (props) => <Signup {...props}  signup = {this.signup}
                                                                                  updateInput = {this.updateInput}
                                                                                  emailInput = {this.state.emailInput}
                                                                                  passwordInput = {this.state.passwordInput}
                                                                                  passwordInput2 = {this.state.passwordInput2} 
                                                                                  theError = {this.state.theError}
                                                                                  registered = {this.state.registered}
                                                                                  /> } />
            <Route exact path="/login" render = { (props) => <Login {...props}    login = {this.login}
                                                                                  updateInput = {this.updateInput}
                                                                                  emailInput = {this.state.emailInput}
                                                                                  passwordInput = {this.state.passwordInput}
                                                                                  redirect = {this.state.redirect} 
                                                                                  theError = {this.state.theError}
                                                                                  /> } />
            <Route exact path="/profile" render={(props) => <Profile {...props} currentlyLoggedInUser ={this.state.currentlyLoggedInUser}
                                                                                fetchUserData = {this.fetchUserData}
                                                                                updateInput = {this.updateInput}
                                                                      

            />}/>
            <Route exact path="/shared-outfits" component={SharedOutfits}/> 
            <Route exact path="/my-outfits" component={MyOutfits}/>
          </Switch>
        </> 
    )
  }
}

export default App

