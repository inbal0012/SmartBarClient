import EInventoryCategory from '../../Enums/EInventoryCategory';
import EInventoryStatus from '../../Enums/EInventoryStatus';
import AbstractInventoryItem from './AbstractInventoryItem';
class Bottle extends AbstractInventoryItem {
  alcoholPercentage: number = 0;
  minRequired;

  constructor(name: string, category: string, remaining: number, minRequired: number) {
    super(name, category, remaining);
    this.minRequired = minRequired;
    this.updateStatus();
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

  toJson() {
    var json = JSON.stringify(this);
    console.log(json);
    return json;
  }

  use(amountUsed: number) {
    this.remaining -= amountUsed;
    this.updateStatus();
  }

  update(ingredientParam: string, newValue: any) {
    switch (ingredientParam) {
      case 'name':
        return { success: false, reason: "You can't change the name" };
      case 'category':
        if (Bottle.isABottleCategory(newValue)) {
          this.category = newValue;
          return {
            success: true,
            reason: this.name + 'category updated',
          };
        }
        else return {
          success: false,
          reason: "can't change " + this.name + "'s category to " + newValue,
        };
      case 'remaining':
        if (!this.checkAvailability(newValue))
          return {
            success: false,
            reason:
              "there's only " +
              this.remaining +
              "left. you can't use " +
              newValue,
          };
        else {
          this.use(newValue);
          return {
            success: true,
            reason: this.name + 'used',
          };
        }
      case "minRequired":
        if (newValue > 0)
          return {
            success: false,
            reason:
              "minRequired can't be lower then 0"
          };
        if (!(typeof (newValue) === 'number'))
          return {
            success: false,
            reason:
              "minRequired has to be a number"
          };
        this.minRequired = newValue;
        return {
          success: true,
          reason:
            "minRequired changed to " + newValue
        };
      case "alcoholPercentage":
        if (!Bottle.isAAlcoholCategory(newValue))
          return {
            success: false,
            reason:
              this.name + " is not an Alcohol type. it doesn't have alcohol percentage."
          };
        if (newValue > 0)
          return {
            success: false,
            reason:
              "alcohol percentage can't be lower then 0"
          };
        if (typeof (newValue) !== 'number')
          return {
            success: false,
            reason:
              "alcohol percentage has to be a number"
          };
        this.alcoholPercentage = newValue;
        return {
          success: true,
          reason:
            "alcohol percentage changed to " + newValue
        };
      default:
        return {
          success: false,
          reason:
            this.name + " doesn't have " + ingredientParam + 'parameter',
        };
    }
  }

  checkAvailability(amountNeeded: number): boolean {
    return this.remaining > amountNeeded;
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
