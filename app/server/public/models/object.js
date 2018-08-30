var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectSchema = new Schema(
 {
   titre: String,
   description: String,
   categorie: String,
   prix: Number,
   date_pub : Date,
   proprietaire: String,
   locataire: String,
   location_state: 0
 }

);



module.exports = mongoose.model('Object', ObjectSchema);
