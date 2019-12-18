const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');
const UserSchema = new Schema({

email:{
  type: String,
  required: true, unique:true
},
username:{
  type: String
},
  profilePic: {type: String, default: './profile_icon.png'}
})

UserSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', UserSchema);
// const User = mongoose.model('User', UserSchema);
// module.exports = User;