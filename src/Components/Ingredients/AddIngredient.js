import { Component } from 'react';
import axios from 'axios';
import ServerUrl from '../../typesAndConsts';
import IngredientForm from './IngredientForm';
import BooleanInventoryItem from '../../common/src/Model/InventoryModel/BooleanInventoryItem';

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
      name: undefined,
      category: undefined,
      alcoholPercentage: 0,
      isAvailable: true,
      remaining: undefined,
      minRequired: undefined,
    };
  }

  onChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onChangeCategory(event) {
    this.setState({
      category: event.target.value,
    });
  }

  onChangeAlcoholPercentage(event) {
    this.setState({
      alcoholPercentage: event.target.value,
    });
  }

  onChangeRemaining(event) {
    this.setState({
      remaining: event.target.value,
    });
  }

  onChangeIsAvailable(event) {
    this.setState({
      isAvailable: !this.state.isAvailable,
    });
  }

  onChangeMinRequired(event) {
    this.setState({
      minRequired: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let newIngredient = {
      name: this.state.name,
      category: this.state.category,
      alcoholPercentage: Number(this.state.alcoholPercentage),
      isAvailable: this.state.isAvailable,
      minRequired: Number(this.state.minRequired),
    };
    if (BooleanInventoryItem.isABooleanCategory(this.state.category)) {
      newIngredient = {
        ...newIngredient,
        remaining: this.state.isAvailable,
      };
    } else {
      newIngredient = {
        ...newIngredient,
        remaining: Number(this.state.remaining),
      };
    }

    axios
      .post(ServerUrl + 'inventory/', newIngredient)
      .then((res) => {
        console.log(res.data);
        this.props.history.push('/');
      })
      .catch(({ response }) => {
        if (response) {
          console.log(response.data);
        }
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
