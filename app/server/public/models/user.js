var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    user: String,
    password: String,
    mail: String,
    address: String,
    locations: [],
    events: []
  }
);

module.exports = mongoose.model('User', UserSchema);
