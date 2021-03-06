const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User')
const uploader = require('../configs/cloudinary-setup');
const passport = require('../config/passport');

// //SIGUNP ROUTER
router.post('/signup', (req,res, next) =>{
    User.register(req.body, req.body.password)
    .then((user) => { 
        console.log('user',user)
        req.login(user, function(err,result){
          res.status(201).json({message: 'success', user: user})
        })
    })

    .catch((err) => { 
      console.log(err)
      res.status(500).json({ err })
    });
});
// function isAuth(req, res, next) {
//   console.log('hellooooooo')
//   console.log(req.isAuthenticated())
//   req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
// }
//SIGNUP ROUTER ENDS


//LOGIN ROUTER STARTS
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  console.log('i m here')
  const { user } = req;
  res.status(200).json({message: 'success',user});
  //res.status(200).json({message: 'success', user: req.user});
});

// router.post('/login', passport.authenticate('local'), (req, res, next) => {
//   const { user } = req;
//   res.status(200).json(user);
// });

router.get('/logout', (req, res, next) => {
   req.session.destroy(function (err) {
    console.log("++++++", req.user)
    req.logout()
    res.status(200).json({message: 'success'});
   });
});

router.get('/get-user-info', (req, res, next) => {    
  console.log(req.user);
  res.json(req.user)
})

  
 //-------< Update User details route >-----------------------------   

router.put('/profile/:id', async (req, res, next)=>{
  let {email, password} = req.body;
  const theUser = await User.findById(req.params.id,{new:true})
  theUser.email = email;
  if(password !== theUser.password){
    console.log("hi, we're here");
    await theUser.setPassword(password);
  }
  await theUser.save();
      res.json({message:'Update complete',user:theUser});
  })

//-------------Upload Profile Pic Route----------------------------    

router.put('/profile-pic/:id', uploader.single("profilePic"), async (req, res, next) => {
      console.log('file is: ', req.file)  
      if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
      }
      const theUser = await User.findById(req.params.id,{new:true})
      theUser.profilePic = req.file.secure_url;
      await theUser.save();
      res.json({message:'Update complete',user:theUser});
  })
 
module.exports = router;