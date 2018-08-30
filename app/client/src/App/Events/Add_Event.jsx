import React, { Component } from 'react';
import getWeb3 from '../../utils/getWeb3.js';
import axios from 'axios';
import {Grid,Col,Row} from 'react-bootstrap';
var querystring = require('querystring');
import './../Objet_loc.css';
import './../App.css';
import config from './../config.json'

class Add_Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title : '',
      category : "Anniversaire",
      description :'',
      place : '',
      price : '',
      date: "01/01/2017",
      max : '',
      firstPage: true,
      selectedFile :'',
      meta_on: false,
      address_viewer : ""

    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChangeT = this.handleInputChangeT.bind(this);
    this.handleInputChangeC = this.handleInputChangeC.bind(this);
    this.handleInputChangeD = this.handleInputChangeD.bind(this);
    this.handleInputChangePl = this.handleInputChangePl.bind(this);
    this.handleInputChangePr = this.handleInputChangePr.bind(this);
    this.handleInputChangeM = this.handleInputChangeM.bind(this);
    this.cancel = this.cancel.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
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

      ////
      axios.post(config.Add_connect+'/insert_evt/',
        querystring.stringify({
            title: this.state.title,
            category: this.state.category,
            description: this.state.description,
            place: this.state.place,
            price: this.state.price,
            max: this.state.max,
            orga: this.state.address_viewer,
            date: this.state.date
          }), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(function(response) {
            alert("done");
            location.reload();

      });


    }

    handleSubmit(evt) {
      evt.preventDefault();
      this.setState({firstPage: false});
       }

    handleInputChangeT(e) {
    	this.setState({title: e.target.value});
  	}
  	handleInputChangeC(e) {
    	this.setState({category: e.target.value});
  	}
  	handleInputChangeD(e) {
    	this.setState({description: e.target.value});
  	}
  	handleInputChangePl(e) {
    	this.setState({place: e.target.value});
  	}
  	handleInputChangePr(e) {
    	this.setState({price: e.target.value});
  	}
  	handleInputChangeM(e) {
    	this.setState({max: e.target.value});
  	}

    handleInputChangeDate(e) {
    	this.setState({date: e.target.value});
  	}
  	cancel(evt){
  		this.setState({firstPage: true});

  	}

    fileChangedHandler(evt){
      const file = e.target.files[0];
      this.setState({selectedFile: evt.target.files[0]});
    }

    uploadHandler(){
      console.log(this.state.selectedFile);
     }







    render() {

      if(this.state.firstPage == true){

      return(

      <div className="container_white">

    	<h1 className = "evenement center_text">Créer un événement</h1>

    	<br/>
    	<br/>
      <br/>







      <form onSubmit={this.handleSubmit}  className="form-horizontal" >

      	<div className="row">
   		 <div className="form-group">
    		<label htmlFor="select" className="col-lg-4 control-label">Catégorie *</label>
      		<div className="col-lg-2">
        		<select value={this.state.category} onChange={this.handleInputChangeC} id="select" className="form-control" required>
          			<option value="Anniversaire">Anniversaire</option>
          			<option value="Soirée BDE">Soirée BDE</option>
          			<option value="Soirée BDA">Soirée BDA</option>
        		</select>
      		</div>
    	</div>
  		</div>



      	<div className="row">
    		<div className="form-group">
      			<label htmlFor="text" className="col-lg-4 control-label">Titre de l'annonce * </label>
      			<div className="col-lg-4">
        			<input value={this.state.title} onChange={this.handleInputChangeT} type="text" className="form-control" id="text" required/>

     		 	</div>
    		</div>
  		</div>

      {/*

        <div className="row">
      			<div className="custom-file">
      				<input type="file" className="custom-file-input bt_Red" onChange={this.fileChangedHander} id="customFile"/>
              <button onClick={this.uploadHandler}>Upload!</button>
    			</div>
    		</div> */}



  		<div className="row">
    		<div className="form-group">
      			<label htmlFor="textarea" className="col-lg-4 control-label">Description </label>
      			<div className="col-lg-4">
        			<textarea rows="5" value={this.state.description} onChange={this.handleInputChangeD} className="form-control" id="textarea" />
      			</div>
    		</div>
  		</div>


  		<div className="row">
    		<div className="form-group">
      			<label htmlFor="text" className="col-lg-4 control-label">Lieu * </label>
      			<div className="col-lg-4">
        			<input value={this.state.place} onChange={this.handleInputChangePl} type="text" className="form-control" id="text" required/>
     		 	</div>
    		</div>
  		</div>

      <Row>
        <Col lg={5}></Col>
        <Col lg={2}>
          <div className="form-group">
        <label htmlFor="text" className="control-label">Date : </label>
        <input  type="date" className="form-control" id="text" required/>
        </div>
        </Col>
        <Col lg={5}></Col>
  		</Row>
      <Row>
        <Col lg={5}></Col>
        <Col lg={2}>
          <div className="form-group">
        <label htmlFor="text" className="control-label">Heure : </label>
        <input  type="time" className="form-control" id="text" required/>
        </div>
        </Col>
        <Col lg={5}></Col>
      </Row>
    <br/>

  		<Row>
    		<div className="form-group">
      			<label htmlFor="text" className="col-lg-4 control-label">Prix d'une place * </label>
      			<div className="col-lg-4">
      				<div className="input-group">
        				<input value={this.state.price} onChange={this.handleInputChangePr} type="number" className="form-control" id="text" required/>
        				<span className="input-group-addon">Rockens</span>
        			</div>
     		 	</div>
    		</div>
  		</Row>

  		<div className="row">
    		<div className="form-group">
      			<label htmlFor="text" className="col-lg-4 control-label">Maximum ventes * </label>
      			<div className="col-lg-4">
        			<input value={this.state.max} onChange={this.handleInputChangeM} type="text" className="form-control" id="text" required/>
     		 	</div>
    		</div>
  		</div>



      <Row>
        <div>
          <button className="bt_loc centered_div" type="submit">Envoyer</button>
        </div>
      </Row>





	</form>







  </div>

    	);
    	} //fin du if()

    	else{


    		return(

          <div className="container_white">
            <h1 className = "evenement center_text">Récapitulatif de l'événement</h1>

            <br/>
            <br/>
            <br/>

            <div className="col-lg-offset-2">


        <h3>{this.state.title}</h3>


      <div className="row">
        <div className="col-lg-4">Par</div>
        <div className="col-lg-4">{this.state.title}</div>
      </div>

      <div className="row">
        <div className="col-lg-4">Catégorie :</div>
        <div className="col-lg-4">{this.state.category}</div>
      </div>
      <div className="row">
        <div className="col-lg-4">Lieu :</div>
        <div className="col-lg-4">{this.state.place}</div>
      </div>
      <div className="row">
        <div className="col-lg-4">Description :</div>
        <div className="col-lg-4">{this.state.description}</div>
      </div>
      <div className="row">
        <div className="col-lg-4">Prix :</div>
        <div className="col-lg-4">{this.state.price}</div>
      </div>
      <div className="row">
        <div className="col-lg-4">Max ventes :</div>
        <div className="col-lg-4">{this.state.max}</div>
      </div>
      <div>
          <button className="bt_loc" onClick={this.sendInfos}>Envoyer</button>
        </div>
        </div>
    </div>



    	);




    	}// fin du else


    }



  }
export default Add_Events;
