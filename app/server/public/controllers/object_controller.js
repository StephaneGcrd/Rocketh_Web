
var objects = require('../models/object');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;



exports.deleteOne = function(id){
  objects.find({"_id": ObjectId(id)}).remove(function() { console.log('purge callback') });
}

// Display list of all books.
exports.get_prop = function(req, res, next) {

  objects.findOne({titre: "Enceinte trop bien" }, 'proprietaire', function (err, obj) {
    if (err) return handleError(err);
    res.send(obj.proprietaire);
  });

};

exports.get_objects = function(req, res, next) {

  objects.find( function (err, obj) {
    if (err) return handleError(err);
    res.send(obj);
  });

};

exports.find_ob = function(id, req, res, next) {

  objects.find({"_id": ObjectId(id)}, function(err,obj) {
    if (err) return res.send(handleError(err));
    res.send(obj);
  });

};

exports.find_by_address = function(address, req, res, next) {

  objects.find({"proprietaire" : address}, function(err,obj) {
    if (err) return res.send(handleError(err));
    console.log(address);
    res.send(obj);
  });

};

exports.find_by_address_loc = function(address, req, res, next) {

  objects.find({"locataire" : address}, function(err,obj) {
    if (err) return res.send(handleError(err));
    console.log(address);
    res.send(obj);
  });
};




exports.set_prop = function(address,id, req, res, next) {

  objects.findOneAndUpdate({"_id": ObjectId(id)},
   { $set : { "proprietaire" : address } },
   {returnOriginal: false }
 ).then(response => {
   res.send("succes");
 });

};

exports.updateLocState = function(id, loc_state, req, res, next) {

  objects.findOneAndUpdate({"_id": ObjectId(id)},
   { $set : { "location_state" : loc_state } },
   {returnOriginal: false }
 ).then(response => {
 });

};


exports.insertObjects = function(_titre, _category, _description,
   _price, _address){
  objects.create( {
    titre: _titre,
    description: _description,
    categorie: _category,
    prix: _price,
    date_pub : Date.now(),
    proprietaire: _address,
    locataire: "",
    location_state: 0
   });
};


exports.update_locataire = function(address, id, loc_state, req, res, next) {

  objects.update({"_id": ObjectId(id)},
   { $set : {"locataire" : address,
   "location_state": loc_state} },
   {returnOriginal: false }
 ).then(response => {
   res.send("succes");
 });

};
