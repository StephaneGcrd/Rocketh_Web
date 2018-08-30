import React, { Component } from 'react';
import getWeb3 from '../../utils/getWeb3.js';
import {Grid,Col,Row} from 'react-bootstrap';
import RockenContract from '../../../../../build/contracts/Rocken.json'
import axios from 'axios';
import config from './../config.json';
import '../App.css';
var querystring = require('querystring');
import {Link, Route, Switch } from 'react-router-dom';


class My_account extends Component{

  constructor(props){
    super(props);
    this.state ={
      address: "0x00test000",
      nom: "",
      nb_rock: 0,
      username: "Test_user",
      web3: null,
      meta_on: false,
      items_prop: [],
      items_loc: [],
      events_orga: [],
      events_part: [],
      state_login: false,
      validation_owner: false,
      validation_loueur: false,
      rocken_add: 1000
    };
    this.get_items = this.get_items.bind(this);
    this.getEventsOrga = this.getEventsOrga.bind(this);
    this.get_items_loc = this.get_items_loc.bind(this);
    this.Add_rockens = this.Add_rockens.bind(this);
  }


  Add_rockens(){
    console.log("hhhh")
    const contract = require('truffle-contract')
    const Rocken = contract(RockenContract)
    Rocken.setProvider(this.state.web3.currentProvider)
//
    // Declaring this for later so we can chain functions on Rocken.
    var RockenInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
        Rocken.deployed().then((instance) => {
          RockenInstance = instance
        }).then((result) => {
          return RockenInstance.AddRockens(this.state.rocken_add,{from: accounts[0]})
        });
      });
  }

  componentWillMount(){
    var that = this;
    getWeb3
    .then(results => {
      results.web3.eth.getAccounts( (error,acc) => {
        this.setState({
          address: acc[0],
          meta_on : true,
          web3: results.web3
        })
        this.get_items();
        this.getEventsOrga();
        this.get_items_loc();
        this.instantiateContract()
        axios.post(config.Add_connect+'/search_user/',
          querystring.stringify({
              address: this.state.address,
            }), {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(function(response) {
              {response.data.map(item =>
                  that.setState({ mail: item.mail,
                  nom: item.user,
                  state_login: true

                })
              )}
        });

      });

    })
    .catch(() => {
      console.log('Error finding web3.')
    })



  }

  get_items(){
    axios.post(config.Add_connect+'/get_user_objects',
      querystring.stringify({
          address: this.state.address,
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then( (response) => {
          this.setState({items_prop : response.data
          });
        })
  }

  getEventsOrga(){
    axios.post(config.Add_connect+'/get_events_orga',
      querystring.stringify({
          add: this.state.address,
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then( (response) => {
          this.setState({events_orga : response.data
          });
        })
  }

  get_items_loc(){
    axios.post(config.Add_connect+'/get_user_loc',
      querystring.stringify({
          address: this.state.address,
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then( (response) => {
          console.log(response);
          this.setState({items_loc : response.data
          });
        })
  }

  instantiateContract() {
    // Get accounts.
    const contract = require('truffle-contract');
    const Rocken = contract(RockenContract);
    Rocken.setProvider(this.state.web3.currentProvider);
    var RockenInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Rocken.deployed().then((instance) => {
          RockenInstance = instance
        }).then((result) => {
          // Get the value from the contract to prove it worked.
          return RockenInstance.getBalance.call(accounts[0],{from: accounts[0]})
        }).then((result) => {
          // Update state with the result.
          return this.setState({ nb_rock: result.c[0] })
        })
      })
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


  logOnRender() {

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




  render(){
    if( this.state.state_login == true){
      return(
        <div className={"container_white"}>
        <h3>Bonjour {this.state.nom},</h3>
        <h3>Votre adresse : </h3>{this.state.address}
        <h3>Votre Mail : {this.state.mail}</h3>
        <h3>Vous avez {this.state.nb_rock} Rockens</h3>
        <div className="bt_loc" onClick={this.Add_rockens}> Ajouter {this.state.rocken_add} Rockens</div>

        <h3>Vos Objets</h3>
        <br/>
          <Grid>
          {this.state.items_prop.map(item =>
            <div>
              <Row><Link to={`/objet/${item._id}`} >
                <Col xs={3}>
                  <span className="h4">{item.titre}</span>
                </Col>
                <Col xs={3} md={3} lg={3} xl={3}>
                  <div>

                  <span className="h4">{item.prix} RCK</span>
                  </div>
                </Col>
                {this.statusVerif(item.location_state)}
                </Link>
              </Row>
              <hr/>
            </div>


        )}
        </Grid>

        <h3>Vos Locations</h3>
        <br/>
          <Grid>
          {this.state.items_loc.map(item =>
            <div>
              <Row><Link to={`/objet/${item._id}`} >
                <Col xs={3}>
                  <span className="h4">{item.titre}</span>
                </Col>
                <Col xs={3} md={3} lg={3} xl={3}>
                  <div>

                  <span className="h4">{item.prix} RCK</span>
                  </div>
                </Col>
                {this.statusVerif(item.location_state)}
                </Link>
              </Row>
              <hr/>
            </div>


        )}
        </Grid>


        <h3>Vos Évènements</h3>
        <Grid>
          {this.state.events_orga.map(item =>
            <div>
              <Row><Link to={`/events/${item._id}`} >
                <Col xs={3}><h4>{item.titre}</h4></Col>
                <Col xs={3} md={5} lg={6} xl={7}><h4>{item.description}</h4></Col>
                <Col xs={2}><h4>{item.date}</h4></Col>
                </Link>
              </Row>

            </div>
        )}
        </Grid>
        </div>
      );
    }
    else{
      return(
        <div className={"container_white"}>
        <h1>Vous n'êtes pas connecté !</h1>
        <h3>Vérifiez que vous êtes bien connecté à Metamask et que vous avez
        créé un compte !</h3>
      <hr/>
      <h4>(dev)</h4>
        <h4>Vérifier que le serveur node est bien lancé (npm run s-dev)</h4>
        <h4>Impossible de se connecter à Mongo depuis la wifi EPF</h4>



        </div>

      );
    }
  }

}

export default My_account
