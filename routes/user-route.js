const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User')
const uploader = require('../configs/cloudinary-setup');


//SIGUNP ROUTER
router.post('/signup', (req,res, next) =>{
//If passwords don't match
if(req.body.password !=req.body.password2){
  res.json({error: "Passwords don't match"})
    return;
}
//If both password & email validation fail
  if(req.body.password.length < 6 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)){
    res.json({error: 'Enter a valid email, and a valid password - passwords must be at least 6 characters long.'})
    return;
  }
//if only password validation fails 
  else if(req.body.password.length < 6){
    res.json({error: 'Passwords must be at least 6 characters long.'})
    return;
  }
//if only email validation fails
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)){
    res.json({error: 'Enter a valid email.'})
    return;
  }
  //check if user exists in the db
  else {
  User.findOne({email:req.body.email})
  .then(user =>{
  //show error if user already exists
    if(user){
      res.json({error: 'Email is already registered, please enter a different email.'})
      return; 
    }
  //if user passes signup validations above, we save the user in the db
    else{
      const salt  = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const email = req.body.email; 
      const username = req.body.username;  
      User.create({email: email, password: hash, username: username})
      .then((result)=>{
        res.json({message: 'success', user: result})
      })
      .catch(err => console.log(err));
    }
  })}
  })
//SIGNUP ROUTER ENDS

//LOGIN ROUTER STARTS
router.post('/login', (req, res, next)=>{
  const theEmail = req.body.email;
  const thePassword = req.body.password;

  User.findOne({ "email": theEmail })
  .then(user => {
      if (!user) {
          console.log('USER DOES NOT EXIST!')
          res.json({error: 'Email not found, please check and try again'})
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;// this is the line of code that actually logs us in
        res.json({message: 'success', user: user});
      } else {
        console.log('incorrect password')
        res.json({error: "Incorrect password"});
      }
  })
  .catch(error => {
    next(error);
  })
})
//LOGIN ROUTER ENDS

router.get('/get-user-info', (req, res, next)=>{
  if(req.session.currentUser){
    res.json(req.session.currentUser);
  } else {
    res.json(null)
  }
})


    router.get('/logout', function(req, res, next) {
      if (req.session) {
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            console.log(req.session);
            return res.json({message: 'success'})
          }
        });
      }
    });
  
 //-------< Update User details route >-----------------------------   

router.put('/profile/:id', (req, res, next)=>{

if(req.body.password.length < 6){
    res.json({error: 'Passwords must be at least 6 characters long.'})
    return;
  }
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)){
    res.json({error: 'Enter a valid email.'})
    return;
  }
else if(!req.body.password || !req.body.email){
  res.json({error: 'Field cannot be empty.'})
  return;
}

else{

User.findOne({email:req.body.email})
.then(user =>{

  if(user){
    res.json({error: 'Email is already registered, please enter a different email.'})
    return; 
  }

  else{ 
    const salt  = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const email = req.body.email; 

    User.findByIdAndUpdate(req.params.id, {
      email: email,
      password: hash
    }, {new: true})
    .then((response) => {
      console.log(response)
      res.json({message:'Update complete'});
    })
    .catch((err)=>{
      res.json(err)
    })
  }})
    }})

//-------------Upload Profile Pic Route----------------------------    

router.put('/profile-pic/:id', uploader.single("profilePic"), (req, res, next) => {
      console.log('file is: ', req.file)  
      if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
      }
      User.findByIdAndUpdate(req.params.id,{
        profilePic:req.file.secure_url},
        {new: true})
      .then(newPic => {
      // get secure_url from the file object and save it in the 
      // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
      res.json({ secure_url: req.file.secure_url });

      })
      .catch( err => next(err))
 
  })

module.exports = router;