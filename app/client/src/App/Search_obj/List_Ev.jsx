import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
var querystring = require('querystring');
import '../App.css';
import {Grid,Col,Row} from 'react-bootstrap';
import {Link, Route, Switch } from 'react-router-dom';
import config from './../config.json'



class List_Ev extends Component{



  constructor(){
    super();
    this.array_obj ={};
    this.state = {
      items: [],
    };
  }

  componentWillMount(){
    var _this=this;
    console.log(config.Add_connect)
    axios.get(config.Add_connect+'/get_events/',{})
    .then(response => {

      _this.setState({items: response.data});
    })
  }

  componentDidMount(){


  }



  render() {
    return(
      <div className={"container_white"}>
        <Grid>
          <div className="bt_loc">
            <Link to="/Search_ob" style={{ color: 'white', textDecoration: 'none' }}>Chercher un Objet/Service
            </Link></div>
            <h2>Évènements disponibles</h2>
        {this.state.items.map(item =>
          <div>

            <Row><Link to={`/events/${item._id}`} >

              <Col xs={2}><h4>{item.titre}</h4></Col>
              <Col xs={6}><h4>{item.description}</h4></Col>
              <Col xs={2}><h4>{item.date}</h4></Col>
              <Col xs={2}><h4>{item.prix} Rockens</h4></Col>
              </Link>
            </Row>
            <hr/>
          </div>
      )}
      </Grid>
      </div>

    );
  }

}

export default List_Ev;
