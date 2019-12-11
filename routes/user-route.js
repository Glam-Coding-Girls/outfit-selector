const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User')
const passport = require('passport')
const { check, validationResult } = require('express-validator');


router.post('/signup',[
  check('password').isLength({min:6})
  .withMessage('Password must be at least 6 characters long'),
  check('email').isEmail()
  .withMessage('Email is not valid.'),
], (req,res, next) =>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
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