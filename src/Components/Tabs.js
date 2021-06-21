import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import axios from 'axios';
import ServerUrl from '../typesAndConsts';

import List from './List';
import CocktailListItem from './ListItem/CocktailListItem';
import InventoryListItem from './ListItem/InventoryListItem';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default class SimpleTabs extends React.Component {
  constructor(props) {
    super(props);
    //func binding
    this.handleChange = this.handleChange.bind(this);
    this.addNewCocktail = this.addNewCocktail.bind(this);
    this.addNewIngredient = this.addNewIngredient.bind(this);

    //Set initial state
    this.state = {
      value: 0,
      Recipes: [],
      Inventory: [],
    };
  }

  classes = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  componentDidUpdate(prevProps, prevState) {
    this.getDataFromServer();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) return false;
    else return true;
  }

  getDataFromServer() {
    axios
      .get(ServerUrl + 'inventory')
      .then((res) => {
        this.setState({ Inventory: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(ServerUrl + 'recipe')
      .then((res) => {
        this.setState({ Recipes: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCocktail() {
    console.log('cocktails fab clicked');
    this.props.history.push('/cocktails/add');
  }

  addNewIngredient() {
    console.log('ingredient fab clicked');
  }

  render() {
    return (
      <div className={this.classes.root}>
        <AppBar position='static'>
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label='Cocktails' {...a11yProps(0)} />
            <Tab label='Inventory' {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <List
            list={this.state.Recipes}
            ItemType={CocktailListItem}
            fabOnClick={this.addNewCocktail}
          />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <List
            list={this.state.Inventory}
            ItemType={InventoryListItem}
            fabOnClick={this.addNewIngredient}
          />
        </TabPanel>
      </div>
    );
  }
}
