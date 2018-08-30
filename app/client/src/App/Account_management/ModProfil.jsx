import React, { Component } from 'react';
import axios from 'axios';
import photo from '../../../public/mario.jpg';
import starE from '../../../public/star_empty.png';
import starF from '../../../public/star_filled.png';
import logo from '../../../public/rocket.png';
import deb from '../../../public/4.png';
import exp from '../../../public/6.png';
import ap from '../../../public/5.png';
import config from './../config.json';
import './../App.css';
import {Grid,Col,Row,Alert,Button} from 'react-bootstrap';
import {Link, Route } from 'react-router-dom';
import getWeb3 from '../../utils/getWeb3.js';

import RockenContract from '../../../../../build/contracts/Rocken.json'
var querystring = require('querystring');


class ModProfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
        step : 1,
        show: false,
        address: "0x00test000",
        nom: "Stéphane",
        mail: "stephane.guichard@determined.fr",
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

    this.changeStep = this.changeStep.bind(this);
    this.render_nav = this.render_nav.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.render_alert = this.render_alert.bind(this);
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

 changeStep(e){
    this.setState({step: e.target.value});
  }

 handleDismiss() {
    this.setState({ show: false });
  }

 handleShow() {
    this.setState({ show: true });
  }

  render_alert(e){
    if(this.state.show==true){
        return(
            <div>
            <center>
            <Alert bsStyle="info" onDismiss={this.handleDismiss} className="alert center_text">
          <h2>Revendre</h2>
          <p>
            Si tu échanges tes Rockens, tu obtiendras 10,5€ et ton solde sera de 0 Rockens.
          </p>
          <p>
            Veux-tu vendre tes Rockens ?
          </p>
          <br/>
          <p>
            <Button bsStyle="success" onClick={this.handleDismiss}>Oui</Button>

            <Button bsStyle="danger" onClick={this.handleDismiss}>Non</Button>
          </p>
            </Alert>
            </center>
        </div>
            );
    }
    else{
        return(
                    <div>
                    <nav>
                        <Col mdOffset={1} md={5}>
                        <div className="center_text">
                        <h5>Besoin de plus de Rockens ?</h5>
                        <button className="bt_rock" onClick={this.Add_rockens}>Acheter des Rockens</button>
                        </div>
                        </Col>
                    </nav>

                    <nav>
                        <Col mdOffset={1} md={4}>
                        <div className="center_text">
                        <h5>Ou revend-les !</h5>
                        <button className="bt_rock" onClick={this.handleShow}>Revendre mes Rockens</button>
                        </div>
                        </Col>
                    </nav>
                    </div>
            );
    }
  }

    render_nav(e){

        if(this.state.step==1){ //Modifier Profil

            return(
                    <div>
                                            <Col md={12}>
                                            <div className="center_text">
                                                <img src={photo} className="photo_profil"/>
                                            </div>
                                            <div className="center_text">
                                                <label for="file" className="bt_Red_form">
                                                    Changer ma photo de profil
                                                </label>
                                                    <input id="file" type="file" className="input-file" hidden/>
                                            </div>
                                            </Col>


                                            <Col mdOffset={3} md={7}>

                                                    <h3>Mes informations</h3>

                                                    <Row>
                                                    <Col md={4}>
                                                    <h5>Nom</h5>
                                                    </Col>
                                                    <h5>{this.state.nom}</h5>
                                                    </Row>



                                                    <Row>
                                                    <Col md={4}>
                                                    <h5>Adresse email</h5>
                                                    </Col>
                                                    <input type="email" placeholder={this.state.mail} className="col-md-6"/>
                                                    </Row>

                                            </Col>


                                            <Col mdOffset={3} md={7}>

                                                    <h3>Changer mon mot de passe</h3>

                                                    <Row>
                                                    <Col md={4}>
                                                    <h5>Ancien</h5>
                                                    </Col>
                                                    <input type="password" className="col-md-4"/>
                                                    </Row>

                                                    <Row>
                                                    <Col md={4}>
                                                    <h5>Nouveau</h5>
                                                    </Col>
                                                    <input type="password" className="col-md-4"/>
                                                    </Row>

                                                    <Row>
                                                    <Col md={4}>
                                                    <h5>Confirmation</h5>
                                                    </Col>
                                                    <input type="password" className="col-md-4"/>
                                                    </Row>
                                            </Col>

                                            <Col mdOffset={10} md={2}>
                                                <button className="bt_Red_form">Enregistrer</button>
                                            </Col>

                    </div>

                );}

    else if(this.state.step==2){ // Mes notes et avis
        return(
            <div>
                    <h3>Note générale</h3>
                    <h5>46 notes</h5>

                    <div className="center_text">
                    <Row>
                    <img src={starF}/>
                    <img src={starF}/>
                    <img src={starF}/>
                    <img src={starF}/>
                    <img src={starE}/>
                    </Row>
                    </div>

                    <h3>Avis</h3>
                    <h5>42 avis</h5>
                    <br/>

                    <h5>Marie Dupond - 03/03/2017</h5>
                    <div className="container_grey">
                    <h6>Super ! Location sans aucun soucis.</h6>
                    </div>

                    <h5>Robin Lacoste - 13/03/2017</h5>
                    <div className="container_grey">
                    <h6>Merci beaucoup pour la location ! :)</h6>
                    </div>

                    <h5>Mélanie Durand - 05/02/2018</h5>
                    <div className="container_grey">
                    <h6>Top malgrès un léger retard :)</h6>
                    </div>
            </div>
            );
    }

        else if(this.state.step==3){ // Mes annonces
        return(
            <div>
              <h3>Vos Objets</h3>
              <br/>
                <Grid>
                {this.state.items_prop.map(item =>
                  <div>
                    <Row><Link to={`/objet/${item._id}`} >
                      <Col xs={3}>
                        <span className="h4">{item.titre}</span>
                      </Col>
                      <Col xs={3} >
                        <div>

                        <span className="h4">{item.prix} RCK</span>
                        </div>
                      </Col>
                      <Col xs={6}>
                      {this.statusVerif(item.location_state)}
                      </Col>
                      </Link>
                    </Row>
                    <hr/>
                  </div>


              )}
              </Grid>
            </div>
            );
    }

    else if(this.state.step==4){ // Mes locations
        return(



          <Grid>
            <h3>Vos Locations</h3>
            <br/>
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
            );
    }

    else if(this.state.step==5){ //Mes événements
        return(
            <div>
              <h3>Vos Évènements</h3>
              <Grid>
                {this.state.events_orga.map(item =>
                  <div>
                    <Row><Link to={`/events/${item._id}`} >
                      <Col xs={3}><h4>{item.titre}</h4></Col>
                      </Link>
                    </Row>

                  </div>
              )}
              </Grid>
            </div>
            );
    }

    else if(this.state.step==6){ //Prochainement
        return(
            <div>
                    <h3>Prochainement</h3>
                    <br/>
                    <h5>1 événement auquel je participe</h5>
                    <br/>
                    <h5>Soirée Mario Kart</h5>
                    <div className="container_grey">
                    <h5>Le 22/04/2018 à 18h30</h5>
                    <h5 className="right_text">Payé</h5>
                    </div>
            </div>
            );
    }

    else if(this.state.step==7){ // Mes rockens
        return(
            <div>
                    <div className="center_text">
                    <h4>Solde</h4>
                    <h2>{this.state.nb_rock}</h2>
                    <h4>ROCKENS</h4>
                    </div>
                    <br/>
                    <br/>
                    {this.render_alert()}

            </div>
            );
    }

    else if(this.state.step==8){ //Trophées
        return(
            <div>
            <div className="center_text">
                <img src={deb} width="100" height="100" />
                <h4>Tu es un "Rock-eth Débutant"</h4>
            </div>
            <br/>

            <Col mdOffset={1} md={10}>

            <Row>
            <Col md={3}>
            <img src={deb} width="50" height="50" />
            </Col>
            <Col md={9}>
            <h5>Après avoir dépensé ou reçu <b>500 Rockens</b>,
            l'utilisateur en recevra <b>10 offerts</b>.
            Il recevra alors le trophée "Rock-eth Débutant".</h5>
            </Col>
            </Row>

            <Row>
            <Col md={3}>
            <img src={ap} width="50" height="50" />
            </Col>
            <Col md={9}>
            <h5>Après avoir dépensé ou reçu <b>1 000 Rockens</b>,
            l'utilisateur en recevra <b>30 offerts</b>.
            Il recevra alors le trophée "Rock-eth Apprenti".</h5>
            </Col>
            </Row>

            <Row>
            <Col md={3}>
            <img src={exp} width="50" height="50" />
            </Col>
            <Col md={9}>
            <h5>Après avoir dépensé ou reçu <b>10 000 Rockens</b>,
            l'utilisateur en recevra <b>50 offerts</b>.
            Il recevra alors le trophée "Rock-eth Expert".</h5>
            </Col>
            </Row>

            </Col>

            </div>
            );
    }





        } //FIN DU RENDER_NAV


  statusVerif(state_loc){
          console.log(state_loc)

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


         return(

                        <div className="container_white">
                            <div className="row">

                                    <nav className="col-lg-2">

                                            <Col md={12}>
                                                <h3>Mon profil</h3>

                                                    <h5 style={{color: '#1565c0'}}><button value="1" onClick={this.changeStep} className="bt_inv">Modifier mon profil</button></h5>

                                                    <h5 style={{color: '#1565c0'}}><button value="2" onClick={this.changeStep} className="bt_inv">Mes notes et avis</button></h5>

                                            </Col>

                                            <Col md={12}>
                                                <h3>Objets/Services</h3>

                                                    <h5 style={{color: '#1565c0'}}><button value="3" onClick={this.changeStep} className="bt_inv">Mes annonces</button></h5>

                                                    <h5 style={{color: '#1565c0'}}><button value="4" onClick={this.changeStep} className="bt_inv">Mes locations</button></h5>
                                            </Col>

                                            <Col md={12}>
                                                <h3>Evénements</h3>

                                                    <h5 style={{color: '#1565c0'}}><button value="5" onClick={this.changeStep} className="bt_inv">Mes événements</button></h5>

                                                    <h5 style={{color: '#1565c0'}}><button value="6" onClick={this.changeStep} className="bt_inv">Prochainement</button></h5>

                                            </Col>

                                            <Col md={12}>
                                                <h3>Rockens</h3>

                                                    <h5 style={{color: '#1565c0'}}><button value="7" onClick={this.changeStep} className="bt_inv">Mes Rockens</button></h5>

                                                    <h5 style={{color: '#1565c0'}}><button value="8" onClick={this.changeStep} className="bt_inv">Trophées</button></h5>
                                            </Col>

                                    </nav>

                                    <nav className="col-lg-8  border_nav">
                                            {this.render_nav()}
                                    </nav>

                            </div>
                        </div>



            );
    }

}

export default ModProfil;
