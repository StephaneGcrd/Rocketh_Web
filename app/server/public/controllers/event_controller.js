
var events = require('../models/event');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;


exports.deleteOne = function(id){
  events.find({"_id": ObjectId(id)}).remove(function() { console.log('purge callback') });
}

exports.insertEvent = function(_titre, _category, _description,_place,
   _price, _max,_orga){
  events.create( {
    titre: _titre,
    description: _description,
    category: _category,
    prix: _price,
    date_pub : Date.now(),
    place: _place,
    date: Date.now(),
    organisateur: _orga,
    participants: [],
    places_max: _max
   });
};

exports.getEvents = function(req, res, next) {

  events.find( function (err, obj) {
    if (err) return handleError(err);
    res.send(obj);
  });

};

exports.findEventById = function(id, req, res, next) {

  events.find({"_id": ObjectId(id)}, function(err,obj) {
    if (err) return res.send(handleError(err));
    res.send(obj);
  });

};

exports.findEventByOrga = function(address, req, res, next) {

  events.find({"organisateur" : address}, function(err,obj) {
    if (err) return res.send(handleError(err));
    console.log(address);
    res.send(obj);
  });

};

exports.AddParticipant = function(id, address, req, res, next){

  events.update({"_id": ObjectId(id)},
   { $push : { "participants" : address } },
  ).then(response => {
   res.send("succes");
 });
}

exports.FlushParticipants = function(id, req, res, next){

  events.update({"_id": ObjectId(id)},
   { $set : { "participants" : [] } },
  ).then(response => {
   res.send("succes");
 });
}

exports.set_prop = function(address,id, req, res, next) {

  events.findOneAndUpdate({"_id": ObjectId(id)},
   { $set : { "organisateur" : address } },
   {returnOriginal: false }
 ).then(response => {
   res.send("succes");
 });

};

/*exports.insertEvents = function(){

  events.create( {
    titre: "Soirée Techno",
    description: "Viens taper du pied, Line up : DJ ETHEREUM",
    prix: 2,
    date_pub : Date.now(),
    date: Date.parse("10 Jul 2018 23:00:00 GMT"),
    organisateur: "",
    participants: [],
    places_max: 300
   });

   events.create( {
     titre: "Cocktail dinatoire",
     description: "Très chic, très chouette",
     prix: 4,
     date_pub : Date.now(),
     date: Date.parse("05 Jul 2018 21:00:00 GMT"),
     organisateur: "",
     participants: [],
     places_max: 150
    });

    events.create( {
      titre: "Soirée inauguration Rock.Eth",
      description: "Viens découvrir la nouvelle plateforme",
      prix: 1,
      date_pub : Date.now(),
      date: Date.parse("11 Jun 2018 20:30:00 GMT"),
      organisateur: "",
      participants: [],
      places_max: 80
     });

     events.create( {
       titre: "Rencard avec moi <3",
       description: "Je cherche une personne pour aller chez Mac-Do avec moi",
       prix: 1,
       date_pub : Date.now(),
       date: Date.parse("2 Jun 2018 12:30:00 GMT"),
       organisateur: "",
       participants: [],
       places_max: 2
      });

};*/

/*exports.findEventByAttender = function(address, req, res, next) {

  events.find({"proprietaire" : address}, function(err,obj) {
    if (err) return res.send(handleError(err));
    console.log(address);
    res.send(obj);
  });

};*/
