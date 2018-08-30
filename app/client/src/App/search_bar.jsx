import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './Navbar.css'
import './search_bar.css'
import {Link, Route } from 'react-router-dom';



class Search_bar extends Component{
  constructor() {
    super();
    this.state = {value: '0'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.conditionLink = this.conditionLink.bind(this);
  }

  handleChange(event) {
   this.setState({value: event.target.value});
 }

 handleSubmit(event) {
   alert('Your favorite flavor is: ' + this.state.value);
   event.preventDefault();
 }

 conditionLink(){
   if(this.state.value == 0){
     return(
       <Link to="/search_ob" style={{ color: 'white', textDecoration: 'none' }}>Rechercher</Link>
     );

   }
   else{
     return(
       <Link to="/search_ev" style={{ color: 'white', textDecoration: 'none' }}>Rechercher</Link>
     );
   }

 }


  render() {

      return (
        <div className="search_container">
        <form onSubmit={this.handleSubmit}>

        <label>

          <select className="toggle_select" value={this.state.value} onChange={this.handleChange}>
            <option value="0">Objet / service</option>
            <option value="1">Évènement</option>
          </select>
        </label>
        <span className="bt_Red">
          {this.conditionLink()}
        </span>

      </form>

      </div>


      );
    }


}

export default Search_bar;
