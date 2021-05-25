import DbMuck from '../DBMuck';
import EInventoryCategory from '../Enums/EInventoryCategory';
import EInventoryStatus from '../Enums/EInventoryStatus';
import BottleBuilder, { Bottle } from './InventoryItemModules/Bottle';
import FruitVegetable from './InventoryItemModules/FruitVegetable';
import InventoryItem, {
  NullInventoryItem,
} from './InventoryItemModules/InventoryItem';
import React from 'react';

class InventoryManager {
  inventory;

  constructor() {
    //this.inventory = [];
    this.fetchData();
  }
  //#region Database
  connectDatabase() {
    // TODO
  }

  fetchData() {
    this.inventory = DbMuck.inventory;
  }

  updateDatabase() {
    // TODO
  }
  //#endregion database

  getIngredient(name) {
    var result = this.inventory.find((item) => item.name === name);
    if (result === undefined) {
      return new NullInventoryItem();
    } else return result;
  }

  checkIfIsCategory(category) {
    return (
      Object.values(EInventoryCategory).includes(category) ||
      Object.values(EInventoryCategory.BottleCategory).includes(category) ||
      Object.values(EInventoryCategory.BottleCategory.AlcoholCategory).includes(
        category
      )
    );
  }

  updateIngredient(ingredientName, ingredientParam, newValue) {
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
          ingredient.Use(newValue);
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
    name,
    category,
    remaining,
    minRequired,
    { alcoholPercentage } = {}
  ) {
    if (!this.checkIfIsCategory(category))
      return { success: false, reason: 'please select a valid category' };
    if (this.inventory.find((item) => item.name === name)) {
      return { success: false, reason: name + ' already exist' };
    }
    var newIngredient;
    if (Bottle.isABottleCategory(category)) {
      newIngredient = new BottleBuilder(name, category, remaining, minRequired)
        .alcoholPercentage(alcoholPercentage)
        .build();
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
    return (
      <div>
        <h3>Inventory</h3>
        <ul>
          {this.inventory.map((item) => (
            <li>{item.toString()}</li>
          ))}
        </ul>
      </div>
    );
  }

  filterByCategory(targetCategory) {
    return this.inventory.filter((item) => item.category === targetCategory);
  }
}

export default InventoryManager;
