let mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
  pname: String,
  pid: String,
  pprice: Number,
  shops: [{ name : { type: String } }]
})

let product = mongoose.model('product', ProductSchema);
module.exports = product;