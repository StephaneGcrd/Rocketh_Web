//server/routes/routes.js
var express = require('express');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');
var Objects = require('../controllers/object_controller');
var User = require('../controllers/user_controller');
var Events = require('../controllers/event_controller.js');

router.get('/', (req, res)=> {
  res.send('Server is up and running.');
})


router.route('/delete_obj')
.post(function(req,res){
  Objects.deleteOne(req.body.id);
  res.send(req.body.id);

});

router.route('/delete_evt')
.post(function(req,res){
  Events.deleteOne(req.body.id);
  res.send('succes');

});

router.route('/insert_evt')
.post(function(req,res) {
  Events.insertEvent(req.body.title,
      req.body.category,
      req.body.description,
      req.body.place,
      req.body.price,
      req.body.max,
      req.body.orga
    );
  res.send('insert succes')
});

router.route('/insert_obj')
.post(function(req,res){
  Objects.insertObjects(req.body.title,
  req.body.category,
  req.body.description,
  req.body.price,
  req.body.address);

})


router.route('/insert_user')
.post(function(req,res) {
  User.insert_user(req.body.address,
      req.body.username,
      req.body.password,
      req.body.mail);
  res.send('insert succes')
});

router.route('/search_user')
.post(function(req,res) {
  var address= req.body.address;
  User.search_user(address,req,res);
})

router.route('/update_loc_state')
.post(function(req,res){
  var id = req.body.id;
  var loc_state = req.body.loc_state;
  Objects.updateLocState(id,loc_state);
  res.send("succes loc state update");

})


//inutile:
router.get('/get_address', Objects.get_prop);

//Retourne les objets
router.get('/get_objects', Objects.get_objects);

router.get('/get_events', Events.getEvents);

router.get('/insertObjects', Objects.insertObjects);

//router.get('/insertEvents', Events.insertEvents);


//retourne un objet suivant son id
router.route('/get_object_id')
.post(function(req,res) {
  var id = req.body.id;
  Objects.find_ob(id,req,res);
})

router.route('/get_event_id')
.post(function(req,res) {
  var id = req.body.id;
  Events.findEventById(id,req,res);
})

router.route('/add_participant')
.post(function(req,res) {
  var id = req.body.id;
  var address = req.body.address;
  Events.AddParticipant(id,address,req,res);
})

router.route('/add_event_user')
.post(function(req,res){
  var id = req.body.id;
  var address = req.body.address;
  User.addEventToUser(id,address,req,res);
})


router.route('/get_events_orga')
.post(function(req,res) {
  var add = req.body.add;
  Events.findEventByOrga(add,req,res);
})





//retourne des objet suivant l'adresse du proprietaire
router.route('/get_user_objects')
.post(function(req,res) {
  var address = req.body.address;
  Objects.find_by_address(address,req,res);
})


//retourne des objets suivant l'adresse du locataire
router.route('/get_user_loc')
.post(function(req,res) {
  var address = req.body.address;
  Objects.find_by_address_loc(address,req,res);
})



//update une addresse du proprietaire d'un objet, suivant son id
router.route('/update_add')
.post(function(req,res) {

  var address = req.body.address;
  var id = req.body.id;
  Objects.set_prop(address,id, req, res);
  res.send("succes update");

})

router.route('/update_prop_event')
.post(function(req,res) {

  var address = req.body.address;
  var id = req.body.id;
  Events.set_prop(address,id, req, res);
  res.send("succes update");

})

router.route('/flush_event')
.post(function(req,res) {

  var id = req.body.id;
  Events.FlushParticipants(id, req, res);
  res.send("succes update");

})



//update une addresse du locataire d'un objet, suivant son id
router.route('/update_add_loc')
.post(function(req,res) {

  var address = req.body.address;
  var id = req.body.id;
  var loc_state = req.body.location_state;
  console.log(req.body.location_state);
  Objects.update_locataire(address,id,loc_state, req, res);
  res.send("succes update_add_loc");

})


module.exports = router;
