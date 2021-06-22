import React, { Component } from 'react';
import axios from 'axios';
import ServerUrl from '../../typesAndConsts';
import CocktailForm from './CocktailForm';
import Alert from '@material-ui/lab/Alert';
export default class EditCocktail extends Component {
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

    //Set initial state
    this.state = {
      cocktailID: this.props.match.params.id,
      name: '',
      ingredients: [],
      method: [],
      portion: 1,
      form: '',
      newIngAmount: '',
      newIngName: '',
      newIngIsOptional: false,
      newStep: '',
    };
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    axios
      .get(ServerUrl + 'recipe/' + this.state.cocktailID)
      .then((res) => {
        console.log(res.data);
        let ings = res.data.ingredients.map((ing) => [
          ing[0],
          ing[1].name,
          ing[2],
        ]);
        this.setState({
          name: res.data.name,
          ingredients: ings,
          method: res.data.method,
          portion: res.data.portion,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeName(e) {
    console.log(e.target.value);
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

    const UpdatedRecipe = {
      name: this.state.name,
      ingredients: this.state.ingredients,
      method: this.state.method,
      portion: this.state.portion,
    };
    console.log('submitted ' + UpdatedRecipe);

    axios
      .patch(ServerUrl + 'recipe/' + this.state.cocktailID, UpdatedRecipe)
      .then((res) => {
        console.log(res.data);
        if (res.data.result.success) this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const form =
      this.state.name === '' ? (
        ''
      ) : (
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
          submitTitle={'Save Changes'}
        />
      );
    return (
      <div>
        <h3>Edit Recipe</h3>
        {form}
      </div>
    );
  }
}
