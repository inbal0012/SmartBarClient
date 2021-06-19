import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function InventoryListItem(props) {
  const ingToshow = () => {
    let ings = props.ingredients.map((ing) => ing[1]);
    console.log(ings);
    return ings.toString();
  };
  console.log(props);
  return (
    <ListItem button>
      <ListItemText primary={props.name} secondary={props.category} />
    </ListItem>
  );
}
