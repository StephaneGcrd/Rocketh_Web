import React, { Component } from 'react';
import Select from 'react-select';
import './../Objet_loc.css';
import getWeb3 from '../../utils/getWeb3.js';
import axios from 'axios';
var querystring = require('querystring');
import Image_obj_test from '../../../public/soiree.jpeg';
import {Grid,Col,Row} from 'react-bootstrap';
import './../App.css';
import RockenContract from '../../../../../build/contracts/Rocken.json';
import config from './../config.json'


class Event extends Component{
  constructor(){
    super();
    this.state = {
      titre: "",
      description: "",
      prix: "",
      date_pub : "",
      date: "23 Juin 2018 - 23h00",
      add_orga: "",
      nom_proprietaire: "",
      image: Image_obj_test,
      address_viewer: "",
      meta_on: false,
      places_max: 0,
      places_prises: [],
    };
    this.getInfos = this.getInfos.bind(this);
    this.AddParticipant = this.AddParticipant.bind(this);
    this.ParticipationBt = this.ParticipationBt.bind(this);
    this.Paiement = this.Paiement.bind(this);
    this.update_proprio = this.update_proprio.bind(this);
    this.FlushParticipants = this.FlushParticipants.bind(this);
    this.Delete = this.Delete.bind(this);
    this.renderSupprimer = this.renderSupprimer.bind(this);
    this.InitEventBlockchain = this.InitEventBlockchain.bind(this);

  }

  Delete(){
    console.log(this.props.match.params.id)

    axios.post(config.Add_connect+'/delete_evt/',
      querystring.stringify({
          id: this.props.match.params.id,
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
          console.log(response)

    });

    location.reload();


  }

  renderSupprimer(add_view,add_prop){

    if(add_view == add_prop){
      return(
        <div className="bt_loc align-right" onClick={this.Delete}>Supprimer</div>
      );
    }
    else{
      return(
        <div className="bt_loc align-right">Signaler</div>
      );
    }
  }

  componentWillMount(){
    getWeb3
    .then(results => {

      results.web3.eth.getAccounts( (error,acc) => {
        this.setState({
          address_viewer: acc[0],
          meta_on : true
        })
      });
      this.setState({
        web3: results.web3
      });
      this.getInfos();
    });
  }

  componentDidMount(){

  }

  update_proprio(){
      axios.post(config.Add_connect+'/update_prop_event/',
        querystring.stringify({
            address: this.state.address_viewer,
            id: this.props.match.params.id,
          }), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(function(response) {

      });
      this.getInfos();

  }

  getUser(add){
    var that = this;

    axios.post(config.Add_connect+'/search_user/',
      querystring.stringify({
          address: add,
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {

          {response.data.map(item =>
              that.setState({
              mail_proprietaire: item.mail,
              nom_proprietaire: item.user,
            })
          )}
    });
  }

  getInfos(){
    var that = this;
    axios.post(config.Add_connect+'/get_event_id/',
    querystring.stringify({
        id: this.props.match.params.id,
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
      var add;
      this.getUser(response.data[0].organisateur)

      {response.data.map(item =>

          that.setState({ titre: item.titre,
          description: item.description,
          prix: item.prix,
          date_pub: item.date_pub,
          date: item.date,
          add_orga: item.organisateur,
          places_max: item.places_max,
          places_prises: item.participants})
      )}
    });



  }

  FlushParticipants(){
    axios.post(config.Add_connect+'/flush_event/',
    querystring.stringify({
        id: this.props.match.params.id,
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    this.getInfos();

  }

  InitEventBlockchain(){
    var that = this;

      const contract = require('truffle-contract');
      const Rocken = contract(RockenContract);
      Rocken.setProvider(this.state.web3.currentProvider);
      var RockenInstance;
      this.state.web3.eth.getAccounts((error, accounts) => {
          Rocken.deployed().then((instance) => {
            RockenInstance = instance
          }).then((result) => {
            return RockenInstance.CreateEvent(this.props.match.params.id, this.state.prix, this.state.places_max,{from: accounts[0]})
          }).then((result) => {

          })
        })



  }

  AddParticipant(){
    var that = this;
    var p1 = new Promise(function(resolve, reject){
      if(this.state.places_prises.length == 0){
        resolve(this.InitEventBlockchain());
      }
      else{
        reject(Error("It broke"));
      }
    }.bind(this));


    p1.then( (response) =>{
        const contract = require('truffle-contract');
        const Rocken = contract(RockenContract);
        Rocken.setProvider(this.state.web3.currentProvider);
        var RockenInstance;
        this.state.web3.eth.getAccounts((error, accounts) => {
            Rocken.deployed().then((instance) => {
              RockenInstance = instance
            }).then((result) => {
              return RockenInstance.ParticipateEvent(this.props.match.params.id,{from: accounts[0]})
            }).then((result) => {
              axios.post(config.Add_connect+'/add_participant/',
              querystring.stringify({
                  id: this.props.match.params.id,
                  address: this.state.address_viewer,
                }), {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
              })
              axios.post(config.Add_connect+'/add_event_user/',
              querystring.stringify({
                  id: this.props.match.params.id,
                  address: this.state.address_viewer,
                }), {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
              })
            })
          })



      }

    );

  }

  Paiement(orga, viewer){

    if ( orga == ""){

    }
    else if (orga == viewer){

      return(
        <div>
        <span onClick = {this.FlushParticipants} className="bt_loc">Valider évènement</span>
        <span onClick = {this} className="bt_loc">Rembourser participants</span>
        </div>
      );
    }
    else{
      return(
        <div></div>
      );
    }
    }


  ParticipationBt(array_part, add_view, places){


    console.log(array_part)

    if( array_part.includes(add_view)){
      return(
        <h3>Vous participez deja</h3>
      );
    }
    else if( places - array_part.length <= 0){
      return(
        <h3>Evenement complet !</h3>
      );
    }

    else{
      return(
        <span onClick = {this.AddParticipant} className="bt_loc">Participer</span>
      );
    }


  }

  render(){
    if(this.state.titre){
    return (

      <div className="container_white">
        <Grid>
      <Row>
      <Col xs={6} md={6} lg={6} xl={6}>
      <h2 className="titre_ob">{this.state.titre}</h2>
      <h4><b>Catégorie: </b>{this.state.categorie}</h4>
      <h4><b>Par </b>{this.state.nom_proprietaire}</h4>
      <h4><b>Place max : </b>{this.state.places_max}</h4>
      <h4><b>Places restantes : </b>{this.state.places_max - this.state.places_prises.length}</h4>
      <h4><b>Date: </b>23 Juin 2018 - 23h30</h4>
      <h4>{this.state.events_user}</h4>

      </Col>
      <Col xs={6} md={6} lg={6} xl={6}>
        {this.renderSupprimer(this.state.address_viewer,this.state.add_orga)}

      </Col>
      </Row>
      <Row>
      <Col xs={3}></Col>
      <Col xs={6}>
      <div>

        <h2 className="titre_ob centered_text">Prix : {this.state.prix} Rockens</h2>
        <img src={this.state.image}  className="image_objet"/>
        <br/>
        <h2 className="titre_ob">Description</h2>
        <h4>{this.state.description}</h4>
        <br/>
      </div>
      </Col>
      <Col xs={3}></Col>
      </Row>
      <h3>{this.state.participants}</h3>
      {this.ParticipationBt(this.state.places_prises,this.state.address_viewer, this.state.places_max)}
      {this.Paiement(this.state.add_orga,this.state.address_viewer)}



      </Grid>
    </div>
  );

    }
    else{
      return(
        <div className="container_white">
          <h1>Désolé, nous n'avons pas pu récupérer les informations de cet
          évènement 😕</h1>
        </div>
      );
    }
  }

}

export default Event;
