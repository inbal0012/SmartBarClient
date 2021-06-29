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
    //#region New Ingredient
    this.newIngredientAdded = this.newIngredientAdded.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.updateIngredient = this.updateIngredient.bind(this);
    this.onChangeNewIngName = this.onChangeNewIngName.bind(this);
    this.onChangeNewIngAmount = this.onChangeNewIngAmount.bind(this);
    this.onChangeNewIngIsOptional = this.onChangeNewIngIsOptional.bind(this);
    //#endregion
    //#region Method
    this.onChangeNewStep = this.onChangeNewStep.bind(this);
    this.newStepAdded = this.newStepAdded.bind(this);
    this.updateMethod = this.updateMethod.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    //#endregion
    this.onChangePortion = this.onChangePortion.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.closeErrorDialog = this.closeErrorDialog.bind(this);

    //Set initial state
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

  onChangeName(event) {
    if (event.target.value === '' || event.target.value === undefined) {
      this.setState({
        nameError: true,
        nameHelperText: 'Evert recipe MUST have a name',
      });
    } else {
      this.setState({ nameError: false });
    }
    this.setState({
      name: event.target.value,
    });
  }
  // #region New Ingredient
  newIngredientAdded(event) {
    let validate = this.validate(
      'newIngAmount',
      'Amount',
      this.state.newIngAmount
    );
    if (this.state.newIngName === '') {
      validate = false;
      this.setState({
        newIngNameError: true,
        newIngNameHelperText: "Ingredient's name can't be empty",
      });
    }
    console.log(this.state.newIngName);
    if (!validate) {
      return;
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

  deleteIngredient(key) {
    let newIngredientList = this.state.ingredients;
    newIngredientList.splice(key, 1);
    this.setState({ ingredients: newIngredientList });
  }

  updateIngredient(event, key) {
    let newIngredientList = this.state.ingredients;
    switch (event.target.id) {
      case 'amount':
        newIngredientList[key][0] = event.target.value;
        if (event.target.value === '') {
          event.target.parentNode.className += ' Mui-error';
        }
        break;
      case 'ingName':
        newIngredientList[key][1] = event.target.value;
        if (event.target.value === '') {
          event.target.parentNode.className += ' Mui-error';
        }
        break;
      case 'Optional':
        newIngredientList[key][2] = !newIngredientList[key][2];
        break;
      default:
        break;
    }

    this.setState({ ingredients: newIngredientList });
  }

  onChangeNewIngAmount(event) {
    this.validate('newIngAmount', 'Amount', event.target.value);
    this.setState({
      newIngAmount: event.target.value,
    });
  }

  onChangeNewIngName(event) {
    if (event.target.value !== '') {
      this.setState({
        newIngNameError: false,
      });
    }
    this.setState({
      newIngName: event.target.value,
    });
  }

  onChangeNewIngIsOptional(event) {
    this.setState({
      newIngIsOptional: !this.state.newIngIsOptional,
    });
  }
  // #endregion New Ingredient
  // #region Method
  onChangeNewStep(event) {
    this.setState({
      newStep: event.target.value,
    });
  }

  newStepAdded(event) {
    if (this.state.newStep === '') {
      this.setState({
        newStepError: true,
        newStepHelperText: "Ingredient's name can't be empty",
      });
      return;
    }
    this.setState({
      method: [...this.state.method, this.state.newStep],
      newStep: '',
    });
  }

  updateMethod(event, key) {
    if (event.target.value === '') {
      event.target.parentNode.className += ' Mui-error';
    }
    let newMethodList = this.state.method;
    newMethodList[key] = event.target.value;
    this.setState({ method: newMethodList });
  }

  deleteStep(key) {
    let newMethodList = this.state.method;
    newMethodList.splice(key, 1);
    this.setState({ method: newMethodList });
  }
  // #endregion Method

  onChangePortion(event) {
    this.validate('portion', 'Portion', Number(event.target.value));
    this.setState({
      portion: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.onSubmitValidation()) {
      return;
    }

    const newRecipe = {
      name: this.state.name,
      ingredients: this.state.ingredients,
      method: this.state.method,
      portion: this.state.portion,
    };

    axios
      .post(ServerUrl + 'recipe/', newRecipe)
      .then((res) => {
        console.log(res.data);
        this.props.history.push('/cocktail/' + res.data._id);
        // this.setState({
        //   cocktail: { ...res.data },
        // });
      })
      .catch(({ response }) => {
        if (response) {
          console.log(response.data);
        }
      });
  }

  onSubmitValidation() {
    let result = { success: true, reason: [] };

    if (this.state.name === '' || this.state.name === undefined) {
      result.success = false;
      result.reason.push('Evert recipe MUST have a name');
    }
    if (this.state.ingredients.length === 0) {
      result.success = false;
      result.reason.push("Can't create a recipe with no ingredients.");
    } else {
      this.state.ingredients.forEach((ingredient, index) => {
        if (ingredient[0] === '' || ingredient[1] === '') {
          result.success = false;
          result.reason.push(
            'ingredient list at place ' +
              (index + 1) +
              ' has one or more empty fields. please fill the missing data or delete the item'
          );
        }
      });
    }
    if (this.state.method.length === 0) {
      result.success = false;
      result.reason.push('Please describe the preparation method.');
    } else {
      this.state.method.forEach((step, index) => {
        if (step === '') {
          result.success = false;
          result.reason.push(
            'method list at place ' +
              (index + 1) +
              ' is empty. please fill the missing data or delete the item'
          );
        }
      });
    }
    let validation = this.validatePositiveAndNumber(
      'Portion',
      Number(this.state.portion)
    );
    if (!validation.success) {
      result.success = false;
      result.reason.push(validation.reason);
    }
    console.log(result);
    if (!result.success) {
      let errorList = result.reason.map((error) => <p>{error}</p>);
      this.setState({
        openErrorDialog: true,
        ErrorDialogTitle:
          result.reason.length + " problems. Can't create recipe",
        ErrorDialogContent: errorList,
      });
      return false;
    }
    return true;
  }

  closeErrorDialog() {
    this.setState({ openErrorDialog: false });
  }

  validate(param, displayName, newValue) {
    console.log(newValue);
    let validation = this.validatePositiveAndNumber(
      displayName,
      Number(newValue)
    );
    let error = param + 'Error';
    if (!validation.success) {
      let helperText = param + 'HelperText';
      console.log({ error, helperText });
      this.setState({
        [error]: true,
        [helperText]: validation.reason,
      });
      return false;
    } else {
      this.setState({
        [error]: false,
      });
      return true;
    }
  }

  validatePositiveAndNumber(param, newValue) {
    if (typeof newValue !== 'number')
      return {
        success: false,
        reason: param + ' has to be a number',
      };

    if (newValue <= 0)
      return {
        success: false,
        reason: param + " can't be 0 or lower",
      };

    return {
      success: true,
      reason: '',
    };
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
          deleteIngredient={this.deleteIngredient}
          updateIngredient={this.updateIngredient}
          method={this.state.method}
          newStep={this.state.newStep}
          onChangeNewStep={this.onChangeNewStep}
          newStepAdded={this.newStepAdded}
          updateMethod={this.updateMethod}
          deleteStep={this.deleteStep}
          portion={this.state.portion}
          onChangePortion={this.onChangePortion}
          submitTitle={'Create Recipe'}
          nameError={this.state.nameError}
          nameHelperText={this.state.nameHelperText}
          newIngAmountError={this.state.newIngAmountError}
          newIngAmountHelperText={this.state.newIngAmountHelperText}
          newIngNameError={this.state.newIngNameError}
          newIngNameHelperText={this.state.newIngNameHelperText}
          newStepError={this.state.newStepError}
          newStepHelperText={this.state.newStepHelperText}
          portionError={this.state.portionError}
          portionHelperText={this.state.portionHelperText}
          openErrorDialog={this.state.openErrorDialog}
          closeErrorDialog={this.closeErrorDialog}
          ErrorDialogTitle={this.state.ErrorDialogTitle}
          ErrorDialogContent={this.state.ErrorDialogContent}
        />
      </div>
    );
  }
}
