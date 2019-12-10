const { Schema, model } = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema({
local: {
    email        : String,
    password     : String,
},
facebook         : {
    id           : String,
    token        : String,
    name         : String,
    email        : String
},
google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
}

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = model('User', userSchema);