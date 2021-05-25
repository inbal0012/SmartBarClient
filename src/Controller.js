import DbMuck from './DBMuck';
import EInventoryCategory from './Enums/EInventoryCategory';
import InventoryItem from './Modules/InventoryItemModules/InventoryItem';
import Recipe from './Modules/Recipe';
import RecipeManager from './Modules/RecipeManager';

class Controller2 {
  recipeList;
  DbMuck;

  constructor() {
    this.DbMuck = DbMuck;
    this.recipeList = [];
  }
  getRecipe(name) {
    return this.recipeList.find((recipe) => recipe.name === name);
  }
  addRecipe(name, ingredients, method, portion) {
    var newIngredients = this.extractIngredients(ingredients);
    this.recipeList.push(new Recipe(name, newIngredients, method, portion));
  }
  extractIngredients(ingredients) {
    var newIngredients = [];
    ingredients.forEach((element) => {
      var item = DbMuck.getItemByName(element[1]);
      if (item.getName() !== 'Unavailable') {
        newIngredients.push([element[0], item]);
      } else {
        var newItem = new InventoryItem(
          element[1],
          EInventoryCategory.Unsorted,
          0,
          0
        );
        DbMuck.addItem(newItem);
        newIngredients.push([element[0], newItem]);
      }
    });
    return newIngredients;
  }
  MakeCocktailByName(name) {
    console.log('make cocktail ' + name);
    var recipe = this.recipeList.find((recipe) => recipe.name === name);
    if (recipe !== undefined) return this.#MakeCocktail(recipe);
    else
      return {
        success: false,
        reason: name + ' not found',
      };
  }

  #MakeCocktail(recipe) {
    if (!recipe instanceof Recipe) return;
    if (!recipe.checkAvailability()) {
      return {
        success: false,
        reason: 'unable to make the ' + recipe.name + ' cocktail',
      };
    }
    recipe.ingredients.forEach((element) => {
      element[1].Use(element[0]);
    });
    return {
      success: true,
      reason: 'Enjoy your ' + recipe.name + ' cocktail',
    };
  }
}

class Controller {
  recipeManager;
  DbMuck;

  constructor() {
    this.DbMuck = DbMuck;
    this.recipeManager = RecipeManager;
  }
  
  addRecipe(name, ingredients, method, portion) {
    console.log('addRecipe ' + name);
    this.recipeManager.addRecipe(name, ingredients, method, portion);
  }
}

export default Controller;
