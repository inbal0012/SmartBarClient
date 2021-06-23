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

export default class InventoryListItem extends React.Component {
  constructor(props) {
    super(props);

    //func binding
    this.deleteRecipe = this.deleteIngredient.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);

    //Set initial state
    this.state = {
      name: props.name,
      ingredient: { ...props },
      open: false,
    };
  }

  deleteIngredient() {
    axios
      .delete(ServerUrl + 'inventory/' + this.state.ingredient._id)
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  closeDeleteDialog(value) {
    console.log(value.target.parentNode.id);
    this.setState({ open: false, selectedValue: value });
    if (value.target.parentNode.id === 'Yes') this.deleteIngredient();
  }

  openDeleteDialog() {
    this.setState({ open: true });
  }

  render() {
    return (
      <ListItem>
        <Box width='100%'>
          <Link to={'/inventory/' + this.state.ingredient._id}>
            <ListItemText
              primary={this.state.name}
              secondary={this.state.category}
            />
          </Link>
        </Box>
        <Link to={'/inventory/edit/' + this.state.ingredient._id} ml={10}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
        </Link>
        <ListItemIcon onClick={this.openDeleteDialog}>
          <DeleteIcon />
        </ListItemIcon>
        <DeleteDialog
          open={this.state.open}
          handleClose={this.closeDeleteDialog}
          name={this.state.ingredient.name}
        />
      </ListItem>
    );
  }
}
