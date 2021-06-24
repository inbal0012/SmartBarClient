import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddCocktail from './Components/Cocktails/AddCocktail';
import EditCocktail from './Components/Cocktails/EditCocktail';
import EnjoyYourCocktail from './Components/Cocktails/EnjoyYourCocktail';
import ShowCocktail from './Components/Cocktails/ShowCocktail';
import AddIngredient from './Components/Ingredients/AddIngredient';
import EditIngredient from './Components/Ingredients/EditIngredient';
import ShowIngredient from './Components/Ingredients/ShowIngredient';
import SimpleTabs from './Components/Tabs';

function App() {
  return (
    <Router>
      <div className='container'>
        <Route path='/' exact component={SimpleTabs} />

        <Route path='/cocktail/:id' exact component={ShowCocktail} />
        <Route path='/cocktail/edit/:id' exact component={EditCocktail} />
        <Route path='/cocktails/add' exact component={AddCocktail} />
        <Route
          path='/EnjoyYourCocktail/:id'
          exact
          component={EnjoyYourCocktail}
        />

        <Route path='/inventory/edit/:id' exact component={EditIngredient} />
        <Route path='/ingredients/add' exact component={AddIngredient} />
        <Route path='/inventory/:id' exact component={ShowIngredient} />
      </div>
    </Router>
  );
}

export default App;
