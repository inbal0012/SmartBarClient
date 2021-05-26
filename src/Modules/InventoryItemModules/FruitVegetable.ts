import EInventoryCategory from '../../Enums/EInventoryCategory';
import EInventoryStatus from '../../Enums/EInventoryStatus';
import AbstractInventoryItem from './AbstractInventoryItem';

class FruitVegetable extends AbstractInventoryItem {
  minRequired;

  constructor(name: string, category: string, remaining: number, minRequired: number) {
    if (
      category === EInventoryCategory.Fruits ||
      category === EInventoryCategory.Vegetables
    ) {
      super(name, category, remaining);
      this.minRequired = minRequired;
      this.updateStatus();
    } else throw new Error(category + " can't be a Veg/Fruit type");
  }
  getMinRequired() {
    return this.minRequired;
  }
  updateStatus() {
    console.log(this.name + ': ' + this.remaining + ' ' + this.minRequired);
    if (this.remaining > this.minRequired * 2)
      this.status = EInventoryStatus.Ok;
    else if (this.remaining > this.minRequired)
      this.status = EInventoryStatus.AlmostEmpty;
    else this.status = EInventoryStatus.Empty;
  }
  toString() {
    // return (
    //   <li>
    //     {this.name}
    //     <ul>
    //       <li>Type: {this.category}</li>
    //       <li>Status: {this.status}</li>
    //       <li>{this.remaining} left</li>
    //       <li>min required: {this.minRequired}</li>
    //     </ul>
    //   </li>
    // );
    return "";
  }
  
  toJson() {
    JSON.stringify(this);
  }

  use(amountUsed: number) {
    this.remaining -= amountUsed;
    this.updateStatus();
  }

  checkAvailability(amountNeeded: number) {
    return this.remaining > amountNeeded;
  }

  updateCategory(newCategory: string) {
    if (newCategory === this.category) return;
    if (
      newCategory === EInventoryCategory.Fruits ||
      newCategory === EInventoryCategory.Vegetables
    ) {
      this.category = newCategory;
    }
  }
}

export default FruitVegetable;
