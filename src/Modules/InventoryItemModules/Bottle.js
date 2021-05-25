import EInventoryCategory from '../../Enums/EInventoryCategory';
import EInventoryStatus from '../../Enums/EInventoryStatus';
import InventoryItem from './InventoryItem';
import React from 'react';
class Bottle extends InventoryItem {
  alcoholPercentage;
  minRequired;

  constructor(name, category, remaining, minRequired) {
    if (Bottle.isABottleCategory(category)) {
      super(name, category, remaining);
      //this.alcoholPercentage = alcoholPercentage;
      this.remaining = remaining;
      this.minRequired = minRequired;
      this.updateStatus();
    } else
      throw new Error(
        category +
          ' is not a Bottle type.\n please select a deferent type or change the category of ' +
          name
      );
  }
  getMinRequired() {
    return this.minRequired;
  }
  getAlcoholPercentage() {
    return this.alcoholPercentage;
  }
  updateStatus() {
    if (this.remaining > this.minRequired * 2)
      this.status = EInventoryStatus.Ok;
    else if (this.remaining > this.minRequired)
      this.status = EInventoryStatus.AlmostEmpty;
    else this.status = EInventoryStatus.Empty;
  }
  toString() {
    return (
      <li>
        {this.name}
        <ul>
          <li>Type: {this.category}</li>
          <li>Status: {this.status}</li>
          {this.alcoholPercentage > 0 ? <li>{this.alcoholPercentage}%</li> : ''}
          <li>{this.remaining}ml left</li>
          <li>min required: {this.minRequired}ml</li>
        </ul>
      </li>
    );
  }
  Use(amountUsed) {
    this.remaining -= amountUsed;
    this.updateStatus();
  }
  Check(amountNeeded) {
    return this.remaining > amountNeeded;
  }
  updateCategory(newCategory) {
    if (this.isABottleCategory(newCategory)) this.category = newCategory;
  }

  static isABottleCategory(category) {
    if (
      Object.values(EInventoryCategory.BottleCategory).includes(category) ||
      Object.values(EInventoryCategory.BottleCategory.AlcoholCategory).includes(
        category
      )
    )
      return true;
    else return false;
  }
}

class BottleBuilder {
  #bottle;
  constructor(name, category, remaining, minRequired) {
    this.#bottle = new Bottle(name, category, remaining, minRequired);
  }
  alcoholPercentage(alcoholPercentage) {
    this.#bottle.alcoholPercentage = alcoholPercentage;
    return this;
  }

  build() {
    if (this.#bottle.alcoholPercentage === undefined) {
      this.#bottle.alcoholPercentage = 0;
    }
    return this.#bottle;
  }
}
export default BottleBuilder;
export { Bottle };
