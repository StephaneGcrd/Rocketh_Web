import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
var querystring = require('querystring');
import '../App.css';
import {Grid,Col,Row} from 'react-bootstrap';
import {Link, Route, Switch } from 'react-router-dom';
import config from './../config.json'



class List_Ob extends Component{



  constructor(){
    super();
    this.array_obj ={};
    this.state = {
      items: [],
    };
  }

  componentWillMount(){
    let add = config.Add_connect+'/get_objects/'
    var _this=this;
    axios.get(config.Add_connect+'/get_objects/',{})
    .then(response => {

      _this.setState({items: response.data});
    })
  }

  componentDidMount(){


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
      else{
        return(
          <Col xs={4}>
          <span className="h4">Statut - </span>
          <span className="ball_orange"></span>
          <span className="h4"> Location en cours !</span>
          </Col>
        );
      }
    }




  render() {


    return(
      <div className={"container_white"}>
        <Grid>
          <div className="bt_loc">
            <Link to="/Search_ev" style={{ color: 'white', textDecoration: 'none' }}>Chercher un évènement
            </Link></div>
          <h2>Objets/services disponibles</h2>

            {this.state.items.map(item =>
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

      </div>



    );


  }

}

export default List_Ob;
