import React, { Component } from 'react';
import getWeb3 from '../../utils/getWeb3.js';
import axios from 'axios';
import {Grid,Col,Row} from 'react-bootstrap';
var querystring = require('querystring');
import './../Objet_loc.css';
import './../App.css';
import './../Datetime.css';
import config from './../config.json'

class Create_Object extends Component {
  constructor(props) {
    super(props);

    this.state ={
      step: 1,
      selectedOption: 'Objet',
      category: '',
      title: '',
      description: '',
      address_viewer: '',
      meta_on: false,
      price: ''

    };

    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleStepBackChange = this.handleStepBackChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleInputChangeC = this.handleInputChangeC.bind(this);
    this.handleInputChangeT = this.handleInputChangeT.bind(this);
    this.handleInputChangeD = this.handleInputChangeD.bind(this);
    this.handleInputChangeP = this.handleInputChangeP.bind(this);
    this.sendInfos = this.sendInfos.bind(this);

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
    });
  }


  sendInfos(){
     console.log(this.state.address_viewer)
    axios.post(config.Add_connect+'/insert_obj/',
      querystring.stringify({
          title: this.state.title,
          category: this.state.category,
          description: this.state.description,
          price: this.state.price,
          address: this.state.address_viewer,
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {

    });
    location.reload();
    alert("done");


  }
  handleStepChange(evt){
    evt.preventDefault();
    this.setState({step: this.state.step+1});
  }

  handleStepBackChange(){
    this.setState({step: this.state.step-1});
  }

  handleOptionChange(changeEvent) {
    this.setState({selectedOption: changeEvent.target.value});
  }

  handleInputChangeC(e) {
    this.setState({category: e.target.value});
  }

  handleInputChangeT(e) {
    this.setState({title: e.target.value});
  }

  handleInputChangeD(e) {
    this.setState({description: e.target.value});
  }

  handleInputChangeP(e) {
    this.setState({price: e.target.value});
  }


render() {

 if (this.state.step==1) {
  return(

<div className="container_white">
  <div className="text-center">
    <h3>Publier une annonce</h3>
    <div className="container">
      <div className="row">
        <span className="step_act">1</span>
        <span className="step_pas">2</span>
        <span className="step_pas">3</span>
      </div>
    </div>
  </div>
  <br/>

      <Grid>
      <form onSubmit={this.handleStepChange}>

        <Row>
          <div className="form-group">
        <div className="radio">
          <label className="col-lg-1">
          <input type="radio" value="Objet"
                      checked={this.state.selectedOption === 'Objet'}
                      onChange={this.handleOptionChange} />
                      Objet
          </label>
        </div>

        <div className="radio">
          <label className="col-lg-1">
          <input type="radio" value="Service"
                      checked={this.state.selectedOption === 'Service'}
                      onChange={this.handleOptionChange} />
                      Service
          </label>
        </div>
        </div>
        </Row>
      <br/>

        <Row>
          <div className="form-group">
            <div className="col-lg-2">Catégorie * </div>
            <div className="col-lg-4">
            <select className="form-control" value={this.state.category} onChange={this.handleInputChangeC} required>
              <option value="" selected disabled hidden>Cliquez pour choisir</option>
              <option value="Enceinte">Enceinte</option>
              <option value="Lumière">Lumière</option>
            </select>
            </div>
          </div>
        </Row>

        <br/>
        <Row>
          <Col xs={1}><button className="bt_Red_form"><a href="javascript:history.go(-1)" style={{textDecoration: 'none', color: 'white'}}>Annuler</a></button></Col>
          <Col xs={1}><button type="submit" className="bt_Red_form">Suivant</button></Col>
        </Row>

      </form>
      </Grid>


  </div>

      ); //fin du return
    } //fin du if

    else if(this.state.step==2){
      return(

        <div className="container_white">

        <div className="text-center">
          <h3>Publier une annonce</h3>
          <div className="container">
            <div className="row">
              <span className="step_pas">1</span>
              <span className="step_act">2</span>
              <span className="step_pas">3</span>
            </div>
          </div>
        </div>
        <br/>


        <div className="container form-group">
          <form onSubmit={this.handleStepChange}>

            <div className="row">
              <div className="form-group">
                  <label htmlFor="text" className="col-lg-4 control-label">Titre de l'annonce </label>
                  <div className="col-lg-4">
                    <input value={this.state.title} onChange={this.handleInputChangeT} type="text" className="form-control" id="text" required/>
                </div>
              </div>
            </div>

            <br/>
            <div className="row">
              <div className="form-group">
                <label htmlFor="text" className="col-lg-4 control-label">Description </label>
                <div className="col-lg-4">
                    <textarea className="desc_input" value={this.state.description} onChange={this.handleInputChangeD} type="text"  id="text" required/>
                </div>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="form-group">
                  <label htmlFor="text" className="col-lg-4 control-label">Prix </label>
                  <div className="col-lg-2">
                  <div className="input-group">
                    <input value={this.state.price} onChange={this.handleInputChangeP} type="number" className="form-control" id="text" required/>
                    <span className="input-group-addon">Rockens</span>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div>
              <button className="bt_Red_form" onClick={this.handleStepBackChange}>Retour</button>
              <button type="submit" className="bt_Red_form">Suivant</button>
            </div>

          </form>
        </div>

        </div>

      ); //fin du return
    } //fin du if

    else if(this.state.step==3){
      return(

      <div className="container_white">

        <div className="text-center">
          <h3>Publier une annonce</h3>
          <div className="container">
            <div className="row">
              <span className="step_pas">1</span>
              <span className="step_pas">2</span>
              <span className="step_act">3</span>
            </div>
          </div>
        </div>
        <br/>


        <div className="container">
          <form>

            <h1 className = "evenement center_text">Récapitulatif de l'annonce</h1>

            <div className="row">
              <h3 className="col-lg-4">{this.state.title}</h3>
            </div>
            <div className="row">
              <div className="col-lg-4"><h5>Je propose un : </h5>{this.state.selectedOption}</div>
            </div>
            <div className="row">
              <div className="col-lg-4"><h5>Catégorie : </h5>{this.state.category}</div>
            </div>
            <div className="row">
              <div className="col-lg-4"><h5>Description : </h5>{this.state.description}</div>
            </div>
            <div className="row">
              <div className="col-lg-4"><h5>Prix : </h5>{this.state.price}</div>
            </div>
            <br/>
            <div>
              <button className="bt_Red_form" onClick={this.handleStepBackChange}>Retour</button>
              <button type="submit" className="bt_Red_form" onClick={this.sendInfos}>Envoyer</button>
            </div>

          </form>
        </div>

      </div>

      ); //fin du return
    } //fin du if


  } //fin du render

} //fin de la class


export default Create_Object;
