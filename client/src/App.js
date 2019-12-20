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
import validator from 'validator';


console.log(process.env, '////')
var serverURL = ''
if(process.env.NODE_ENV == 'development'){
  serverURL = 'http://localhost:8080'
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
    catTopWomenSelection: "Tops",
    catBottomWomenSelection: "Pants",
    catTopMenSelection: "Shirts",
    catBottomMenSelection: "Pants",
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
    //client-side validation variables
     msg:"",
     msgPswd:"",
     msgPswd2:""
  }

  async componentDidMount() {
    //Call fetchUserData in Component did mount:
     this.fetchUserData()
   //------------------------------------------
   //Call getClothes in Component did mount:
    this.getClothes();
    this.getSharedOutfits();
  } 
//client-side validation
checkValidation = () => {
  let msg = '';
  let msgPswd = '';
  let msgPswd2 = '';
  if(this.state.emailInput === ""){
    console.log('empty email')
   msg = '* Email is required, Please provide an email address'
  }
  if(!validator.isEmail(this.state.emailInput)){
    console.log('invalid email')
    msg = '* Email is invalid, Enter a valid email address' 
  } 
  if(validator.isEmpty(this.state.passwordInput)){
    msgPswd = '* Password is required, Please provide a password'
  }
  if(validator.isLength(this.state.passwordInput,[{min:6}])){
    msgPswd = '* Minimum length of password is 6'
  } 
  if(validator.isEmpty(this.state.passwordInput2)){
    msgPswd2 = '* Please re-type password'
  } 
  if(this.state.passwordInput !== this.state.passwordInput2){
    msgPswd2 = '* Password is not matching, Please re-type password'
  } 
  this.setState({
    msg:msg,
    msgPswd:msgPswd,
    msgPswd2:msgPswd2
  })
 // console.log(this.state.msg, this.state.msgPswd, this.state.msgPswd2)
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
  let elements = this.state.myOutfits
                .slice(this.state.offset, this.state.offset + this.state.perPage)
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
 setCatSelection = (selectedOption) =>{
   console.log(selectedOption)
  this.setState({
    catSelection:selectedOption.value,
    topImages: [],
    bottomImages: [],
   },()=>{
 this.createImageArrays(); 
})
 } 
 setCatTopWomenSelection = (e) =>{
  this.setState({
    catTopWomenSelection:e.target.value,
    topImages: [],
    bottomImages: [],
   },()=>{
 this.createImageArrays(); 
})
 } 
 setCatBottomWomenSelection = (e) =>{
  this.setState({
    catBottomWomenSelection:e.target.value,
    topImages: [],
    bottomImages: [],
   },()=>{
 this.createImageArrays(); 
})
 } 
 setCatTopMenSelection = (e) =>{
  this.setState({
    catTopMenSelection:e.target.value,
    topImages: [],
    bottomImages: [],
   },()=>{
 this.createImageArrays(); 
})
 } 
 setCatBottomMenSelection = (e) =>{
  this.setState({
    catBottomMenSelection:e.target.value,
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
          } else {
            if (this.state.catTopWomenSelection) {
            if (this.state.catTopWomenSelection === "Tops") {
              if(element.name.toUpperCase().includes('Tops'.toUpperCase())){
                this.createObjCall(element).forEach(obj => {
                  tempTopArray.push(obj);
                })
              }
            } else if (this.state.catTopWomenSelection === "Shirts") {
              if(element.name.toUpperCase().includes('Shirts'.toUpperCase())){
                this.createObjCall(element).forEach(obj => {
                  tempTopArray.push(obj);
                })
              }
            } else if (this.state.catTopWomenSelection === "Blouses") {
              if(element.name.toUpperCase().includes('Blouses'.toUpperCase())){
                this.createObjCall(element).forEach(obj => {
                  tempTopArray.push(obj);
                })
              }
            } else if (this.state.catTopWomenSelection === "Sweater") {
              if(element.name.toUpperCase().includes('Sweater'.toUpperCase())){
                this.createObjCall(element).forEach(obj => {
                  tempTopArray.push(obj);
                })
              }
            } else if (this.state.catTopWomenSelection === "Tees") {
              if(element.name.toUpperCase().includes('Tees'.toUpperCase())){
                this.createObjCall(element).forEach(obj => {
                  tempTopArray.push(obj);
                })
              }
            } 
          } 

          if (this.state.catBottomWomenSelection) {
            if (this.state.catBottomWomenSelection === "Pants") {
              if(element.name.toUpperCase().includes('Pants'.toUpperCase())){
                this.createObjCall(element).forEach(obj => {
                  tempBottomArray.push(obj);
                })
              }
            } else if (this.state.catBottomWomenSelection === "Jean") {
              if(element.name.toUpperCase().includes('Jean'.toUpperCase())){
                this.createObjCall(element).forEach(obj => {
                  tempBottomArray.push(obj);
                })
              }
            } else if (this.state.catBottomWomenSelection === "Skirt") {
              if(element.name.toUpperCase().includes('Skirt'.toUpperCase())){
                this.createObjCall(element).forEach(obj => {
                  tempBottomArray.push(obj);
                })
              }
            } 
          }
          }
        } else{
          if (this.state.catTopMenSelection) {
            if (this.state.catTopMenSelection === "Shirts") {
              if(element.name.toUpperCase().includes('Shirts'.toUpperCase())){
                this.createObjCall(element).forEach(obj => {
                  tempTopArray.push(obj);
                })
              }
            }
           }

          if (this.state.catBottomMenSelection) {
            if (this.state.catBottomMenSelection === "Pants") {
              if(element.name.toUpperCase().includes('Pants'.toUpperCase())){
                  this.createObjCall(element).forEach(obj => {
                  tempBottomArray.push(obj);
              })
            }
            } else if (this.state.catBottomMenSelection === "Jean") {
              if(element.name.toUpperCase().includes('Jean'.toUpperCase())){
                  this.createObjCall(element).forEach(obj => {
                  tempBottomArray.push(obj);
              })
            }
            }
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
   
         this.setState({
            myOutfits:resp.data.allOutfits
         },()=>{
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
  this.checkValidation();
    console.log(this.state.msg , this.state.msgPswd, this.state.msgPswd2)
    if(validator.isEmail(this.state.emailInput) && validator.isLength(this.state.passwordInput,{min:6}) && validator.equals(this.state.passwordInput,this.state.passwordInput2)){
      this.setState({
        msg:"",
        msgPswd:"",
        msgPswd2:""
      })
      let randomUserNumber = Math.floor((Math.random() * 20) + 10);  
      let usernamePart1 = this.state.emailInput.slice(0,4)
          axios.post(`${serverURL}/api/signup`, {
            email: this.state.emailInput,
            password: this.state.passwordInput,
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
            if(err.response.data.err.name === "UserExistsError"){
              this.setState({
             
                theError:err.response.data.err.message,
               
             }) 
            }
        }
      )
    }

  }
  login = () => {
    this.checkValidation();
    if(validator.isEmail(this.state.emailInput) && validator.isLength(this.state.passwordInput,{min:6})){
      this.setState({
        msg:"",
        msgPswd:"",
        msgPswd2:""
      })
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
                 this.setState({
                    currentlyLoggedInUser: response.data.user,
                    ready: true,
                    redirect:true,
                    theError:null,
                    profilePic: response.data.user.profilePic,
                    currentEmail: response.data.user.email,
                    currentPass: response.data.user.password
                  },()=>{
                    if(this.state.redirect){
                      this.props.history.push('/')
                      this.getOutfits();
                    } else{
                      this.props.history.push('/login')
                    }
                  })
                }
              this.setState({
                  emailInput: "",
                  passwordInput: "",
               })
          })
            .catch((err)=>{
                console.log(err);
                if(err.response.data === "Unauthorized"){
                  this.setState({
                    currentlyLoggedInUser: null,
                    theError:'Incorrect password',
                    ready: false,
                 }) 
                } 
               
          })
    }
    
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
    axios.get(`${serverURL}/api/logout`,{withCredentials:true})
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
handleFileUpload = (e) => {
  console.log("The file to be uploaded is: ", e.target.files[0]);
  const uploadData = new FormData();
  uploadData.append("profilePic", e.target.files[0]);
  axios.put(`${serverURL}/api/profile-pic/`+this.state.currentlyLoggedInUser._id, uploadData,
  {withCredentials: true})
  .then(response => {
      this.setState({ profilePic: response.data.user.profilePic });
    })
    .catch(err => {
      console.log("Error while uploading the file: ", err);
    });
}
//--------------------->Like Outfit<------------------------------------
likeOutfit = (outfit) =>{
  let tempOutfit = {...outfit}
  tempOutfit.likedBy.push(this.state.currentlyLoggedInUser)
  axios.post(`${serverURL}/api/like-outfit`, outfit, {
      withCredentials: true
  })
  .then((res)=>{
    this.getSharedOutfits();
      console.log("outfit liked")
  })
  .catch((err)=>{
      console.log(err);
  }
)
}
//--------------------->Unlike Outfit<------------------------------------
unlikeOutfit = (outfit) =>{
  axios.post(`${serverURL}/api/unlike-outfit`, outfit, {
      withCredentials: true
  })
  .then((res)=>{
    this.getSharedOutfits();
      console.log("outfit unliked")
  })
  .catch((err)=>{
      console.log(err);
  }
)
}


  render() {
    return (
      <div className="page-wrapper">
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
                                                                            setCatTopWomenSelection = {this.setCatTopWomenSelection}
                                                                            setCatBottomWomenSelection = {this.setCatBottomWomenSelection}
                                                                            setCatTopMenSelection = {this.setCatTopMenSelection}
                                                                            setCatBottomMenSelection = {this.setCatBottomMenSelection}
                                                                            catSelection = {this.state.catSelection}
                                                                            catTopWomenSelection = {this.state.catTopWomenSelection}
                                                                            catBottomWomenSelection = {this.state.catBottomWomenSelection}
                                                                            catTopMenSelection = {this.state.catTopMenSelection}
                                                                            catBottomMenSelection = {this.state.catBottomMenSelection}
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
                                                                                  msg = {this.state.msg}
                                                                                  msgPswd = {this.state.msgPswd}
                                                                                  msgPswd2 = {this.state.msgPswd2}
                                                                                  /> } />
            <Route exact path="/login" render = { (props) => <Login {...props}    login = {this.login}
                                                                                  updateInput = {this.updateInput}
                                                                                  emailInput = {this.state.emailInput}
                                                                                  passwordInput = {this.state.passwordInput}
                                                                                  redirect = {this.state.redirect} 
                                                                                  theError = {this.state.theError}
                                                                                  currentlyLoggedInUser ={this.state.currentlyLoggedInUser}
                                                                                  msg = {this.state.msg}
                                                                                  msgPswd = {this.state.msgPswd}

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
                                                                                    likeOutfit={this.likeOutfit}
                                                                                    unlikeOutfit={this.unlikeOutfit}

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

