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
}

export default InventoryItem;
export { NullInventoryItem };
