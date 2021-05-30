import React from 'react';
import EInventoryCategory from './common/src/Enums/EInventoryCategory';
import Controller from './Controller';
import RecipeManager from './RecipeManager';
const App = () => {
  var con = new Controller();
  //con.addRecipe('Cuba Libra',[[30, 'Rum'],[90, 'Coke'],[20, 'Tequila'],],new Array('combine in a tall glass'),1);
  initRecipeList();

  return (
    <div>
      <h1>Hello World</h1>
      <p>{con.recipeManager.recipeList[0].toJson()}</p>
      <p>
        {
          con.inventoryManager.addIngredient(
            'Captain Morgan',
            EInventoryCategory.BottleCategory.AlcoholCategory.Rum,
            400,
            30,
            { alcoholPercentage: 40 }
          ).reason
        }
      </p>
      <p>
        {
          con.inventoryManager.addIngredient(
            'Lemon',
            EInventoryCategory.Fruits,
            5,
            1
          ).reason
        }
      </p>
      <p>
        {
          con.inventoryManager.updateIngredient(
            'Tequila',
            'category',
            EInventoryCategory.BottleCategory.AlcoholCategory.Tequila
          ).reason
        }
      </p>

      <p>{con.makeCocktail('Cuba Libra').reason}</p>
      <p>{con.checkRecipeAvailability('Old Fashioned').reason}</p>
      <p>{con.updateIngredient('Apple', 'minRequired', -4).reason}</p>
    </div>
  );
};

const initRecipeList = () => {
  //this.recipeList.push(this.addRecipe('name',[[60, 'ingredient'],[30, 'ingredient'],[30, 'ingredient'],],['method'],1));
  var recipeManager = RecipeManager.getInstance();
  recipeManager.addRecipe(
    'Cuba Libra',
    [
      [30, 'Rum'],
      [90, 'Coke'],
    ],
    ['combine in a tall glass'],
    1
  );
  recipeManager.addRecipe(
    'Old Fashioned',
    [
      [60, 'Whiskey'],
      [2, 'Angostura bitters'],
      [4.5, 'Sugar'],
    ],
    [
      'Put sugar in glass. Cover it with dashes of bitters. Add whiskey and stir until sugar dissolves. Add ice, stir again, and serve.',
    ],
    1
  );
  recipeManager.addRecipe(
    'Margarita',
    [
      [60, 'Tequila'],
      [30, 'Cointreau'],
      [30, 'Lime Juice'],
    ],
    [
      'Since this recipe includes fresh juice, it should be shaken. Serve over ice in a glass with a salted rim.',
    ],
    1
  );
  recipeManager.addRecipe(
    'Cosmopolitan',
    [
      [45, 'Citrus Vodka'],
      [30, 'Cointreau'],
      [15, 'Lime Juice'],
      [12.5, 'Cranberry Juice'],
    ],
    [
      'Build all ingredients in a shaker tine with ice and shake. Strain into a martini glass and garnish with lime wheel or zest.',
    ],
    1
  );
  recipeManager.addRecipe(
    'Negroni',
    [
      [30, 'Gin'],
      [30, 'Campari'],
      [30, 'Sweet Vermouth'],
    ],
    ['Stir ingredients with ice.'],
    1
  );
  recipeManager.addRecipe(
    'Martini',
    [
      [90, 'Gin'],
      [15, 'Dry Vermouth'],
    ],
    [
      'Stir ingredients in a mixing glass with ice. Strain into chilled martini glass. Squeeze oil from lemon peel into the glass or garnish with olive.',
    ],
    1
  );
  recipeManager.addRecipe(
    'Mojito',
    [
      [3, 'Mint Leaves'],
      [60, 'Rum'],
      [22.5, 'Lime Juice'],
      [15, 'Simple Syrup'],
    ],
    [
      'Muddle mint into a shaker tin, then add ice and all other ingredients. Shake to chill and strain into a highball glass with ice. Top with club soda if desired and garnish with mint.',
    ],
    1
  );
  recipeManager.addRecipe(
    'Manhattan',
    [
      [60, 'Whiskey'],
      [30, 'Sweet Vermouth'],
      [30, 'Angostura bitters'],
    ],
    [
      'Stir ingredients in a mixing glass with ice. Strain into chilled martini glass or cocktail coupe.',
    ],
    1
  );
};
export default App;
