import EInventoryStatus from '../../Enums/EInventoryStatus';

export default abstract class AbstractInventoryItem {
    name;
    category;
    remaining;
    status;

    constructor(name: string, category: string, remaining: any) {
        this.name = name;
        this.category = category;
        this.remaining = remaining;
        if (remaining > 0) {
            this.status = EInventoryStatus.Ok;
        }
    }

    getName() {
        return this.name;
    }
    getCategory() {
        return this.category;
    }
    getStatus() {
        return this.status;
    }
    getRemaining() {
        return this.remaining;
    }
    abstract updateStatus(): void;
    abstract toJson(): any;
    abstract use(amountUsed: number):void
    abstract checkAvailability(amountNeeded: number) : boolean;
}
