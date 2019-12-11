const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clotheSchema = new Schema({
  type:String,
  name:String,
  store:{type:Schema.Types.ObjectId, ref: 'Store'},
  data:{},
})
const Clothe = mongoose.model("Clothe",clotheSchema);
module.exports = Clothe;