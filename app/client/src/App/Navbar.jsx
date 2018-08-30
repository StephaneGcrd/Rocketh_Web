import React, { Component } from 'react';
import axios from 'axios';
import './Navbar.css';
var querystring = require('querystring');
import getWeb3 from '../utils/getWeb3.js';
import logo from './../../public/rocket.png';
import {Link, Route } from 'react-router-dom';


class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      bt_ev: "Créer un événement",
      bt_ob: "Proposer mon objet/service",
      bt_login: "Se connecter",
      bt_logoff: "Se deconnecter",
      bt_sub: "Inscription",
      bt_dev: "Test Blockchain (Dev)",
      bt_dev_account: "Mon Compte",
      bt_dev_inscription: "Creer Compte (Dev)",
      stat: 1,
      web3: null,
      meta_on : false,
      address: 'stephane.gcrd@gmail.com',
      mail: '',
      nom: '',
      state_login: false
    };

    this.Connexion = this.Connexion.bind(this);
  }

  componentWillMount() {
    var that = this;
    getWeb3
    .then(results => {
      results.web3.eth.getAccounts( (error,acc) => {
        this.setState({
          address: acc[0],
          meta_on : true,
          web3: results.web3
        })
        axios.post('http://localhost:8000/search_user/',
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




  Connexion(){
    console.log(this.state.address)
    console.log(this.state.nom)
    if(!this.state.address){
      return(<span className="bt_right">
      <span className="bt_Red">Veuillez installer un portefeuille Ethereum pour utiliser le site</span>
      <span className="bt_white"><a href='https://metamask.io/'>Metamask, disponible pour Chrome et Firefox</a> </span>
      </span>);

    }
    else if(this.state.address && !this.state.nom ){
      return(
        <span className="bt_right">
        <span className="bt_Red">Inscrivez vous pour utiliser les fonctionnalités du site !</span>
        <span className="bt_white"><Link to="/Subscribe" style={{textDecoration: 'none' }}>{this.state.bt_sub}</Link></span>
        </span>
      );

    }
    else if(this.state.address && this.state.nom){
      return(
        <span className="bt_right">
        <span className="bt_Red">Back-office</span>
        <span className="bt_Red"><Link to="/add_evt" style={{textDecoration: 'none', color: 'white'}}>{this.state.bt_ev}</Link></span>
        <span className="bt_Red"><Link to="/add_obj" style={{textDecoration: 'none', color: 'white'}}>{this.state.bt_ob}</Link></span>
        <span className="bt_white">Bonjour, {this.state.nom} - <Link to="/Account" style={{textDecoration: 'none' }}>{this.state.bt_dev_account}</Link></span>
        </span>

      );

    }

  }
  render() {
    return (
      <div className="navbar">
        <span className="titre"><Link to="/" style={{ color: 'white'}}><img src={logo} alt="Mountain View" className="image_logo"/></Link></span>

          {this.Connexion()}



      </div>


    );
  }



}

export default Navbar;
