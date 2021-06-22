import { Box } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';

import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import ServerUrl from '../../typesAndConsts';

export default class InventoryListItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    //func binding
    this.deleteRecipe = this.deleteIngredient.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);

    //Set initial state
    this.state = {
      name: props.name,
      ingredient: { ...props },
      open: false,
    };
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
      </ListItem>
    );
  }
}
