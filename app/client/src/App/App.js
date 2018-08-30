import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Add_Events from './Events/Add_Event.jsx';
import Add_obj from './Create_object/Create_object.jsx'
import Navbar from './Navbar.jsx';
import Search from './Search.jsx';
import RockenContract from '../../../../build/contracts/Rocken.json'
import getWeb3 from '../utils/getWeb3.js'
import NoMatch from './NoMatch.jsx';
import Search_obj from './Search_obj/List_Ob.jsx';
import Search_ev from './Search_obj/List_Ev.jsx';
import Objet_loc from './Objet_loc.jsx';
import Events from './Events/Event.jsx';
import Stat from './Stat.jsx';
import Subscribe from './Account_management/Subscribe.jsx';
import My_account from './Account_management/ModProfil.jsx';
import {Link, Route, Switch, HashRouter } from 'react-router-dom';
import {Grid,Col,Row} from 'react-bootstrap';




class App extends Component {

  constructor() {
    super();
    this.state = {
      User_address: "",
      meta_on: false
    };

  }


  componentWillMount(){
    //detection d'un fournisseur web3 (Grace à metamask)
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

  render() {
    return (
      <div>


        <HashRouter>
          <div>
            <Navbar />
          <div className="Wrapper">



          <Switch>
            <Route exact path="/" component={Search}/>
            <Route path="/search_ob" component={Search_obj}/>
            <Route path="/search_ev" component={Search_ev}/>
            <Route path="/add_evt" component={Add_Events}/>
            <Route path="/add_obj" component={Add_obj}/>
            <Route path="/objet/:id" component={Objet_loc}/>
            <Route path="/events/:id" component={Events}/>
            <Route path="/Subscribe" component={Subscribe}/>
            <Route path="/Account" component={My_account}/>
            <Route path="/Event" component={Event}/>
            <Route path="/Admin" component={Stat}/>
            <Route component={NoMatch} />
          </Switch>
          </div>
          </div>

        </HashRouter>


        <div className="footer_rocketh">
          <h2 className="infos">INFOS PRATIQUES</h2>
          <h4 className="infos">Comment ça marche ?</h4>
          <h4 className="copyright">© ROCK.ETH</h4>
        </div>
      </div>
    );
  }
}

export default App;
