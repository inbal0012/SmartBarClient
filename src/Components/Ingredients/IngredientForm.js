import React from 'react';
import EInventoryCategory from '../../common/src/Enums/EInventoryCategory';
import { Bottle } from '../../common/src/Model/InventoryModel/Bottle';
import BooleanInventoryItem from '../../common/src/Model/InventoryModel/BooleanInventoryItem';

import {
  Button,
  makeStyles,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    width: 'flex',
    marginLeft: 15,
    marginRight: 15,
    background: theme.palette.background.paper,
  },
  divider: {
    marginBottom: 15,
    marginTop: 15,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

let categories = {};
Object.entries(EInventoryCategory.BottleCategory).forEach(([key, value]) => {
  if (key !== 'AlcoholCategory')
    categories = { ...categories, [key]: { id: key, name: value } };
});
Object.entries(EInventoryCategory.BottleCategory.AlcoholCategory).forEach(
  ([key, value]) => {
    categories = { ...categories, [key]: { id: key, name: value } };
  }
);
Object.entries(EInventoryCategory).forEach(([key, value]) => {
  if (key === 'BottleCategory' || key === 'Unsorted' || key === 'Unavailable') {
  } else categories = { ...categories, [key]: { id: key, name: value } };
});

function IngredientForm(props) {
  const classes = useStyles();

  let alcoholPercentageSection = Bottle.isAAlcoholCategory(props.category) ? (
    <React.Fragment>
      <FormGroup>
        <Divider className={classes.divider} />
        <label>Alcohol Percentage: </label>
        <TextField
          required
          id='alcoholPercentage'
          type='number'
          className={classes.textField}
          placeholder='Alcohol Percentage'
          value={props.alcoholPercentage}
          onChange={props.onChangeAlcoholPercentage}
          error={props.alcoholPercentageError}
          helperText={
            props.alcoholPercentageError
              ? props.alcoholPercentageHelperText
              : ''
          }
        />
      </FormGroup>
    </React.Fragment>
  ) : (
    ''
  );

  let remainingSection = BooleanInventoryItem.isABooleanCategory(
    props.category
  ) ? (
    <FormControlLabel
      control={
        <Checkbox
          name='checkedB'
          color='primary'
          checked={props.IsAvailable}
          onChange={props.onChangeIsAvailable}
        />
      }
      label='Is Available'
    />
  ) : (
    <React.Fragment>
      <FormGroup>
        <label>Amount: </label>
        <TextField
          id='Amount'
          type='number'
          className={classes.textField}
          placeholder='Amount'
          value={props.remaining}
          onChange={props.onChangeRemaining}
          error={props.remainingError}
          helperText={props.remainingError ? props.remainingHelperText : ''}
        />
      </FormGroup>
      <Divider className={classes.divider} />
      <FormGroup>
        <label>Minimum Required</label>

        <TextField
          id='minRequired'
          placeholder='Minimum Required'
          type='number'
          className={classes.textField}
          value={props.minRequired}
          onChange={props.onChangeMinRequired}
          error={props.minRequiredError}
          helperText={props.minRequiredError ? props.minRequiredHelperText : ''}
        />
      </FormGroup>
    </React.Fragment>
  );
  return (
    <form onSubmit={props.onSubmit} className={classes.root}>
      <FormGroup>
        <label>Name: </label>
        <TextField
          required
          id='Name'
          type='text'
          className={classes.textField}
          placeholder='Ingredient Name'
          value={props.name}
          onChange={props.onChangeName}
          error={props.nameError}
          helperText={props.nameError ? props.nameHelperText : ''}
        />
      </FormGroup>
      <Divider className={classes.divider} />
      <FormGroup>
        <label>Category: </label>
        <FormControl
          className={classes.formControl}
          error={props.categoryError}
        >
          <Select
            id='demo-simple-select'
            value={props.category}
            onChange={props.onChangeCategory}
          >
            {Object.keys(categories).map((key, value) => {
              return (
                <MenuItem key={key} value={key}>
                  {categories[key].name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText id='my-helper-text'>
            {props.categoryHelperText}
          </FormHelperText>
        </FormControl>
      </FormGroup>
      {alcoholPercentageSection}
      <Divider className={classes.divider} />
      {remainingSection}
      <Divider className={classes.divider} />
      <FormGroup>
        <Button variant='contained' onClick={props.onSubmit} color='primary'>
          {props.submitTitle}
        </Button>
      </FormGroup>
      <Dialog
        open={props.openErrorDialog}
        onClose={props.closeErrorDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {props.ErrorDialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {props.ErrorDialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeErrorDialog} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default IngredientForm;
