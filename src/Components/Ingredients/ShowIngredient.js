import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Bottle } from '../../common/src/Model/InventoryModel/Bottle';
import BooleanInventoryItem from '../../common/src/Model/InventoryModel/BooleanInventoryItem';

import axios from 'axios';
import ServerUrl from '../../typesAndConsts';
import EInventoryStatus from '../../common/src/Enums/EInventoryStatus';
export default class ShowIngredient extends Component {
  constructor(props) {
    super(props);
    //func binding

    //Set initial state
    this.state = {
      ingredientID: this.props.match.params.id,
      name: '',
      category: 'Unavailable',
      alcoholPercentage: 0,
      isAvailable: true,
      remaining: '',
      minRequired: '',
      status: EInventoryStatus.Ok,
      needStatusUpdate: false,
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
          status: res.data.status,
          needStatusUpdate: res.data.needStatusUpdate,
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

  render() {
    let alcoholPercentageSection = Bottle.isAAlcoholCategory(
      this.state.category
    ) ? (
      <React.Fragment>
        <Divider className={this.classes.divider} />
        <p>{this.state.alcoholPercentage} %</p>
      </React.Fragment>
    ) : (
      ''
    );

    let remainingSection = BooleanInventoryItem.isABooleanCategory(
      this.state.category
    ) ? (
      this.state.needStatusUpdate ? (
        <p
          style={{
            color: 'red',
            fontSize: 'large',
          }}
        >
          Need Status Update!
        </p>
      ) : (
        ''
      )
    ) : (
      <React.Fragment>
        <p>
          {this.state.remaining}{' '}
          {Bottle.isABottleCategory(this.state.category) ? 'ml' : ''} left
        </p>
        <Divider className={this.classes.divider} />
        <p>Min Required: {this.state.minRequired}</p>
      </React.Fragment>
    );

    return (
      <form className={this.classes.root}>
        <h1>{this.state.name}</h1>
        <Divider className={this.classes.divider} />
        <p>{this.state.category}</p>
        {alcoholPercentageSection}
        <Divider className={this.classes.divider} />
        {remainingSection}
        <Divider className={this.classes.divider} />
        <p>Status: {EInventoryStatus[this.state.status]}</p>
      </form>
    );
  }
}
