import EInventoryStatus from '../../Enums/EInventoryStatus';

export default abstract class AbstractInventoryItem {
    name;
    category;
    remaining;
    status;

    constructor(name: string, category: string, remaining: number) {
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
    abstract toString(): string;
    abstract toJson(): any;
    abstract Use(amountUsed: number):void
    abstract Check(amountNeeded: number) : boolean;
    abstract updateCategory(newCategory: string): void;
}
