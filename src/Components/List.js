import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

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
  if (props.list.length === 0) {
    return (
      <div className={classes.root}>
        <List></List>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <List>
        {props.list.map((currItem, index) => {
          return <ItemType {...currItem} key={index} />;
        })}
      </List>
    </div>
  );
}
