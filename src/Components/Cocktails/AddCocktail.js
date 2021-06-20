import React, { Component } from 'react';
import Alert from '@material-ui/lab/Alert';

import axios from 'axios';
import ServerUrl from '../../typesAndConsts';
import CocktailForm from './CocktailForm';

export default class AddCocktail extends Component {
  constructor(props) {
    super(props);

    //func binding
    this.onChangeName = this.onChangeName.bind(this);
    //#region New Ing
    this.newIngredientAdded = this.newIngredientAdded.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.onChangeNewIngName = this.onChangeNewIngName.bind(this);
    this.onChangeNewIngAmount = this.onChangeNewIngAmount.bind(this);
    this.onChangeNewIngIsOptional = this.onChangeNewIngIsOptional.bind(this);
    //#endregion
    this.onChangeNewStep = this.onChangeNewStep.bind(this);
    this.newStepAdded = this.newStepAdded.bind(this);

    this.onChangePortion = this.onChangePortion.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    console.log(this.props);

    this.state = {
      name: '',
      ingredients: [],
      method: [],
      portion: 1,
      newIngAmount: '',
      newIngName: '',
      newIngIsOptional: false,
      newStep: '',
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  // #region New Ingredient
  newIngredientAdded(e) {
    console.log(e);
    // Todo Validate
    if (this.state.newIngAmount <= 0) {
      // TODO
      return <Alert severity='error'>Amount can't be 0 or lower!</Alert>;
    }
    const newIng = [
      this.state.newIngAmount,
      this.state.newIngName,
      this.state.newIngIsOptional,
    ];
    this.setState({
      ingredients: [...this.state.ingredients, newIng],
      newIngAmount: '',
      newIngName: '',
      newIngIsOptional: false,
    });
  }

  deleteIngredient(e) {
    console.log(e);
  }

  onChangeNewIngAmount(e) {
    this.setState({
      newIngAmount: e.target.value,
    });
  }

  onChangeNewIngName(e) {
    this.setState({
      newIngName: e.target.value,
    });
  }

  onChangeNewIngIsOptional(e) {
    this.setState({
      newIngIsOptional: !this.state.newIngIsOptional,
    });
  }
  // #endregion New Ingredient

  onChangeNewStep(e) {
    this.setState({
      newStep: e.target.value,
    });
  }

  newStepAdded(e) {
    console.log(e);
    // Todo Validate

    this.setState({
      method: [...this.state.method, this.state.newStep],
      newStep: '',
    });
  }

  onChangePortion(e) {
    this.setState({
      portion: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newRecipe = {
      name: this.state.name,
      ingredients: this.state.ingredients,
      method: this.state.method,
      portion: this.state.portion,
    };
    console.log('submitted ' + newRecipe);

    axios
      .post(ServerUrl + 'recipe/', newRecipe)
      .then((res) => {
        console.log(res.data);
        this.props.history.push('/');
        // this.setState({
        //   cocktail: { ...res.data },
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h3>New Recipe</h3>
        <CocktailForm
          onSubmit={this.onSubmit}
          name={this.state.name}
          onChangeName={this.onChangeName}
          ingredients={this.state.ingredients}
          newIngAmount={this.state.newIngAmount}
          onChangeNewIngAmount={this.onChangeNewIngAmount}
          newIngName={this.state.newIngName}
          onChangeNewIngName={this.onChangeNewIngName}
          newIngIsOptional={this.state.newIngIsOptional}
          onChangeNewIngIsOptional={this.onChangeNewIngIsOptional}
          newIngredientAdded={this.newIngredientAdded}
          method={this.state.method}
          newStep={this.state.newStep}
          onChangeNewStep={this.onChangeNewStep}
          newStepAdded={this.newStepAdded}
          portion={this.state.portion}
          onChangePortion={this.onChangePortion}
          submitTitle={'Create Recipe'}
        />
      </div>
    );
  }
}
