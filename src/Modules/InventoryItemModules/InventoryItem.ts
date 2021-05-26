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

  toString() {
    // return (
    //   <li>
    //   { this.name }
    //   < ul >
    //   <li>Type: { this.category } </li>
    //     < li > Status: { this.status } </>
    //       < /ul>
    //       < /li>
    // );
    return "";
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

  updateCategory(newCategory: string): void {
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
  updateCategory(newCategory: string): void {
    
  }
}

export default InventoryItem;
export { NullInventoryItem };
