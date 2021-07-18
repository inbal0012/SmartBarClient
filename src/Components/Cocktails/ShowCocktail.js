import React, { Component } from 'react';
import axios from 'axios';
import ServerUrl from '../../typesAndConsts';
import {
  Button,
  List,
  makeStyles,
  ListItem,
  FormGroup,
  Divider,
} from '@material-ui/core';

export default class ShowCocktail extends Component {
  constructor(props) {
    super(props);

    //func binding
    this.makeCocktail = this.makeCocktail.bind(this);

    //Set initial state
    this.state = {
      cocktailID: this.props.match.params.id,
      ingredientsFullData: [],
      name: '',
      ingredients: [],
      method: [],
      portion: 1,
      isAvailable: false,
      availableReason: '',
    };
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    axios
      .get(ServerUrl + 'recipe/' + this.state.cocktailID)
      .then((res) => {
        let ingredientsStrList = res.data.ingredients.map((ing) => [
          ing[0],
          ing[1].name,
          ing[2],
        ]);
        this.setState({
          name: res.data.name,
          ingredients: ingredientsStrList,
          method: res.data.method,
          portion: res.data.portion,
          ingredientsFullData: res.data.ingredients,
        });
      })
      .catch(({ response }) => {
        if (response) {
          console.log(response.data);
        }
      });

    axios
      .get(ServerUrl + 'recipe/' + this.state.cocktailID + '/available')
      .then((res) => {
        console.log(res.data);
        this.setState({
          isAvailable: res.data.success,
          availableReason: res.data.reason,
        });
      })
      .catch(({ response }) => {
        if (response) {
          console.log(response.data);
        }
      });
  }

  makeCocktail() {
    axios
      .get(ServerUrl + 'recipe/' + this.state.cocktailID + '/make')
      .then((res) => {
        console.log(res.data);
        //TODO find a way to pass the data NOT in the url
        this.props.history.push({
          pathname: '/EnjoyYourCocktail/' + res.data,
          state: this.state,
        });
      })
      .catch(({ response }) => {
        if (response) {
          console.log(response.data);
        }
      });
  }

  classes = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background: theme.palette.divider,
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
    h4: {
      marginLeft: 15,
      marginRight: 15,
    },
  }));

  render() {
    return (
      <form className={this.classes.root}>
        <h1>{this.state.name}</h1>
        <Divider className={this.classes.divider} />
        <FormGroup>
          <h4 style={{ margin: 8 }}>Ingredients: </h4>
          <List>
            {
              this.state.ingredients.map((ing, index) => (
                <ListItem divider key={index}>
                  {ing[0]} {ing[1]} {ing[2] ? '(optional)' : ''}
                </ListItem>
              ))
            }
          </List>
        </FormGroup>
        <Divider className={this.classes.divider} />
        <FormGroup>
          <h4 style={{ margin: 8 }}>Method: </h4>
          <List>
            {this.state.method.map((step) => (
              <ListItem>{step}</ListItem>
            ))}
          </List>
        </FormGroup>
        <Divider className={this.classes.divider} />
        <FormGroup className={this.classes.divider}>
          <h4 style={{ margin: 8 }}>
            {this.state.portion} serving{this.state.portion > 1 ? 's' : ''}
          </h4>
        </FormGroup>
        <Divider className={this.classes.divider} />
        <FormGroup row>
          <Button
            variant='contained'
            onClick={this.makeCocktail}
            color='primary'
            disabled={this.state.isAvailable === 'notAvailable'}
          >
            Make the Cocktail
          </Button>
          <label style={{ margin: 8 }}>{this.state.availableReason}</label>
        </FormGroup>
      </form>
    );
  }
}
