import AbstractInventoryItem from "./AbstractInventoryItem";

class BinaryInventoryItem extends AbstractInventoryItem {
    needUpdate: boolean = false;

    constructor(name: string, category: string, remaining: boolean) {
        super(name, category, remaining);
        this.updateStatus();
    }

    updateStatus(): void {
        this.needUpdate = true;
    }
    toJson() {
        return JSON.stringify(this);
    }
    use(amountUsed: number): void {
        this.updateStatus();
    }
    checkAvailability(amountNeeded: number): boolean {
        return this.remaining;
    }

    updateRemaining(isRemained: boolean) {
        this.remaining = isRemained;
    }
}

export default BinaryInventoryItem;