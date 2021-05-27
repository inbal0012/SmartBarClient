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

  toJson() {
    JSON.stringify(this);
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
        if (newValue === EInventoryCategory.Fruits || newValue === EInventoryCategory.Vegetables) {
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
      default:
        return {
          success: false,
          reason:
            this.name + " doesn't have " + ingredientParam + 'parameter',
        };
    }
  }

  checkAvailability(amountNeeded: number) {
    return this.remaining > amountNeeded;
  }
}

export default FruitVegetable;
