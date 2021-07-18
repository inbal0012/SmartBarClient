import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  absolute: {
    position: 'fixed',
    top: theme.spacing(4),
    right: theme.spacing(3),
  },
}));

export default function MyList(props) {
  const classes = useStyles();
  const { ItemType } = props;
  if (props.list.length === 0) {
    return (
      <div className={classes.root}>
        <List></List>
      </div>
    );
  }
  console.log(props);
  return (
    <div className={classes.root}>
      <Tooltip title='Add' aria-label='add' placement='bottom-end'>
        <Fab
          color='secondary'
          className={classes.absolute}
          onClick={props.fabOnClick}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <List>
        {props.list.map((currItem, index) => {
          return <ItemType {...currItem} key={index} />;
        })}
      </List>
    </div>
  );
}
