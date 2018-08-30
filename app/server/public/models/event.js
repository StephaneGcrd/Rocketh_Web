var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventsSchema = new Schema(
 {
   titre: String,
   description: String,
   category: String,
   prix: Number,
   date_pub : Date,
   place: String,
   date: String,
   organisateur: String,
   participants: [],
   places_max: Number
 }

);



module.exports = mongoose.model('Events', EventsSchema);
