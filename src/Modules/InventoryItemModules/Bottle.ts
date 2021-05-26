import EInventoryCategory from '../../Enums/EInventoryCategory';
import EInventoryStatus from '../../Enums/EInventoryStatus';
import AbstractInventoryItem from './AbstractInventoryItem';
class Bottle extends AbstractInventoryItem {
  alcoholPercentage: number = 0;
  minRequired;

  constructor(name: string, category: string, remaining: number, minRequired: number) {
    super(name, category, remaining);
    if (Bottle.isABottleCategory(category)) {
      this.minRequired = minRequired;
      this.updateStatus();
    } else {
      throw new Error(
        category +
        ' is not a Bottle type.\n please select a deferent type or change the category of ' +
        name
      );
    }
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
    // return (
    //   <li>
    //   { this.name }
    //   < ul >
    //   <li>Type: { this.category } </li>
    //     < li > Status: { this.status } </li>
    // {
    //   this.alcoholPercentage > 0 ? <li>{ this.alcoholPercentage } % </li> : ''}
    //     < li > { this.remaining }ml left < /li>
    //       < li > min required: { this.minRequired } ml < /li>
    //         < /ul>
    //         < /li>
    // );
    return "";
  }

  toJson() {
    var json = JSON.stringify(this);
    console.log(json);
    return json;    
  }
  
  use(amountUsed: number) {
      this.remaining -= amountUsed;
      this.updateStatus();
  }

  checkAvailability(amountNeeded: number): boolean {
      return this.remaining > amountNeeded;
  }

  updateCategory(newCategory: string): void {
      if (Bottle.isABottleCategory(newCategory)) this.category = newCategory;
  }

  static isABottleCategory(category: string) {
    if (
      Object.values(EInventoryCategory.BottleCategory).includes(category) ||
      Object.values(EInventoryCategory.BottleCategory.AlcoholCategory).includes(
        category
      )
    )
      return true;
    else return false;
  }
  
  static isAAlcoholCategory(category: string) {
    if (
      Object.values(EInventoryCategory.BottleCategory.AlcoholCategory).includes(
        category
      )
    )
      return true;
    else return false;
  }
}

class BottleBuilder {
  private bottle: Bottle;

  constructor(name: string, category: string, remaining: number, minRequired: number) {
    this.bottle = new Bottle(name, category, remaining, minRequired);
  }

  alcoholPercentage(alcoholPercentage: number) {
    this.bottle.alcoholPercentage = alcoholPercentage;
    return this;
  }

  build() {
    if (this.bottle.alcoholPercentage === undefined) {
      this.bottle.alcoholPercentage = 0;
    }
    return this.bottle;
  }
}

export default BottleBuilder;
export { Bottle };
