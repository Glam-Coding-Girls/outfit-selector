const express = require('express');
const router  = express.Router();
const axios = require('axios');
const Clothe = require('../models/Clothe');
const Store = require('../models/Store');



router.get("/skirts", (req, res, next) => {
  axios.get("https://api.zinc.io/v1/search?query=skirt&page=1&retailer=amazon",
  {withCredentials: true,
    auth: {
      username: '832C82B028EB9FCB1FD8F0EA',
      password: ''
    }}
  )
    .then(data => res.json(data.data))
    .catch(err => next(err));
})

router.get("/women-shorts", (req, res, next) => {
  axios.get("https://api.zinc.io/v1/search?query=women%shorts&page=1&retailer=amazon",
  {withCredentials: true,
    auth: {
      username: '832C82B028EB9FCB1FD8F0EA',
      password: ''
    }}
  )
    .then(data => res.json(data.data))
    .catch(err => next(err));
})
router.get('/get-clothes',(req,res,next)=>{
 Clothe.find()
           .then((allClothes)=>{
             res.json({allClothes: allClothes});
           })
           .catch((err)=>next(err))
})
module.exports = router;



