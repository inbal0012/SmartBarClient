import EInventoryCategory from '../../Enums/EInventoryCategory';
import EInventoryStatus from '../../Enums/EInventoryStatus';
import React from 'react';
import AbstractInventoryItem from './AbstractInventoryItem';

class InventoryItem extends AbstractInventoryItem {
  minRequired;
  constructor(name, category, remaining, minRequired = 1) {
    super(name, category, remaining);
    this.minRequired = minRequired;
    this.updateStatus();
  }

  getMinRequired() {
    return this.minRequired;
  }

  updateStatus() {
    if (this.remaining > this.minRequired * 2) this.status = EInventoryStatus.Ok;
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
    this.category = newCategory;
    // TODO if Veg/Fruit of Bottle change to right class
  }
}
class NullInventoryItem extends AbstractInventoryItem {
  constructor() {
    super('Unavailable', EInventoryCategory.Unavailable, 0);
  }
  toString() {
    return 'Unavailable';
  }
  Check(amountNeeded) {
    return false;
  }
}

export default InventoryItem;
export { NullInventoryItem };
