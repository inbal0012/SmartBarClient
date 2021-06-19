import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CocktailListItem from './CocktailListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MyList(props) {
  const classes = useStyles();
  const { ItemType } = props;
  console.log(props.list);
  return (
    <div className={classes.root}>
      <List>
        {props.list.map((curritem) => (
          <ItemType {...curritem} />
        ))}
      </List>
    </div>
  );
}
