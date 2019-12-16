const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({

email:{
  type: String,
  required: true, unique:true
},
password:{
  type: String,
  required: true
},
username:{
  type: String
},
  profilePic: {type: String, default: './profile_icon.png'},
  outfit: [{type:Schema.Types.ObjectId, ref: 'Outfit'}]
})


const User = mongoose.model('User', UserSchema);
module.exports = User;