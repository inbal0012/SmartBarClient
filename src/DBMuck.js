import EInventoryCategory from './Enums/EInventoryCategory';
import BottleBuilder from './Modules/InventoryItemModules/Bottle';
import FruitVegetable from './Modules/InventoryItemModules/FruitVegetable';
import { NullInventoryItem } from './Modules/InventoryItemModules/InventoryItem';
import Recipe from './Modules/Recipe';

class DBMuck {
  inventory;
  recipeList;

  constructor() {
    if (DBMuck.instance == null) {
      this.initInventory();
      DBMuck.instance = this;
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
  getItemByName(name) {
    var item = this.inventory.find((item) => item.getName() === name);
    if (item === undefined) {
      item = this.inventory.find((item) => item.getCategory() === name);
      if (item === undefined) item = new NullInventoryItem();
    }
    return item;
  }
  addItem(item) {
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

const DbMuck = new DBMuck();
Object.freeze(DbMuck);
export default DbMuck;
