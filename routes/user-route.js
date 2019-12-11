const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User')
const passport = require('passport')


router.post('/signup', (req,res, next) =>{
  const salt  = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const email = req.body.email;
 
  User.create({email: email, password: hash})
  .then((result)=>{
    res.json({message: 'success', user: result})
  })
  .catch((err)=>{
      next(err)
  })
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  res.status(200).json(user);
});


router.post('/logout', (req, res, next)=>{
  req.session.destroy()
  res.json({message: 'You are logged out'})
})

module.exports = router;