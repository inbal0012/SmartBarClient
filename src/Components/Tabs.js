import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import axios from 'axios';
import ServerUrl from '../typesAndConsts';

import List from './List';
import CocktailListItem from './ListItem/CocktailListItem';
import InventoryListItem from './ListItem/InventoryListItem';
import { Toolbar } from '@material-ui/core';
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
      filteredRecipes: [],
      filteredInventory: [],
      search: '',
    };
  }

  classes = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    search: {
      position: 'top right',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
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
        if (this.state.search === '') {
          this.setState({ filteredInventory: res.data });
        }
      })
      .catch(({ response }) => {
        if (response) {
          console.log(response.data);
        }
      });
    axios
      .get(ServerUrl + 'recipe')
      .then((res) => {
        this.setState({ Recipes: res.data });
        if (this.state.search === '') {
          this.setState({ filteredRecipes: res.data });
        }
      })
      .catch(({ response }) => {
        if (response) {
          console.log(response.data);
        }
      });
  }

  addNewCocktail() {
    this.props.history.push('/cocktails/add');
  }

  addNewIngredient() {
    this.props.history.push('/ingredients/add');
  }
  onChangeSearch(event) {
    if (this.state.value === 0) {
      this.filterRecipes(event);
    } else if (this.state.value === 1) {
      this.filterInventory(event);
    }
  }

  filterRecipes(event) {
    let filters = this.state.Recipes;
    if (!this.state.search.toLowerCase().match(/^ *$/)) {
      filters = filters.filter((recipe) => {
        return recipe.name.toLowerCase().includes(event.target.value);
      });
    }
    // console.log(filters);
    this.setState({ search: event.target.value, filteredRecipes: filters });
  }

  filterInventory(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    // console.log(this.state.filteredRecipes);
    return (
      <div className={this.classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Tabs value={this.state.value} onChange={this.handleChange}>
              <Tab label='Cocktails' {...a11yProps(0)} />
              <Tab label='Inventory' {...a11yProps(1)} />
            </Tabs>
            <div className={this.classes.search}>
              <div className={this.classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: this.classes.inputRoot,
                  input: this.classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={this.onChangeSearch.bind(this)}
              />
            </div>
          </Toolbar>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <List
            list={this.state.filteredRecipes}
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
