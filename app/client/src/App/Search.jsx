import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';
import Search_bar from "./search_bar.jsx"
import {Grid,Col,Row} from 'react-bootstrap';
import logo from './../../public/rocket.png';
import ico_1 from './../../public/1.png';
import ico_2 from './../../public/2.png';
import ico_3 from './../../public/3.png';
import ico_4 from './../../public/4.png';
import ico_5 from './../../public/5.png';
import ico_6 from './../../public/6.png';


class Search extends Component{
  constructor() {
    super();
    this.state = {
      slogan: "ORGANISE CE QUI TE RESSEMBLE AVEC ROCK.ETH!"

    };
  }

  render() {
    return (
      <div>

      <div className="Modulesearch">
        <div className="slogan">{this.state.slogan}</div>
        <Search_bar className="search_container" />
      </div>
      <div>
      <Grid >
        <Row><h1 className="center_text">
          <img src={logo} className="logo_petit"/>
          AVANTAGES ROCK.ETH</h1>
        <div className="red_bar"></div>
        </Row>
        <Row>
          <Col xs={12} sm={4}>
            <img src={ico_1} className="icone_part"/>
            <h2 className="center_text">Simple d'utilisation</h2>
            <h5 className="justify">La plateforme a été pensée pour te permettre
            d'y naviguer confortablement et de gagner
          du temps e néchangant le plus simplement possible</h5>
          </Col>
          <Col xs={12} sm={4}>
            <img src={ico_2} className="icone_part"/>
            <h2 className="center_text">Innovant</h2>
            <h5 className="justify">Expérimente une toute nouvelle manière d'échanger et
            d'être au courant des derniers événements au sein de
          ton école.</h5>
          </Col>
          <Col xs={12} sm={4}>
            <img src={ico_3} className="icone_part"/>
            <h2 className="center_text">Echanges sécurisés</h2>
            <h5 className="justify">Echange en toute tranquilité sur ROCK.ETH : les
            transactions sont effectuées de manière sécuriée et
          en toute confiance.</h5>

          </Col>
        </Row>
        <h1 className="center_text">
          <img src={logo} className="logo_petit"/>
          ECHANGES EN ROCKENS</h1>
        <div className="red_bar"></div>
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>

            <h5 className="justify">Tous les échanges se font en Rockens, la monnaie
            de ROCK.ETH. Viens défier tes amis et gravis les
            différents niveaux de la plateforme</h5>
          <hr/>
            <Row>
              <Col xs={4}>
                <img src={ico_4} className="icone_part"/>
                <h2 className="center_text">Débutant</h2></Col>
              <Col xs={4}>
                <img src={ico_5} className="icone_part"/>
                <h2 className="center_text">Apprenti</h2></Col>

              <Col xs={4}>
                <img src={ico_6} className="icone_part"/>
                <h2 className="center_text">Expert</h2></Col>
            </Row>
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Grid>
      </div>
    </div>



    );
  }



}

export default Search;
