const express = require('express');
const router  = express.Router();
const axios = require('axios');
const Clothe = require('../models/Clothe');
const Store = require('../models/Store');
const Match = require('../models/Match');
const passport = require('../config/passport');

router.get('/get-clothes',(req,res,next)=>{
 Clothe.find()
           .then((allClothes)=>{
             res.json({allClothes: allClothes});
           })
           .catch((err)=>next(err))
})

router.post('/add-outfit',(req,res,next)=>{
  console.log('hitting add-outfit')
  console.log(req.session)
      const creator = req.session.passport.user._id; 
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
 router.get('/get-outfits',(req,res,next)=>{
  Match.find({creator:req.session.currentUser})
            .then((allOutfits)=>{
              res.json({allOutfits: allOutfits});
            })
            .catch((err)=>next(err))
 })
 
 router.post('/delete-outfit/:theID',(req,res,next)=>{
   let id = req.params.theID;
   Match.findByIdAndRemove(id)
            .then((resp)=>{
              res.json({message:'success'});
            })
            .catch((err)=>next(err))
 })
 router.post('/update-outfit/:theID',(req,res,next)=>{
  let id = req.params.theID;
  console.log(req.body)
  Match.findByIdAndUpdate(id,req.body,{new:true})
           .then((resp)=>{
            res.json({message:'success'});
           })
           .catch((err)=>next(err))
})
 router.get('/get-shared',(req,res,next)=>{
   Match.find({share:true})
        .then((outfits)=> res.json({outfits}))
        .catch((err)=>next(err))
 })
module.exports = router;



