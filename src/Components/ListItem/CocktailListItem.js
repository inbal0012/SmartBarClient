import { Box } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from '../DeleteDialog';

import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import ServerUrl from '../../typesAndConsts';

export default class CocktailListItem extends React.Component {
  constructor(props) {
    super(props);
    //func binding
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);

    //Set initial state
    this.state = {
      recipe: { ...props },
      ingredientList: [],
      openDeleteDialog: false,
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

  deleteRecipe() {
    axios
      .delete(ServerUrl + 'recipe/' + this.state.recipe._id)
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  closeDeleteDialog(value) {
    this.setState({ openDeleteDialog: false });
    if (value.target.parentNode.id === 'Yes') this.deleteRecipe();
  }

  openDeleteDialog() {
    this.setState({ openDeleteDialog: true });
  }

  render() {
    return (
      <ListItem>
        <Box width='100%'>
          <Link to={'/cocktail/' + this.state.recipe._id}>
            <ListItemText
              primary={this.state.recipe.name}
              secondary={this.state.ingredientList.join(', ')}
            />
          </Link>
        </Box>
        <Link to={'/cocktail/edit/' + this.state.recipe._id} ml={10}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
        </Link>
        <ListItemIcon onClick={this.openDeleteDialog}>
          <DeleteIcon />
        </ListItemIcon>
        <DeleteDialog
          open={this.state.openDeleteDialog}
          handleClose={this.closeDeleteDialog}
          name={this.state.recipe.name}
        />
      </ListItem>
    );
  }
}
