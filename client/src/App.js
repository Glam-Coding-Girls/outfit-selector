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
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
  }
  state={
    clothes:[],
    topImages: [],
    bottomImages: [],
    defaultSelection:'Women',
    catSelection:'twoPiece',
    currentlyLoggedInUser:null,
    emailInput: "",
    passwordInput: "",
    passwordInput2:"",
    redirect:false,
    theError:null,
    isActive: 'Women',
    ready: false,
    registered: false,
    currentPic: 0,
    profilePic: "",
    currentEmail: "",
    currentPass: "",
  }

  componentDidMount() {
    //Call fetchUserData in Component did mount:
    if(this.state.ready){

      this.fetchUserData()
    }
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
     isActive: selection,
    //  catSelection:'twoPiece',
    topImages: [],
    bottomImages: [],
    },()=>{
  this.createImageArrays(); 
})
}
 setCatSelection = (e) =>{
  this.setState({
    catSelection:e.target.value,
    topImages: [],
    bottomImages: [],
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
        if(element.type === "Women"){
          if(this.state.catSelection === "Dress"){
            if(element.name.toUpperCase().includes('Dress'.toUpperCase())){
              this.createObjCall(element).forEach(obj => {
                tempTopArray.push(obj);
              })
              // tempBottomArray = [];
            }
            //tempBottomArray = null;
          } else{
            if(element.name.toUpperCase().includes('Tops'.toUpperCase())||
            element.name.toUpperCase().includes('Shirts'.toUpperCase())||
            element.name.toUpperCase().includes('Blouses'.toUpperCase())||
            element.name.toUpperCase().includes('Sweater'.toUpperCase())||
            element.name.toUpperCase().includes('Tees'.toUpperCase())){
              this.createObjCall(element).forEach(obj => {
                tempTopArray.push(obj);
              })
            } else if(element.name.toUpperCase().includes('Bottoms'.toUpperCase())||
            element.name.toUpperCase().includes('Pants'.toUpperCase())||
            element.name.toUpperCase().includes('Jean'.toUpperCase())||
            element.name.toUpperCase().includes('Skirt'.toUpperCase())){
              this.createObjCall(element).forEach(obj => {
                tempBottomArray.push(obj);
              })
            }
          }
        } else{
          if(element.name.toUpperCase().includes('Tops'.toUpperCase())||element.name.toUpperCase().includes('Shirts'.toUpperCase())||element.name.toUpperCase().includes('Blouses'.toUpperCase())){
            this.createObjCall(element).forEach(obj => {
              tempTopArray.push(obj);
            })
          } else if(element.name.toUpperCase().includes('Bottoms'.toUpperCase())||element.name.toUpperCase().includes('Pants'.toUpperCase())){
            this.createObjCall(element).forEach(obj => {
              tempBottomArray.push(obj);
            })
          }
      }
    }
    });  
      this.setState({
        topImages:tempTopArray,
        bottomImages:tempBottomArray,
      })
    } 
  }

  createObjCall = (element) =>{
    let im;
    let link;
    let arr = [];
      element.data.image.forEach((img,ind)=>{
        if(img['data-herosrc']){
          im = img['data-herosrc']
       } else if(img['src']){
          im = img['src']
       } 
        element.data.priceData.forEach((redirectLink,topsInd)=>{
          if(ind === topsInd){
            link = redirectLink['href']
          }
      })
      arr.push({'image':im, 'href':link})
      })
    return arr;
  }


// <-------------------End HomePage method calls ----------------->
  //check session
  fetchUserData =  async () =>{
    try{ 
      let currentUser = await axios.get('http://localhost:5000/api/get-user-info', {withCredentials: true} )
      this.setState({
        currentlyLoggedInUser: currentUser.data,
        profilePic: currentUser.data.profilePic,
        currentEmail: currentUser.data.email,
        currentPass: currentUser.data.password,
        ready: true,
      })
    }
    catch(err){
      console.log(err);
    }
  }

//-------------------->Login and signup method calls<------------------------------------
  updateInput = (e) =>{
    this.setState({[e.target.name]: e.target.value, theError:null})
    }

signup = () => {
let randomUserNumber = Math.floor((Math.random() * 20) + 10);  
let usernamePart1 = this.state.emailInput.slice(0,4)
    axios.post('http://localhost:5000/api/signup', {
      email: this.state.emailInput,
      password: this.state.passwordInput,
      password2: this.state.passwordInput2,
      username: usernamePart1+randomUserNumber
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
                    theError:null,
                    profilePic: response.data.user.profilePic,
                    currentEmail: response.data.user.email,
                    currentPass: response.data.user.password
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

// <-------------------------Edit User Details---------------------------------------------->
editTheUser = (e) =>{
  e.preventDefault();
  const user = {
    email: this.state.currentEmail,
    password: this.state.currentPass
  }

  console.log('=-=-=-', this.state.currentEmail, this.state.currentPass);
  
  axios.put('http://localhost:5000/api/profile/'+this.state.currentlyLoggedInUser._id, user, {
      withCredentials: true
  })
  .then((res)=>{
      if(res.data.error){         
          this.setState({
            theError: res.data.error,
          })
      }
      else{
      console.log("user updated")
      this.fetchUserData()
        this.setState({
          theError:null,
          registered:true,
        })
      }
  })
  .catch((err)=>{
      console.log(err);
  }
)
}

//Logout function, redirects to homepage and set currentlyLoggedInUser to null
LogoutAction = () =>{
    axios.get('http://localhost:5000/api/logout')
         .then((res)=>{
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

//------------------>Profile pic upload<----------------------------------
handleFileUpload = e => {
  console.log("The file to be uploaded is: ", e.target.files[0]);

  const uploadData = new FormData();
  uploadData.append("profilePic", e.target.files[0]);
  
  return axios.put('http://localhost:5000/api//profile-pic/'+this.state.currentlyLoggedInUser._id, uploadData)
  .then(response => {
      this.setState({ profilePic: response.data.secure_url });
    })
    .catch(err => {
      console.log("Error while uploading the file: ", err);
    });
}


  render() {
    // console.log("current array index",this.state.currentPic);
    // console.log(this.state.currentlyLoggedInUser)
    return (
      <div >
      <Navigation currentlyLoggedInUser = {this.state.currentlyLoggedInUser}
                  LogoutAction = {this.LogoutAction} 
                  fetchUserData = {this.fetchUserData}
                  profilePic = {this.state.profilePic}
                  />
      <div className="container">
          <Switch>
            <Route exact path='/' render = { (props) => <HomePage {...props} clothes = {this.state.clothes}
                                                                             topImages = {this.state.topImages}
                                                                             bottomImages = {this.state.bottomImages}
                                                                             defaultSelection = {this.state.defaultSelection}
                                                                            setDefaultSelection = {this.setDefaultSelection}
                                                                            isActive = {this.state.isActive}
                                                                            setCatSelection = {this.setCatSelection}
                                                                            catSelection = {this.state.catSelection}
                                                                               
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
                                                                                editTheUser = {this.editTheUser}
                                                                                profilePic = {this.state.profilePic}
                                                                                handleFileUpload = {this.handleFileUpload}
                                                                                currentEmail = {this.state.currentEmail}
                                                                                currentPass = {this.state.currentPass}
                                                                                theError = {this.state.theError}
                                                                                registered = {this.state.registered}
            />}/>
            <Route exact path="/shared-outfits" component={SharedOutfits}/> 
            <Route exact path="/my-outfits" component={MyOutfits}/>
          </Switch>
          </div>
        </div> 
    )
  }
}

export default App

