import DbMuck from '../DBMuck';
import EInventoryCategory from '../Enums/EInventoryCategory';
import BottleBuilder, { Bottle } from './InventoryItemModules/Bottle';
import FruitVegetable from './InventoryItemModules/FruitVegetable';
import InventoryItem, {
  NullInventoryItem,
} from './InventoryItemModules/InventoryItem';
import AbstractInventoryItem from './InventoryItemModules/AbstractInventoryItem';

class InventoryManager {
  private static instance: InventoryManager;
  inventory: AbstractInventoryItem[] = [];

  private constructor() {
    //this.inventory = [];
    this.fetchData();
  }

  public static getInstance(): InventoryManager {
    if (!InventoryManager.instance) {
      InventoryManager.instance = new InventoryManager();
    }

    return InventoryManager.instance;
  }

  //#region Database
  connectDatabase() {
    // TODO
  }

  fetchData() {
    this.inventory = DbMuck.getInstance().inventory;
  }

  updateDatabase() {
    // TODO
  }
  //#endregion database

  getIngredient(name: string) {
    var result = this.inventory.find((item) => item.name === name);
    if (result === undefined) {
      return new NullInventoryItem();
    } else return result;
  }

  checkIfIsCategory(category: string) {
    return (
      Object.values(EInventoryCategory).includes(category) ||
      Object.values(EInventoryCategory.BottleCategory).includes(category) ||
      Object.values(EInventoryCategory.BottleCategory.AlcoholCategory).includes(
        category
      )
    );
  }

  updateIngredient(ingredientName: string, ingredientParam: string, newValue: any) {
    var ingredient = this.inventory.find(
      (item) => item.name === ingredientName
    );
    if (ingredient === undefined)
      return { success: false, reason: ingredientName + " doesn't exist" };
    switch (ingredientParam) {
      case 'name':
        return { success: false, reason: "You can't change the name" };
      case 'category':
        if (!this.checkIfIsCategory(newValue))
          return { success: false, reason: 'please select a valid category' };
        else {
          ingredient.category = newValue;
          return {
            success: true,
            reason: ingredientName + "'s category changed to " + newValue,
          };
        }
      case 'remaining':
        if (newValue > ingredient.remaining)
          return {
            success: false,
            reason:
              "there's only " +
              ingredient.remaining +
              "left. you can't use " +
              newValue,
          };
        else {
          ingredient.use(newValue);
          return {
            success: true,
            reason: ingredientName + 'used',
          };
        }

      default:
        return {
          success: false,
          reason:
            ingredientName + " doesn't have " + ingredientParam + 'parameter',
        };
    }
  }

  addIngredient(
    name: string,
    category: string,
    remaining: number,
    minRequired: number,
    alcoholPercentage: number = 0
  ) {
    if (!this.checkIfIsCategory(category))
      return { success: false, reason: 'please select a valid category' };
    if (this.inventory.find((item) => item.name === name)) {
      return { success: false, reason: name + ' already exist' };
    }
    var newIngredient;
    if (Bottle.isABottleCategory(category)) {
      var builder = new BottleBuilder(name, category, remaining, minRequired);
      if (Bottle.isAAlcoholCategory(category))
        builder.alcoholPercentage(alcoholPercentage);
      newIngredient = builder.build();
    } else if (
      category === EInventoryCategory.Fruits ||
      category === EInventoryCategory.Vegetables
    ) {
      newIngredient = new FruitVegetable(
        name,
        category,
        remaining,
        minRequired
      );
    } else {
      newIngredient = new InventoryItem(name, category, remaining, minRequired);
    }
    if (newIngredient !== undefined) {
      this.inventory.push(newIngredient);
      this.inventory.sort(function (a, b) {
        if (a.getName() < b.getName()) return -1;
        if (a.getName() > b.getName()) return 1;
        return 0;
      });
      this.updateDatabase();
      return { success: true, reason: name + ' was added successfully' };
    } else return { success: false, reason: 'Sorry, something want wrong' };
  }

  toString() {
    // return (
    //   <div>
    //   <h3>Inventory < /h3>
    //   < ul >
    //   {
    //     this.inventory.map((item) => (
    //       <li>{ item.toString() } < /li>
    //     ))
    //   }
    //   < /ul>
    //   < /div>
    // );
    return "";
  }

  toJson() {
    return JSON.stringify(this);
  }

  filterByCategory(targetCategory: string) {
    return this.inventory.filter((item) => item.category === targetCategory);
  }
}

export default InventoryManager;
