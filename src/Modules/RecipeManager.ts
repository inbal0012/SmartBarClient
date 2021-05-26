import DbMuck from '../DBMuck';
import EInventoryCategory from '../Enums/EInventoryCategory';
import AbstractInventoryItem from './InventoryItemModules/AbstractInventoryItem';
import InventoryItem from './InventoryItemModules/InventoryItem';
import Recipe from './Recipe';

class RecipeManager {
  private static instance: RecipeManager;
  recipeList: Recipe[];
  isDBRecipeUpdateRequired: boolean;

  private constructor() {
      this.recipeList = [];
      this.isDBRecipeUpdateRequired = false;
      RecipeManager.instance = this;
  }
  
  public static getInstance(): RecipeManager {
    if (!RecipeManager.instance) {
      RecipeManager.instance = new RecipeManager();
    }

    return RecipeManager.instance;
  }

  //#region Database
  connectDatabase() {
    // TODO
  }

  fetchData() {
    this.recipeList = DbMuck.getInstance().recipeList;
  }

  updateDatabase() {
    // TODO
  }
  //#endregion database


  getRecipe(name: string) {
    return this.recipeList.find((recipe) => recipe.name === name);
  }

  addRecipe(name: string, ingredients: [number, string][], method: string[], portion: number) {
    if (this.recipeList.find((rcp) => rcp.name === name)) return;
    var newIngredients = this.extractIngredients(ingredients);
    this.recipeList.push(new Recipe(name, newIngredients, method, portion));
    this.isDBRecipeUpdateRequired = true;
  }

  extractIngredients(ingredients: [number, string][]) {
    var newIngredients: [number, AbstractInventoryItem][] = [];
    ingredients.forEach((element) => {
      var item = DbMuck.getInstance().getIngredientByName(element[1]);
      if (item.getName() !== 'Unavailable') {
        newIngredients.push([element[0], item]);
      } else {
        var newItem = new InventoryItem(
          element[1],
          EInventoryCategory.Unsorted,
          0,
          0
        );
        DbMuck.getInstance().addItem(newItem);
        newIngredients.push([element[0], newItem]);
      }
    });
    return newIngredients;
  }

  MakeCocktailByName(name: string) {
    console.log('make cocktail ' + name);
    var recipe = this.recipeList.find((recipe) => recipe.name === name);
    if (recipe !== undefined) return this.MakeCocktail(recipe);
    else
      return {
        success: false,
        reason: name + ' not found',
      };
  }

  MakeCocktail(recipe: Recipe) {
    if (!recipe.checkAvailability()) {
      return {
        success: false,
        reason: 'unable to make the ' + recipe.name + ' cocktail',
      };
    }
    recipe.ingredients.forEach((element) => {
      element[1].use(element[0]);
    });
    return {
      success: true,
      reason: 'Enjoy your ' + recipe.name + ' cocktail',
    };
  }
}

export default RecipeManager;
