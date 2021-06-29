import { Component } from 'react';

import axios from 'axios';
import ServerUrl from '../../typesAndConsts';
import IngredientForm from './IngredientForm';
import BooleanInventoryItem from '../../common/src/Model/InventoryModel/BooleanInventoryItem';
import { Bottle } from '../../common/src/Model/InventoryModel/Bottle';

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
    this.closeErrorDialog = this.closeErrorDialog.bind(this);

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
    if (event.target.value === '' || event.target.value === undefined) {
      this.setState({
        nameError: true,
        nameHelperText: 'Evert ingredient MUST have a name',
      });
    } else {
      this.setState({ nameError: false });
    }
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
    this.validate(
      'alcoholPercentage',
      'Alcohol Percentage',
      Number(event.target.value)
    );
    this.setState({
      alcoholPercentage: event.target.value,
    });
  }

  onChangeRemaining(event) {
    this.validate('remaining', 'Remaining', Number(event.target.value));
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
    this.validate(
      'minRequired',
      'Minimum Required',
      Number(event.target.value)
    );

    this.setState({
      minRequired: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    let isOK = true;
    let validation;
    if (this.state.name === '' || this.state.name === undefined) {
      this.setState({
        nameError: true,
        nameHelperText: 'Evert ingredient MUST have a name',
      });
    }
    if (Bottle.isAAlcoholCategory(this.state.category)) {
      validation = this.validate(
        'alcoholPercentage',
        'Alcohol Percentage',
        Number(this.state.alcoholPercentage)
      );
      isOK = isOK && validation;
    }
    if (!BooleanInventoryItem.isABooleanCategory(this.state.category)) {
      //remaining
      validation = this.validate(
        'remaining',
        'Remaining',
        Number(this.state.remaining)
      );
      isOK = isOK && validation;
      //minRequired
      validation = this.validate(
        'minRequired',
        'Minimum Required',
        Number(this.state.minRequired)
      );
      isOK = isOK && validation;
    }

    if (!isOK) return;

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
        else {
          this.setState({
            openErrorDialog: true,
            ErrorDialogTitle: "Server problems. Can't update ingredient",
            ErrorDialogContent: res.data.result.reason,
          });
        }
      })
      .catch(({ response }) => {
        if (response) {
          console.log(response.data);

          // let errorList = result.reason.map((error) => <p>{error}</p>);
          this.setState({
            openErrorDialog: true,
            ErrorDialogTitle: "Server problems. Can't update ingredient",
            ErrorDialogContent: response.data.message,
          });
        }
      });
  }

  closeErrorDialog() {
    this.setState({ openErrorDialog: false });
  }

  validate(param, displayName, newValue) {
    let validation = this.validatePositiveAndNumber(
      displayName,
      Number(newValue)
    );
    let error = param + 'Error';
    if (!validation.success) {
      let helperText = param + 'HelperText';
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
        <h3>Edit Ingredient</h3>
        <IngredientForm
          onSubmit={this.onSubmit}
          submitTitle={'Save Changes'}
          name={this.state.name}
          onChangeName={this.onChangeName}
          nameError={this.state.nameError}
          nameHelperText={this.state.nameHelperText}
          category={this.state.category}
          onChangeCategory={this.onChangeCategory}
          categoryError={this.state.categoryError}
          categoryHelperText={this.state.categoryHelperText}
          alcoholPercentage={this.state.alcoholPercentage}
          onChangeAlcoholPercentage={this.onChangeAlcoholPercentage}
          alcoholPercentageError={this.state.alcoholPercentageError}
          alcoholPercentageHelperText={this.state.alcoholPercentageHelperText}
          IsAvailable={this.state.isAvailable}
          onChangeIsAvailable={this.onChangeIsAvailable}
          remaining={this.state.remaining}
          onChangeRemaining={this.onChangeRemaining}
          remainingError={this.state.remainingError}
          remainingHelperText={this.state.remainingHelperText}
          minRequired={this.state.minRequired}
          onChangeMinRequired={this.onChangeMinRequired}
          minRequiredError={this.state.minRequiredError}
          minRequiredHelperText={this.state.minRequiredHelperText}
          openErrorDialog={this.state.openErrorDialog}
          closeErrorDialog={this.closeErrorDialog}
          ErrorDialogTitle={this.state.ErrorDialogTitle}
          ErrorDialogContent={this.state.ErrorDialogContent}
        />
      </div>
    );
  }
}
