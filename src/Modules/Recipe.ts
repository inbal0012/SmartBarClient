import ERecipeCategory from '../Enums/ERecipeCategory'
import AbstractInventoryItem from './InventoryItemModules/AbstractInventoryItem';
import { NullInventoryItem } from './InventoryItemModules/InventoryItem';

class Recipe {
    name: string;
    ingredients: [number, AbstractInventoryItem][];
    method: Array<string>;
    portion: number;
    //categories: Array<string>;
    isAvailable: boolean;
    // TODO measurement converting ( + measure unit for misc InItems)
    // TODO garnish
    // TODO parse ingredients

    constructor(name: string, ingredients: [number, AbstractInventoryItem][], method: Array<string>, portion: number) {
        this.name = name;
        this.isAvailable = true;
        this.ingredients = ingredients;
        this.method = method;
        this.portion = portion;
        //this.categories = new Array(ERecipeCategory.StrengthNonAlcoholic);
    }

    addCategory(category: string) {
        // TODO
    }

    checkAvailability() {
        var isAvailable = true;
        var missingIng = "";

        this.ingredients.forEach(ingredient => {
            if (!ingredient[1].checkAvailability(ingredient[0])) {
                isAvailable = false;
                missingIng += ingredient[1].name + ", ";
            }
        });
        this.isAvailable = isAvailable
        return { success: isAvailable, reason: isAvailable ? "All ingredients available" : "Missing ingredients: " + missingIng };
    }

    calculateDrinkStrength() {
        // var alcohol;
        // var quantity;
        // this.ingredients.forEach(ingredient => {
        //     if (ingredient.category )
        // });
        // TODO
    }

    toJson() {
        return JSON.stringify({
            name: this.name,
            ingredients: this.ingredientsToJson(),
            method: this.method,
            portion: this.portion,
            //categories: JSON.stringify(this.categories),
            isAvailable: this.isAvailable,
        })
    }

    ingredientsToJson() {
        var str: string = "[";

        this.ingredients.forEach(item => {
            str += item[0] + " " + item[1].getName() + ", ";
        });
        str+="]"
        //str+=this.ingredients.map(ing => {return (<li>{ing[0]} {ing[1].getName()}</li>)})
        return str;
    }
}

class NullRecipe extends Recipe {
    constructor() {
        super("Recipe Not Found", [[0, new NullInventoryItem()]], ["Recipe Not Found"], 0);
    }

    addCategory(category: string) {
        // TODO
    }

    checkAvailability() {
        return { success: false, reason: "Recipe Not Found" };
    }

    calculateDrinkStrength() {
        return 0;
    }

    toJson() {
        return JSON.stringify("Recipe Not Found");
    }

    ingredientsToJson(): string {
        return "Recipe Not Found";
    }
}
export default Recipe;
export { NullRecipe };