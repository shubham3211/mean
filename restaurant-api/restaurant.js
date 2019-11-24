let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let restaurantSchema = new Schema({
  restaurantName: String,
  cusine: []
})

let Restautant = mongoose.model('restaurant', restaurantSchema);
module.exports = Restautant;