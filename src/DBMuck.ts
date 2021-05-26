import EInventoryCategory from './Enums/EInventoryCategory';
import AbstractInventoryItem from './Modules/InventoryItemModules/AbstractInventoryItem';
import BottleBuilder from './Modules/InventoryItemModules/Bottle';
import FruitVegetable from './Modules/InventoryItemModules/FruitVegetable';
import { NullInventoryItem } from './Modules/InventoryItemModules/InventoryItem';
import Recipe from './Modules/Recipe';

class DBMuck {
  private static instance: DBMuck;
  inventory: AbstractInventoryItem[] = [];
  recipeList: Recipe[] = [];

  private constructor() {
      this.initInventory();
  }

  public static getInstance(): DBMuck {
    if (!DBMuck.instance) {
      DBMuck.instance = new DBMuck();
    }

    return DBMuck.instance;
  }

  //#region Ingredients Inventory
  initInventory() {
    this.inventory = [];
    try {
      this.addItem(
        new BottleBuilder(
          'Kraken',
          EInventoryCategory.BottleCategory.AlcoholCategory.Rum,
          200,
          30
        )
          .alcoholPercentage(40)
          .build()
      );
      this.addItem(
        new BottleBuilder(
          'Milk',
          EInventoryCategory.BottleCategory.Dairy,
          30,
          50
        ).build()
      );
      this.addItem(
        new BottleBuilder(
          'Coke',
          EInventoryCategory.BottleCategory.Beverage,
          100,
          50
        ).build()
      );
      this.addItem(
        new FruitVegetable('Apple', EInventoryCategory.Fruits, 5, 1)
      );
    } catch (error) {
      console.log(error);
    }
  }
  getIngredientByName(name: string) {
    var ingredient = this.inventory.find((item) => item.getName() === name);
    if (ingredient === undefined) {
      ingredient = this.inventory.find((item) => item.getCategory() === name);
      if (ingredient === undefined) ingredient = new NullInventoryItem();
    }
    return ingredient;
  }
  addItem(item: AbstractInventoryItem) {
    this.inventory.push(item);
    this.inventory.sort(function (a, b) {
      if (a.getName() < b.getName()) return -1;
      if (a.getName() > b.getName()) return 1;
      return 0;
    });
  }
  //#endregion
  //#region  Recipes
  //#endregion Recipes
}

export default DBMuck;
