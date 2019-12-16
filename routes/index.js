const express = require('express');
const router  = express.Router();
const axios = require('axios');
const Clothe = require('../models/Clothe');
const Store = require('../models/Store');
const Match = require('../models/Match');


router.get('/get-clothes',(req,res,next)=>{
 Clothe.find()
           .then((allClothes)=>{
             res.json({allClothes: allClothes});
           })
           .catch((err)=>next(err))
})
// function isLoggedIn(req, res, next){
//   if(req.session){
//     return next()
//   }
//   res.redirect('/login')
// }
router.post('/add-outfit',(req,res,next)=>{
  console.log('hitting add-outfit')
  console.log(req.session)
      const creator = req.session.currentUser._id; 
      console.log(creator)
      const selectedClothes = req.body.selectedClothes;  
      const likedBy = req.body.likedBy;
      const share = req.body.share;
      Match.create({creator: creator, selectedClothes: selectedClothes, likedBy: likedBy, share: share})
      .then((result)=>{
        res.json({message: 'success', outfit: result})
      })
      .catch(err => console.log(err));
 })
module.exports = router;



