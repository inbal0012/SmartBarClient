import React from 'react';
import { Button, List, makeStyles, TextField } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

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
}));

function CocktailForm(props) {
  const classes = useStyles();
  return (
    <form onSubmit={props.onSubmit} className={classes.root}>
      <FormGroup>
        <label>Name: </label>
        <TextField
          required
          id='Name'
          type='text'
          className={classes.textField}
          label='cocktail name'
          value={props.name}
          onChange={props.onChangeName}
        />
      </FormGroup>
      <Divider className={classes.divider} />
      <FormGroup>
        <label>Ingredients: </label>
        <List>
          {
            //TODO add delete ing button
            props.ingredients.map((ingredient, index) => {
              return (
                <ListItem divider key={index.toString()}>
                  <TextField
                    id='amount'
                    type='number'
                    className={classes.textField}
                    label='amount'
                    value={ingredient[0]}
                    onChange={(event) => props.updateIngredient(event, index)}
                  />
                  <TextField
                    id='ingName'
                    type='text'
                    className={classes.textField}
                    label='ingredient name'
                    value={ingredient[1]}
                    onChange={(event) => props.updateIngredient(event, index)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id='Optional'
                        name='checkedB'
                        color='primary'
                        checked={ingredient[2]}
                        onChange={(event) =>
                          props.updateIngredient(event, index)
                        }
                      />
                    }
                    label='Is Optional'
                  />
                  <Button
                    key={index}
                    color='primary'
                    variant='contained'
                    onClick={() => props.deleteIngredient(index)}
                  >
                    X
                  </Button>
                </ListItem>
              );
            })
          }
        </List>

        <FormGroup row>
          <TextField
            id='amount'
            type='number'
            className={classes.textField}
            label='amount'
            value={props.newIngAmount}
            onChange={props.onChangeNewIngAmount}
          />
          <TextField
            id='ingName'
            type='text'
            className={classes.textField}
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
          <Button
            variant='contained'
            onClick={props.newIngredientAdded}
            color='primary'
          >
            Add Ingredient
          </Button>
        </FormGroup>
      </FormGroup>
      <Divider className={classes.divider} />
      <FormGroup>
        <label>Method: </label>
        <List>
          {props.method.map((step, index) => (
            <ListItem>
              <TextField
                id='ingName'
                type='text'
                className={classes.textField}
                label='ingredient name'
                value={step}
                onChange={(event) => props.updateMethod(event, index)}
              />
              <Button
                key={index}
                color='primary'
                variant='contained'
                onClick={() => props.deleteStep(index)}
              >
                X
              </Button>
            </ListItem>
          ))}
        </List>

        <FormGroup row>
          <TextField
            id='newStep'
            type='text'
            className={classes.textField}
            label='add step'
            value={props.newStep}
            onChange={props.onChangeNewStep}
          />
          <Button
            variant='contained'
            onClick={props.newStepAdded}
            color='primary'
          >
            Add Step
          </Button>
        </FormGroup>
      </FormGroup>
      <Divider className={classes.divider} />
      <FormGroup>
        <label>Portion: </label>

        <TextField
          id='ingName'
          label='portion'
          type='number'
          className={classes.textField}
          value={props.portion}
          onChange={props.onChangePortion}
        />
      </FormGroup>
      <Divider className={classes.divider} />
      <FormGroup>
        <Button variant='contained' onClick={props.onSubmit} color='primary'>
          {props.submitTitle}
        </Button>
      </FormGroup>
    </form>
  );
}

export default CocktailForm;
