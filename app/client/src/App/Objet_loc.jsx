import React, { Component } from 'react';
import Select from 'react-select';
import './Objet_loc.css';
import getWeb3 from './../utils/getWeb3.js';
import axios from 'axios';
var querystring = require('querystring');
import Image_obj_test from './../../public/obj_test.jpeg'
import objet_json from './../utils/objet_test.json'
import {Grid,Col,Row} from 'react-bootstrap';
import './App.css';
import logo from './../../public/rocket.png';
import RockenContract from './../../../../build/contracts/Rocken.json'
import config from './config.json';
import { Redirect } from 'react-router';



class Objet_loc extends Component{
  constructor() {
    super();
    this.state = {
      titre: "a",
      item_id: "",
      description: "-",
      categorie: "-",
      prix: 0,
      date_pub : "-",
      proprietaire: "",
      locataire: "",
      nom_proprietaire: "-",
      mail_proprietaire: "-",
      image: Image_obj_test,
      address_viewer: "",
      meta_on: false,
      location_state: 0,
      web3: null,
      validation_owner: false,
      validation_loueur:false
    };
    this.update_proprio = this.update_proprio.bind(this);
    this.getInfos = this.getInfos.bind(this);
    this.getUser = this.getUser.bind(this);
    this.render_bt = this.render_bt.bind(this);
    this.LocationInit = this.LocationInit.bind(this);
    this.LocationValidate = this.LocationValidate.bind(this);
    this.ViewValidations = this.ViewValidations.bind(this);
    this.setValidation = this.setValidation.bind(this);
    this.transfert_argent = this.transfert_argent.bind(this);
    this.Delete = this.Delete.bind(this);
    this.renderSupprimer = this.renderSupprimer.bind(this);
    this.updateLocState = this.updateLocState.bind(this);
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
      if( this.state.proprietaire && this.state.locataire){
        this.ViewValidations(this.props.match.params.id, this.state.proprietaire, this.state.locataire);
      }



    })
    .catch(() => {
      console.log('Error finding web3.')
    })

  }
  componentDidMount(){
    this.getInfos();

  }

  Delete(){
    console.log(this.props.match.params.id)

    axios.post(config.Add_connect+'/delete_obj/',
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

  statusVerif(state_loc){
    console.log(state_loc)
    //this.ViewValidations(id, add_prop,add_loc);
      if(state_loc == 0 ){
        return(
          <Col xs={4}>
          <span className="h4">Statut - </span>
          <span className="ball_green"></span>
          <span className="h4"> Disponible</span>
          </Col>
        );
      }
      else if (state_loc == 1 ){
        return(
          <Col xs={4}>
          <span className="h4">Statut - </span>
          <span className="ball_red"></span>
          <span className="h4"> Demande de location faite !</span>
          </Col>
        );
      }
      else if (state_loc == 2 ){
        return(
          <Col xs={4}>
          <span className="h4">Statut - </span>
          <span className="ball_orange"></span>
          <span className="h4"> Location en cours !</span>
          </Col>
        );
      }
      else if (state_loc == 3 ){
        return(
          <Col xs={4}>
          <span className="h4">Statut - </span>
          <span className="ball_yellow"></span>
          <span className="h4"> Transfert d'argent possible !</span>
          </Col>
        );
      }
    }

  LocationInit(){
    var that = this;

    const contract = require('truffle-contract');
    const Rocken = contract(RockenContract);
    Rocken.setProvider(this.state.web3.currentProvider);
    var RockenInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Rocken.deployed().then((instance) => {
          //Instanciation du contrat
          RockenInstance = instance
        }).then((result) => {
          // On récupère ensuite la valeur du contrat
          // et on appelle la fonction BuyFirst avec ses paramètres.
          return RockenInstance.BuyFirst(this.state.prix,this.props.match.params.id,this.state.proprietaire,{from: accounts[0]})
        }).then((result) => {
          //On résout la promesse pour obtenir la réponse de la fonction
          that.setState({
            location_state: 1,
          })
          axios.post(config.Add_connect+'/update_add_loc/',
            querystring.stringify({
                address: that.state.address_viewer,
                id: that.props.match.params.id,
                location_state: 1,
              }), {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }).then(function(response) {

          });
          that.getInfos();
        })
      })
  }

  LocationValidate(){
    if ( this.state.address_viewer == this.state.proprietaire){
      if (this.state.validation_owner == false){
        this.setValidation(this.props.match.params.id, true);
      }
      else{
        console.log("deja validé")

      }

    }
    else if (this.state.address_viewer == this.state.locataire) {
      if (this.state.validation_loueur ==false){
        this.setValidation(this.props.match.params.id, false);
      }
      else{
        console.log("deja validé")
      }

    }
    //update location on mongo
    this.getInfos();
  }

  ViewValidations(Id_item, Ad_prop, Ad_loc){
    var that =this;

    const contract = require('truffle-contract');
    const Rocken = contract(RockenContract);
    Rocken.setProvider(this.state.web3.currentProvider);
    var RockenInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Rocken.deployed().then((instance) => {
          RockenInstance = instance
        }).then((result) => {
          // Get the value from the contract to prove it worked.
          return RockenInstance.seeValidation.call(Id_item, Ad_prop,{from: accounts[0]})
        }).then((result) => {
          // Update state with the result.
          console.log(this.state.titre)
          return this.setState({ validation_owner: result })
        })
      })


      this.state.web3.eth.getAccounts((error, accounts) => {
          Rocken.deployed().then((instance) => {
            RockenInstance = instance
          }).then((result) => {
            // Get the value from the contract to prove it worked.
            return RockenInstance.seeValidation.call(Id_item, Ad_loc,{from: accounts[0]})
          }).then((result) => {
            // Update state with the result.
            return this.setState({ validation_loueur: result })
          })
        })
  }

  setValidation(Id_item, owner){
    const contract = require('truffle-contract');
    const Rocken = contract(RockenContract);
    Rocken.setProvider(this.state.web3.currentProvider);
    var RockenInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Rocken.deployed().then((instance) => {
          RockenInstance = instance
        }).then((result) => {
          // Get the value from the contract to prove it worked.
          return RockenInstance.setValidation(Id_item,{from: accounts[0]})
        }).then((result) => {
          if (owner){
            this.setState({validation_owner: true,
            location_state: 3})
            this.updateLocState(3);
          }
          else{
            this.setState({validation_loueur: true,
            location_state: 2})
            this.updateLocState(2);
          }
        })
      })


  }

  updateLocState(loc_State){
    console.log("location state")
    console.log(loc_State)
    axios.post(config.Add_connect+'/update_loc_state/',
      querystring.stringify({
          id: this.props.match.params.id,
          loc_state: loc_State,
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
          console.log(response)

    });
  }

  transfert_argent(){
    let that = this;
    if ( this.state.validation_owner && this.state.validation_loueur){
      alert("Double validation ,transfert d'argent");
      const contract = require('truffle-contract');
      const Rocken = contract(RockenContract);
      Rocken.setProvider(this.state.web3.currentProvider);
      var RockenInstance;
      this.state.web3.eth.getAccounts((error, accounts) => {
          Rocken.deployed().then((instance) => {
            RockenInstance = instance
          }).then((result) => {
            // Get the value from the contract to prove it worked.
            console.log(this.props.match.params.id);
            return RockenInstance.TxSeller(this.props.match.params.id, {from: accounts[0]})
          }).then((result) => {
            // Update state with the result.
            axios.post(config.Add_connect+'/update_add_loc/',
              querystring.stringify({
                address: "",
                id: that.props.match.params.id,
                location_state: 0,
                }), {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }).then(function(response) {
                  console.log(response);

            });
            that.getInfos();
          })
        })
    }
    else{
      alert("manque double validation")
    }
  }

  getInfos() {
    var that = this;
    axios.post(config.Add_connect+'/get_object_id/',
    querystring.stringify({
        id: this.props.match.params.id,
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(response => {
      var add;
      this.getUser(response.data[0].proprietaire)

      {response.data.map(item =>

          that.setState({ titre: item.titre,
          description: item.description,
          prix: item.prix,
          date_pub: item.date_pub,
          proprietaire: item.proprietaire,
          locataire: item.locataire,
          categorie: item.categorie,
          location_state: item.location_state
        })

      )}


    });

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

  update_proprio(){
      axios.post(config.Add_connect+'/update_add/',
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


  render_bt(){
      if(this.state.locataire){
        console.log(this.state.location_state);

        if(this.state.address_viewer  == this.state.locataire){


          if(this.state.location_state == 1){
                return(
                  <div>
                  <hr/>
                  <div onClick={this.LocationValidate} className="bt_loc"> Valider </div>
                  <h4> Validation du locataire : {this.state.validation_loueur.toString()}</h4>
                  <hr/>
                  </div>
                );
          }
          else if(this.state.location_state == 2){
                return(
                  <div>
                  <hr/>
                  <h4> Location en cours</h4>
                  <hr/>
                  </div>

                );
          }
          else if (this.state.location_state == 3){
            return(
              <div>
                <h4>Attente validation du propriétaire pour transfert</h4>
              </div>
            );
          }
        }
        else if (this.state.address_viewer  == this.state.proprietaire) {
          if(this.state.location_state == 1){
                return(
                  <div>
                  <hr/>
                  <h4> Veuillez attendre validation du locataire </h4>
                  <h4> Validation du locataire : {this.state.validation_loueur.toString()}</h4>
                  <hr/>
                  </div>
                );
          }
          else if(this.state.location_state == 2){
            return(
              <div>
              <hr/>
              <div onClick={this.LocationValidate} className="bt_loc"> Valider </div>
              <hr/>
              </div>

            );

          }
          else if(this.state.location_state == 3){
                return(
                  <div>
                  <hr/>
                  <div onClick={this.transfert_argent} className="bt_loc"> Transfert </div>
                  <hr/>
                  </div>

                );
          }

        }
        else{
          return(<div><h3>Cet objet est déjà loué par quelqu'un d'autre.. ({this.state.locataire})</h3></div>);
        }

      }
      else{
        if( this.state.address_viewer == this.state.proprietaire ){

        }
        else{
          return(<div onClick={this.LocationInit} className="bt_loc centered_div"> Louer </div>);
        }

      }

    }



    render() {

      if(this.state.titre){
      return (

        <div className="container_white">
          <Grid>
        <Row>
        <Col xs={6} md={6} lg={6} xl={6}>
        <h2 className="titre_ob">{this.state.titre}</h2>
        <h4>Catégorie: {this.state.categorie}</h4>
        <h4>Par {this.state.nom_proprietaire}</h4>
        <h4>Contact: {this.state.mail_proprietaire}</h4>
        <h4>Publication: {this.state.date_pub}</h4>

        </Col>
        <Col xs={6} md={6} lg={6} xl={6}>
          {this.renderSupprimer(this.state.address_viewer,this.state.proprietaire)}


        </Col>
        </Row>
        <Row>
        <Col xs={3}></Col>
        <Col xs={6}>
        <div>
          {this.render_bt()}
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
        <span onClick = {this.update_proprio} className="bt_loc">Devenir propriétaire (dev)</span>

        </Grid>
      </div>
    );

      }
      else{
        return(
          <div className="container_white">
            <h1>Désolé, nous n'avons pas pu récupérer les informations de cet
            objet 😕</h1>
          </div>
        );
      }






    }


}

export default Objet_loc;
