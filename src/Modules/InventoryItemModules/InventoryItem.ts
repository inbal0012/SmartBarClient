import EInventoryCategory from '../../Enums/EInventoryCategory';
import EInventoryStatus from '../../Enums/EInventoryStatus';
import AbstractInventoryItem from './AbstractInventoryItem';

class InventoryItem extends AbstractInventoryItem {
  minRequired;
  constructor(name: string, category: string, remaining: number, minRequired = 1) {
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

  toJson() {
    var json = JSON.stringify(this);
    console.log(json);
    return json;
  }

  use(amountUsed: number): void {
    this.remaining -= amountUsed;
    this.updateStatus();
  }

  update(ingredientParam: string, newValue: any) {
    switch (ingredientParam) {
      case 'name':
        return { success: false, reason: "You can't change the name" };
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

  checkAvailability(amountNeeded: number): boolean {
    return this.remaining > amountNeeded;
  }
}
class NullInventoryItem extends AbstractInventoryItem {
  constructor() {
    super('Unavailable', EInventoryCategory.Unavailable, 0);
  }

  checkAvailability(amountNeeded: number) {
    return false;
  }

  updateStatus(): void {
  }

  toJson() {
    return "Unavailable"
  }

  use(amountUsed: number): void {
  }

  update(ingredientParam: string, newValue: any): { success: boolean; reason: string; } {
    return {
      success: false,
      reason:
        "Unavailable",
    };
  }
}

export default InventoryItem;
export { NullInventoryItem };
