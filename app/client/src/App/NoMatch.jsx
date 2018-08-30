import React, { Component } from 'react';

class NoMatch extends Component {
  constructor() {
    super();
    this.state = {data: "Erreur 404 : Lien  non existant"};

  }


  render() {
    return (
      <div>
        <h1>Erreur 404 : le chemin "<code>{location.pathname}</code>" n'existe pas </h1>
      </div>
    );
  }
}

export default NoMatch;
