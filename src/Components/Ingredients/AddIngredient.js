import React, { Component } from 'react';
import Alert from '@material-ui/lab/Alert';

import axios from 'axios';
import ServerUrl from '../../typesAndConsts';
import IngredientForm from './IngredientForm';

export default class AddIngredient extends Component {
  constructor(props) {
    super(props);

    //func binding
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeAlcoholPercentage = this.onChangeAlcoholPercentage.bind(this);
    this.onChangeIsAvailable = this.onChangeIsAvailable.bind(this);
    this.onChangeRemaining = this.onChangeRemaining.bind(this);
    this.onChangeMinRequired = this.onChangeMinRequired.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    //Set initial state
    this.state = {
      name: '',
      category: '',
      alcoholPercentage: 0,
      isAvailable: true,
      remaining: '',
      minRequired: '',
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  onChangeAlcoholPercentage(e) {
    this.setState({
      alcoholPercentage: e.target.value,
    });
  }

  onChangeRemaining(e) {
    this.setState({
      remaining: e.target.value,
    });
  }

  onChangeIsAvailable(e) {
    this.setState({
      isAvailable: !this.state.isAvailable,
    });
  }

  onChangeMinRequired(e) {
    this.setState({
      minRequired: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newIngredient = {
      name: this.state.name,
      category: this.state.category,
      alcoholPercentage: this.state.alcoholPercentage,
      isAvailable: this.state.isAvailable,
      remaining: this.state.remaining,
      minRequired: this.state.minRequired,
    };
    console.log(newIngredient);

    axios
      .post(ServerUrl + 'inventory/', newIngredient)
      .then((res) => {
        console.log(res.data);
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h3>New Ingredient</h3>
        <IngredientForm
          onSubmit={this.onSubmit}
          submitTitle={'Create Ingredient'}
          name={this.state.name}
          onChangeName={this.onChangeName}
          category={this.state.category}
          onChangeCategory={this.onChangeCategory}
          alcoholPercentage={this.state.alcoholPercentage}
          onChangeAlcoholPercentage={this.onChangeAlcoholPercentage}
          IsAvailable={this.state.isAvailable}
          onChangeIsAvailable={this.onChangeIsAvailable}
          remaining={this.state.remaining}
          onChangeRemaining={this.onChangeRemaining}
          minRequired={this.state.minRequired}
          onChangeMinRequired={this.onChangeMinRequired}
        />
      </div>
    );
  }
}
