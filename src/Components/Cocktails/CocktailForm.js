import React, { Component } from 'react';
import { Button, List, makeStyles, TextField } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function CocktailForm(props) {
  console.log(props);

  const classes = useStyles();
  return (
    <form onSubmit={props.onSubmit} className={classes.root}>
      <FormGroup>
        <label>Name: </label>
        <TextField
          required
          id='Name'
          type='text'
          className='form-control'
          label='cocktail name'
          value={props.name}
          onChange={props.onChangeName}
        />
      </FormGroup>
      <FormGroup>
        <label>Ingredients: </label>
        <List>
          {
            //TODO add delete ing button
            props.ingredients.map((ing, index) => (
              <ListItem divider key={index}>
                {ing[0]} {ing[1]} {ing[2] ? '(optional)' : ''}
                {/* <Button onClick={this.deleteIngredient}>X</Button> */}
              </ListItem>
            ))
          }
        </List>

        <FormGroup row>
          <TextField
            id='amount'
            type='number'
            className='form-control'
            label='amount'
            value={props.newIngAmount}
            onChange={props.onChangeNewIngAmount}
          />
          <TextField
            id='ingName'
            type='text'
            className='form-control'
            label='ingredient name'
            value={props.newIngName}
            onChange={props.onChangeNewIngName}
          />
          <FormControlLabel
            control={
              <Checkbox
                name='checkedB'
                color='primary'
                checked={props.newIngIsOptional}
                onChange={props.onChangeNewIngIsOptional}
              />
            }
            label='Is Optional'
          />
          <Button variant='contained' onClick={props.newIngredientAdded}>
            Add Ingredient
          </Button>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <label>Method: </label>
        <List>
          {props.method.map((step) => (
            <ListItem>{step}</ListItem>
          ))}
        </List>

        <FormGroup row>
          <input
            id='newStep'
            type='text'
            className='form-control'
            placeholder='add step'
            value={props.newStep}
            onChange={props.onChangeNewStep}
          />
          <Button variant='contained' onClick={props.newStepAdded}>
            Add Step
          </Button>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <label>portion: </label>

        <TextField
          id='ingName'
          label='portion'
          type='number'
          className='form-control'
          value={props.portion}
          onChange={props.onChangePortion}
        />
      </FormGroup>

      <Divider />
      <div className='form-group'>
        <input type='Submit' value={props.submitTitle} className='btn btn-primary' />
      </div>
    </form>
  );
}

export default CocktailForm;
