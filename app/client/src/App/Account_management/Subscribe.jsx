import getWeb3 from '../../utils/getWeb3.js';
import React, { Component } from 'react';
import {Grid,Col,Row} from 'react-bootstrap';
import axios from 'axios';
import '../App.css';
var querystring = require('querystring');
import config from './../config.json';

class Subscribe extends Component{
  constructor(props){
    super(props);
    this.state = {
        User_address: "Pas de compte trouvé",
        web3: null,
        meta_on : false,
        pass_confirm: "",
        username: "",
        pass: "",
        mail: ""
    };

    this.Subscribe = this.Subscribe.bind(this);
    this.Update_mail = this.Update_mail.bind(this);
    this.Update_password = this.Update_password.bind(this);
    this.Update_username = this.Update_username.bind(this);
  }

  componentWillMount() {
    getWeb3
    .then(results => {

      results.web3.eth.getAccounts( (error,acc) => {
        this.setState({
          User_address: acc[0],
          meta_on : true
        })
      });
      this.setState({
        web3: results.web3
      });


    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  Subscribe(){
    if (this.state.meta_on){

      if( this.state.username && this.state.pass && this.state.mail ){
        if ((this.state.pass == this.state.pass_confirm) && (this.state.pass.length < 8)){
        /////
        axios.post(config.Add_connect+'/insert_user/',
          querystring.stringify({
              address: this.state.User_address,
              username: this.state.username,
              password: this.state.pass,
              mail: this.state.mail
            }), {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(function(response) {

        });
        location.reload();
        ///
        }
        else{
          if ( this.state.pass != this.state.pass_confirm ){
            alert('Mot de passe et confirmation différente')
          }
          else{
            alert('Mot de passe incorrect, 8 caractères minimum')
          }

        }
      }
      else{
        alert('vous n\'avez pas rempli tout les champs !')
      }

    }
    else{
      alert('Veuillez vous connecter a votre compte metamask')
    }
  }

  Update_username(e){
    this.setState({username : e.target.value});
  }

  Update_password(e){
    this.setState({pass : e.target.value});
  }

  Update_mail(e){
    this.setState({mail: e.target.value});
  }

  Update_majPass(e){
    this.setState({pass_confirm : e.target.value});
  }



  render(){

    return(
      <div className="container_white">
        <Grid>
      <Row><h5>Votre adresse : {this.state.User_address}</h5></Row>
      <Row><h5>Nom de compte :</h5> <input type ="text" onChange = {this.Update_username}></input></Row>

      <Row><h5>Mot de passe : </h5><input type ="password" onChange = {this.Update_password}></input></Row>
      <Row><h5>Confirmation Mot de passe : </h5><input type ="password" onChange = {this.Update_majPass}></input></Row>
      <Row><h5>Mail : </h5><input type ="text" onChange = {this.Update_mail}></input></Row>
      <br/>
      <Row><button className="bt_loc" onClick= {this.Subscribe}><h5>Inscription</h5></button></Row>
        </Grid>
      </div>
    );
  }

}

export default Subscribe
