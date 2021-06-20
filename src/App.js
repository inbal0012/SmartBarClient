import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddCocktail from './Components/Cocktails/AddCocktail';
import EditCocktail from './Components/Cocktails/EditCocktail';
import ShowCocktail from './Components/Cocktails/ShowCocktail';
import SimpleTabs from './Components/Tabs';

function App() {
  return (
    <Router>
      <div className='container'>
        <Route path='/' exact component={SimpleTabs} />
        <Route path='/cocktail/:id' exact component={ShowCocktail} />
        <Route path='/cocktail/edit/:id' exact component={EditCocktail} />
        <Route path='/cocktails/add' exact component={AddCocktail} />
        {/* <Route path='/create' exact component={CreateTodo} /> */}
      </div>
    </Router>
  );
}

export default App;
