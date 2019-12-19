const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clotheSchema = new Schema({
  type:String,
  category:String,
  name:String,
  store:{type:Schema.Types.ObjectId, ref: 'Store'},
  data:{},

  //data:{ image: [ {}, {}, { imgUrl: '', zoom:'backgroundSize:200%'} ]},

})
const Clothe = mongoose.model("Clothe",clotheSchema);
module.exports = Clothe;