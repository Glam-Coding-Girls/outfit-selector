const mongoose = require('mongoose');
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
  profilePic: {type: String, default: './profile_icon.png'}
})

const User = mongoose.model('User', UserSchema);
module.exports = User;