import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import List from './List';
import CocktailListItem from './CocktailListItem';
import InventoryListItem from './InventoryListItem';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Recipes = [
    {
      name: 'Cuba Libra',
      ingredients: [
        [30, 'Rum'],
        [90, 'Coke'],
      ],
      method: ['combine in a tall glass'],
      portion: 1,
    },
    {
      name: 'Old Fashioned',
      ingredients: [
        [60, 'Whiskey'],
        [2, 'Angostura bitters'],
        [4.5, 'Sugar'],
      ],
      method: [
        'Put sugar in glass. Cover it with dashes of bitters. Add whiskey and stir until sugar dissolves. Add ice, stir again, and serve.',
      ],
      portion: 1,
    },
    {
      name: 'Margarita',
      ingredients: [
        [60, 'Tequila'],
        [30, 'Cointreau'],
        [30, 'Lime Juice'],
      ],
      method: [
        'Since this recipe includes fresh juice, it should be shaken. Serve over ice in a glass with a salted rim.',
      ],
      portion: 1,
    },
    {
      name: 'Cosmopolitan',
      ingredients: [
        [45, 'Citrus Vodka'],
        [30, 'Cointreau'],
        [15, 'Lime Juice'],
        [12.5, 'Cranberry Juice'],
      ],
      method: [
        'Build all ingredients in a shaker tine with ice and shake. Strain into a martini glass and garnish with lime wheel or zest.',
      ],
      portion: 1,
    },
    {
      name: 'Negroni',
      ingredients: [
        [30, 'Gin'],
        [30, 'Campari'],
        [30, 'Sweet Vermouth'],
      ],
      method: ['Stir ingredients with ice.'],
      portion: 1,
    },
    {
      name: 'Martini',
      ingredients: [
        [90, 'Gin'],
        [15, 'Dry Vermouth'],
      ],
      method: [
        'Stir ingredients in a mixing glass with ice. Strain into chilled martini glass. Squeeze oil from lemon peel into the glass or garnish with olive.',
      ],
      portion: 1,
    },
    {
      name: 'Mojito',
      ingredients: [
        [3, 'Mint Leaves'],
        [60, 'Rum'],
        [22.5, 'Lime Juice'],
        [15, 'Simple Syrup'],
      ],
      method: [
        'Muddle mint into a shaker tin, then add ice and all other ingredients. Shake to chill and strain into a highball glass with ice. Top with club soda if desired and garnish with mint.',
      ],
      portion: 1,
    },
    {
      name: 'Manhattan',
      ingredients: [
        [60, 'Whiskey'],
        [30, 'Sweet Vermouth'],
        [30, 'Angostura bitters'],
      ],
      method: [
        'Stir ingredients in a mixing glass with ice. Strain into chilled martini glass or cocktail coupe.',
      ],
      portion: 1,
    },
  ];

  const Inventory = [
    {
      name: 'Kraken',
      category: 'Rum',
      remaining: 200,
      minRequired: 30,
      alcoholPercentage: 40,
    },
    { name: 'Milk', category: 'Dairy', remaining: 30, minRequired: 50 },
    { name: 'Coke', category: 'Beverage', remaining: 100, minRequired: 50 },
    { name: 'Apple', category: 'Fruits', remaining: 5, minRequired: 1 },
    {
      name: 'Angostura bitters',
      category: 'Bitter',
      remaining: 100,
      minRequired: 10,
      alcoholPercentage: 44.7,
    },
    {
      name: 'Campari',
      category: 'Liquor',
      remaining: 500,
      minRequired: 30,
      alcoholPercentage: 25,
    },
    {
      name: 'Citrus Vodka',
      category: 'Vodka',
      remaining: 300,
      minRequired: 30,
      alcoholPercentage: 37.5,
    },
    {
      name: 'Cointreau',
      category: 'Liquor',
      remaining: 500,
      minRequired: 30,
      alcoholPercentage: 40,
    },
    {
      name: 'Cranberry Juice',
      category: 'Juice',
      remaining: 0,
      minRequired: 50,
    },
    {
      name: 'Dry Vermouth',
      category: 'Vermouth',
      remaining: 700,
      minRequired: 15,
      alcoholPercentage: 18,
    },
    {
      name: 'Hendricks',
      category: 'Gin',
      remaining: 400,
      minRequired: 30,
      alcoholPercentage: 44,
    },
    { name: 'Lime Juice', category: 'Juice', remaining: 0, minRequired: 50 },
    {
      name: 'Sweet Vermouth',
      category: 'Vermouth',
      remaining: 700,
      minRequired: 15,
      alcoholPercentage: 16,
    },
    {
      name: 'Jose Cuervo ',
      category: 'Tequila',
      remaining: 60,
      minRequired: 30,
      alcoholPercentage: 40,
    },
    {
      name: 'Jack Daniels',
      category: 'Whiskey',
      remaining: 200,
      minRequired: 30,
      alcoholPercentage: 40,
    },
    { name: 'Mint Leaves', category: 'Herbs', remaining: true },
    { name: 'Simple Syrup', category: 'Syrup', remaining: 50, minRequired: 10 },
    { name: 'Sugar', category: 'Spices', remaining: true },
  ];

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Cocktails' {...a11yProps(0)} />
          <Tab label='Inventory' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List list={Recipes} ItemType={CocktailListItem} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List list={Inventory} ItemType={InventoryListItem} />
      </TabPanel>
    </div>
  );
}
