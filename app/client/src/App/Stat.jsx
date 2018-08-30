import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../public/rocket.png';
import micro from '../../public/micro.png';
import hands from '../../public/hands.png';
import portrait1 from '../../public/portrait1.png';
import portrait2 from '../../public/portrait2.png';
import event from '../../public/statevent.png';
import subscription from '../../public/subscription.png';
import {Grid,Col,Row, Alert, Button} from 'react-bootstrap';

class Stat extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	step: 1,
    	show : false
    };

    this.render_right= this.render_right.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.render_alert = this.render_alert.bind(this);
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
          <h2>Echanger mes Rockens</h2>
          <p>
            Si tu échanges tes Rockens, tu obtiendras 10,5€ et ton solde sera de 0 Rockens.
          </p>
          <p>
            Veux-tu revendre tes Rockens ?
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
                        <Col mdOffset={1} md={5}>
                        	<div className="center_text">
                        		<button className="bt_Red_form" onClick={this.handleShow}>Echanger les Rockens</button>
                        	</div>
                        </Col>
                    </div>
            );
    }
  }

render_right(e){

	if(this.state.step == 1){ // Back Office
		return(

								<div>
										<Row>
											<h4><img src={logo} className="icone_logo"/>Visites du site</h4>
										</Row>

										<Row>
											<Col xs={12} sm={4} md={2}>
												<h3 className="row_tab center_text">572</h3>
												<p className="row_tab center_text">Visites</p>
											</Col>
											<Col xs={12} sm={4} md={2}>
												<h3 className="row_tab center_text">8</h3>
												<p className="row_tab center_text">Pages</p>
											</Col>
											<Col xs={12} sm={4} md={2}>
												<h3 className="row_tab center_text">5</h3>
												<p className="row_tab center_text">Min</p>
											</Col>
										</Row>

										<Row>
											<h4 style = {{ marginTop : '2.5em'}}><img src={subscription} className="icone_logo"/>Inscriptions</h4>

											<Col xs={12} sm={4} md={2}>
											<div className="center_text">
												<h3>888</h3>
												<div>Inscriptions</div>
											</div>
											</Col>
										</Row>

										<Row style = {{ marginTop : '2.5em'}}>
											<Col sm={4} md={4}>
												<h4><img src={micro} className="icone_logo center_text"/>Objets</h4>
											</Col>
											<Col sm={4} md={4}>
												<h4><img src={hands} className="icone_logo center_text"/>Services</h4>
											</Col>
											<Col sm={4} md={4}>
												<h4><img src={event} className="icone_logo center_text"/>Evénements</h4>
											</Col>

										</Row>
										<Row>
											<Col sm={4} md={4}>

										     	<div className="center_text">
										        <h4>400</h4>
												<div>Annonces</div>
												<h4>122</h4>
												<div>Echanges</div>
											   </div>
										      </Col>

										    <Col sm={4} md={4}>

										    	<div className="center_text">
										        <h4>252</h4>
												<div>Annonces</div>
												<h4>122</h4>
												<div>Echanges</div>
											   </div>
										      </Col>

										    <Col sm={4} md={4}>


										       <div className="center_text">
										        <h4>288</h4>
												<div>Annonces</div>
												<h4>122</h4>
												<div>Places achetées</div>
											   </div>
										      </Col>
										</Row>
								</div>
			);
	} // Fin Back Office

	else if(this.state.step == 2){ // Signalements
		return(
			<div>
				<Row>
					<h3>3 nouveaux signalements</h3>
				</Row>
				<Row>
					<h4>Cliquez sur la croix une fois le problème résolu ou pour ignorer le signalement</h4>
				</Row>
				<Row>
					<img src={portrait1} className="icone_logo"/>
				</Row>
			</div>

			);

	} // Fin signalements

	else if(this.state.step == 3){ //Mes rockens
		return(
            <div>
                    <div className="center_text">
                    <h4>Solde</h4>
                    <h2>45,0</h2>
                    <h4>ROCKENS</h4>
                    </div>
                    <br/>
                    <br/>
                    {this.render_alert()}


            </div>
            );
	}//Fin mes rockens

}
// FIN RENDER PARTIE DROITE

	render(){
		return(

			<div>
				<body>
					<div className = "container">
						<div className="container_white2">
							<div className="row">

								<nav className="col-lg-3">
											<Row>
												<Col xs={12} sm={4} md={10} className="row_tab_nav">
													<h4 className="row_tab_nav"><button className="bt_inv" value = "1" onClick={this.changeStep}>Back Office</button></h4>
													<h4>Annonces</h4>
													<p className="row_tab_nav"><button className="bt_inv" value = "2" onClick={this.changeStep}>Signalements</button></p>
													<h4 className="row_tab_nav"><button className="bt_inv" value = "3" onClick={this.changeStep}>Mes Rockens</button></h4>
												</Col>
											</Row>
								</nav>
								<nav  className="col-md-9 border_nav">{this.render_right()}</nav>



							</div>
						</div>
					</div>
				</body>
			</div>


			);}

}

export default Stat;
