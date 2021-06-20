import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function InventoryListItem(props) {
  return (
    <ListItem button>
      <ListItemText primary={props.name} secondary={props.category} />
    </ListItem>
  );
}
