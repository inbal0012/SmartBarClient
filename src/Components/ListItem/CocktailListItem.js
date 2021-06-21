import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';

import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import ServerUrl from '../../typesAndConsts';

export default class CocktailListItem extends React.Component {
  constructor(props) {
    super(props);
    //func binding

    //Set initial state
    this.state = {
      recipe: { ...props },
      ingredientList: [],
      spacing: 8,
    };
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (JSON.stringify(this.state) === JSON.stringify(nextState)) return false;
  //   else return true;
  // }

  getDataFromServer() {
    let ingList = [];
    for (let indx in this.state.recipe.ingredients) {
      const ing = this.state.recipe.ingredients[indx];
      axios
        .get(ServerUrl + 'inventory/' + ing.productId)
        .then((res) => {
          ingList.push(res.data.name);
          this.setState({
            ingredientList: [...this.state.ingredientList, res.data.name],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <ListItem>
        <Link to={'/cocktail/' + this.state.recipe._id}>
          <ListItemText
            primary={this.state.recipe.name}
            secondary={this.state.ingredientList.join(', ')}
          />
        </Link>

        <Link to={'/cocktail/edit/' + this.state.recipe._id} ml={10}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
        </Link>
      </ListItem>
    );
  }
}
