import React, { Component } from 'react';
import axios from 'axios';
import ServerUrl from '../../typesAndConsts';

export default class ShowCocktail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cocktailID: this.props.match.params.id,
      cocktail: {},
    };
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    axios
      .get(ServerUrl + 'recipe/' + this.state.cocktailID)
      .then((res) => {
        this.setState({
          cocktail: { ...res.data },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <p>Show {this.state.cocktail.name}</p>
      </div>
    );
  }
}
