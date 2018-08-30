
var user = require('../models/user');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

exports.insert_user = function(_address, _username, _password, _mail){
  user.create( {user: _username,
     password: _password ,
     mail: _mail,
     address: _address});
};

exports.search_user = function(_address, req, res, next){
  user.find({"address": _address}, function(err,obj){
    if (err) return handleError(err);
    res.send(obj);
    return;
  });
}

exports.addEventToUser = function(_id,_address,req,res,next){
  user.update({"address": _address},
              {$push : {"events" : _id }}
            ).then(response =>{
              res.send("succes")
            });
}
