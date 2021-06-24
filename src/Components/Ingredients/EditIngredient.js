import { Component } from 'react';

import axios from 'axios';
import ServerUrl from '../../typesAndConsts';
import IngredientForm from './IngredientForm';
import BooleanInventoryItem from '../../common/src/Model/InventoryModel/BooleanInventoryItem';

export default class EditIngredient extends Component {
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
      ingredientID: this.props.match.params.id,
      name: '',
      category: '',
      alcoholPercentage: 0,
      isAvailable: true,
      remaining: '',
      minRequired: '',
    };
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    axios
      .get(ServerUrl + 'inventory/' + this.state.ingredientID)
      .then((res) => {
        console.log(res.data);
        this.setState({
          name: res.data.name,
          category: res.data.category,
          alcoholPercentage: res.data.alcoholPercentage,
          isAvailable: res.data.isAvailable,
          remaining: res.data.remaining,
          minRequired: res.data.minRequired,
        });
      })
      .catch(({ response }) => {
        if (response) {
          console.log(response.data);
        }
      });
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
    let updatedIngredient = {
      name: this.state.name,
      category: this.state.category,
      alcoholPercentage: Number(this.state.alcoholPercentage),
      isAvailable: this.state.isAvailable,
      minRequired: Number(this.state.minRequired),
    };
    if (BooleanInventoryItem.isABooleanCategory(this.state.category)) {
      updatedIngredient = {
        ...updatedIngredient,
        remaining: this.state.isAvailable,
      };
    } else if (Number(this.state.remaining) > 0) {
      updatedIngredient = {
        ...updatedIngredient,
        remaining: Number(this.state.remaining),
      };
    } else {
      updatedIngredient = {
        ...updatedIngredient,
        use: -Number(this.state.remaining),
      };
    }

    axios
      .patch(
        ServerUrl + 'inventory/' + this.state.ingredientID,
        updatedIngredient
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.result.success) this.props.history.push('/');
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
        <h3>Edit Ingredient</h3>
        <IngredientForm
          onSubmit={this.onSubmit}
          submitTitle={'Save Changes'}
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
