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

console.log(process.env, '////')
var serverURL = ''
if(process.env.NODE_ENV == 'development'){
  serverURL = 'http://localhost:5000'
} else {
  serverURL = 'https://glamcloset.herokuapp.com'
}
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
    currentlyLoggedInUser: null,
    currentTopIndex:0,
    currentBottomIndex:0, 
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
    outfit:[],
    myOutfits:[],
    sharedOutfits:[],
    userConfirm:false,
    deleteClicked:false,
    //pagination variables
      pageCount:1,
      offset: 0,
      elements: [],
      perPage: 4,
      currentPage: 0,
  }

  componentDidMount() {
    //Call fetchUserData in Component did mount:
   if(this.state.ready){
      this.fetchUserData()
    }
   //------------------------------------------
   //Call getClothes in Component did mount:
    this.getClothes();
    this.getSharedOutfits();
  } 
//pagination
handlePageClick = (data) => {
  const selectedPage = data.selected;
  const offset = selectedPage * this.state.perPage;
  this.setState({ currentPage: selectedPage, offset: offset }, () => {
    this.setElementsForCurrentPage();
  });
}
setElementsForCurrentPage() {
  console.log(this.state.myOutfits.length)
  let elements = this.state.myOutfits
                .slice(this.state.offset, this.state.offset + this.state.perPage)
  //               .map(post =>
  //   ( <img src="{post.thumburl}" />)
  // );
  this.setState({ elements: elements, pageCount:this.state.myOutfits.length/this.state.perPage },()=>{
    console.log(this.state.elements)
  });
}
//homePage method calls
  getClothes = async() =>{
    await axios.get(`${serverURL}/api/get-clothes`)
    .then(response => {
      console.log(response.data)
      this.setState({clothes: response.data.allClothes})
      this.createImageArrays();  
    })
  }
setTopIndex = (x)=>{
  this.setState({currentTopIndex: x})
}

setBottomIndex = (x)=>{
  this.setState({currentBottomIndex: x})
}
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
            }
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
          } else if(element.name.toUpperCase().includes('Bottoms'.toUpperCase())||
          element.name.toUpperCase().includes('Pants'.toUpperCase())||
          element.name.toUpperCase().includes('Jean'.toUpperCase())){
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

saveOutfit = (arr) => {
if(arr.length > 0){
  this.setState({
    outfit:arr
  },()=>{
    console.log(this.state.outfit)
    this.createOutfit();
  });
}
}

createOutfit = () =>{
  axios.post(`${serverURL}/api/add-outfit`,
  {
    selectedClothes: this.state.outfit,
    likedBy: [],
    share: false
  }, {withCredentials: true})
  .then((res)=>{
    console.log(res.data)
    if(res.data.message === 'success'){
      this.getOutfits();
      setTimeout(() =>{
        this.props.history.push('/my-outfits')
      },250)
    }
  })
  .catch((err)=>console.log(err))
}

getOutfits = () => {
  axios.get(`${serverURL}/api/get-outfits`,{withCredentials:true})
       .then(resp => {
         console.log(resp.data)
         this.setState({
            myOutfits:resp.data.allOutfits
         },()=>{
           console.log(this.state.myOutfits)
           this.setElementsForCurrentPage();
         })
        })
       .catch((err)=>console.log(err))
}
setUserConfirmation = (message) =>{
  this.setState({
    userConfirm:message,
    deleteClicked:false
  },()=>{
    if(this.state.userConfirm){
      this.deleteOutfit(this.state.outfit)
      this.setState({
        userConfirm:false
      })
    }
  })
 }
 setDeleteClickedStatus = (outfit) => {
  this.setState({
    deleteClicked:true,
    outfit:outfit
  })
 }
deleteOutfit = (obj) => {
  console.log(obj)
 axios.post(`${serverURL}/api/delete-outfit/${obj._id}`,{withCredentials:true})
      .then((response) => {
        console.log(response)
        if(response.data.message === 'success'){
          this.getOutfits();
          this.getSharedOutfits();
        }
      })
      .catch((err) => console.log(err))
}
shareOutfit = (obj) => {
  let shareObj = {...obj};
  shareObj.share = !shareObj.share;
  axios.post(`${serverURL}/api/update-outfit/${shareObj._id}`,
  shareObj,
  {withCredentials:true})
       .then((response) => {
         console.log(response)
         if(response.data.message === "success"){
          this.getSharedOutfits();
          this.props.history.push('/shared-outfits')
         }
       })
       .catch((err) => console.log(err))
}

getSharedOutfits = () =>{
  axios.get(`${serverURL}/api/get-shared`)
       .then((response)=>{
         if(response.data){
           this.setState({
             sharedOutfits:response.data.outfits
           })
         }
       })
       .catch((err)=>console.log(err))
}
// <-------------------End HomePage method calls ----------------->
  //check session
  fetchUserData =  async () =>{
    try{ 
      let currentUser = await axios.get(`${serverURL}/api/get-user-info`, {withCredentials: true} )
      console.log('fetch user' + currentUser)
      this.setState({
        currentlyLoggedInUser: currentUser.data,
        profilePic: currentUser.data.profilePic,
        currentEmail: currentUser.data.email,
        currentPass: currentUser.data.password,
        username: currentUser.data.username,
        ready: true,
      },()=>{
        this.getOutfits();
      })
    }
    catch(err){
      console.log(err);
    }
  }

//-------------------->Login and signup method calls<------------------------------------
  updateInput = (e) =>{
    this.setState({[e.target.name]: e.target.value, theError:null, registered:false})
    }

signup = () => {
let randomUserNumber = Math.floor((Math.random() * 20) + 10);  
let usernamePart1 = this.state.emailInput.slice(0,4)
    axios.post(`${serverURL}/api/signup`, {
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
      axios.post(`${serverURL}/api/login`, {
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
                console.log(response.data.user)
                 this.setState({
                    currentlyLoggedInUser: response.data.user,
                    ready: true,
                    redirect:true,
                    theError:null,
                    profilePic: response.data.user.profilePic,
                    currentEmail: response.data.user.email,
                    currentPass: response.data.user.password
                  },()=>{
                    this.getOutfits();
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
  axios.put(`${serverURL}/api/profile/`+this.state.currentlyLoggedInUser._id, user, {
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
    axios.get(`${serverURL}/api/logout`)
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
  
  return axios.put(`${serverURL}/api//profile-pic/`+this.state.currentlyLoggedInUser._id, uploadData, 
  {withCredentials: true})
  .then(response => {
      this.setState({ profilePic: response.data.secure_url });
    })
    .catch(err => {
      console.log("Error while uploading the file: ", err);
    });
}


  render() {

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
                                                                            saveOutfit = {this.saveOutfit}
                                                                            currentTopIndex = {this.state.currentTopIndex}
                                                                            currentBottomIndex = {this.state.currentBottomIndex}
                                                                            setBottomIndex = {this.setBottomIndex}
                                                                            setTopIndex = {this.setTopIndex}
                                                                            currentlyLoggedInUser ={this.state.currentlyLoggedInUser}
                                                                               
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
                                                                                  currentlyLoggedInUser ={this.state.currentlyLoggedInUser}
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
            <Route exact path="/shared-outfits" render={(props) => <SharedOutfits {...props}  currentlyLoggedInUser ={this.state.currentlyLoggedInUser}
                                                                                    sharedOutfits={this.state.sharedOutfits}

            />}/>
            <Route exact path="/my-outfits" render={(props) => <MyOutfits {...props}  currentlyLoggedInUser ={this.state.currentlyLoggedInUser}
                                                                                    myOutfits={this.state.myOutfits}
                                                                                    shareOutfit = {this.shareOutfit}
                                                                                    deleteOutfit = {this.deleteOutfit}
                                                                                    deleteClicked = {this.state.deleteClicked}
                                                                                    userConfirm = {this.state.userConfirm}
                                                                                    setUserConfirmation = {this.setUserConfirmation}
                                                                                    setDeleteClickedStatus = {this.setDeleteClickedStatus}
           setElementsForCurrentPage = {this.setElementsForCurrentPage}
           handlePageClick = {this.handlePageClick}
           currentPage = {this.state.currentPage}
           elements = {this.state.elements}
           pageCount = {this.state.pageCount}
            />}/>
          </Switch>
       
          </div>
        </div> 
    )
  }
}

export default App

