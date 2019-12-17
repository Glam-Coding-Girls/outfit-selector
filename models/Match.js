const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const matchSchema = new Schema({
  creator:{type:Schema.Types.ObjectId, ref: 'User'},
  selectedClothes:[],
  likedBy:[{type:Schema.Types.ObjectId, ref: 'User'}],
  share:Boolean,
})
const Match = mongoose.model("Match",matchSchema);
module.exports = Match;