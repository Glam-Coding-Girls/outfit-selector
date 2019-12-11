const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const storeSchema = new Schema({
  siteName:{type:String},
  siteUrl:{type:String},
})
const Store = mongoose.model("Store",storeSchema);
module.exports = Store;