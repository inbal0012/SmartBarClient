import ERecipeCategory from '../Enums/ERecipeCategory'
import AbstractInventoryItem from './InventoryItemModules/AbstractInventoryItem';
import { NullInventoryItem } from './InventoryItemModules/InventoryItem';

class Recipe {
    name: string;
    ingredients: [number, AbstractInventoryItem][];
    method: Array<string>;
    portion: number;
    categories: Array<string>;
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
        this.categories = new Array(ERecipeCategory.StrengthNonAlcoholic);
    }

    addCategory(category: string) {
        // TODO
    }

    checkAvailability() {
        var isAvailable = true;
        console.log(this.ingredients);

        this.ingredients.forEach(ingredient => {
            console.log(ingredient[1]);

            if (!ingredient[1].Check(ingredient[0])) {
                isAvailable = false;
            }
        });
        return isAvailable;
    }

    calculateDrinkStrength() {
        // var alcohol;
        // var quantity;
        // this.ingredients.forEach(ingredient => {
        //     if (ingredient.category )
        // });
        // TODO
    }

    toString() {
        return this.name + " strength: " + this.categories + " Ingredients: " + this.ingredientsToString() + " Method: " + this.method.toString();
    }

    ingredientsToString() {
        var str: string = "";

        this.ingredients.forEach(item => {
            str += item[0] + " " + item[1].getName() + " ";
        });
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
        return false;
    }

    calculateDrinkStrength() {
        return 0;
    }

    toString() {
        return "Recipe Not Found";
    }

    ingredientsToString(): string {
        return "Recipe Not Found";
    }
}
export default Recipe;
export { NullRecipe };