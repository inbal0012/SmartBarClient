const EInventoryCategory = {
  BottleCategory: {
    AlcoholCategory: {
      Vodka: 'Vodka',
      Gin: 'Gin',
      Rum: 'Rum',
      Tequila: 'Tequila',
      Whiskey: 'Whiskey',
      Brandy: 'Brandy',
      Cognac: 'Cognac',
      Vermouth: 'Vermouth',
      Beer: 'Beer',
      Wine: 'Wine',
      Liquor: 'Liquor',
    },
    Beverage: 'Beverage',
    Juice: 'Juice',
    Syrup: 'Syrup',
    Bitter: 'Bitter',
    Dairy: 'Dairy',
  },
  Fridge: 'Fridge',
  Dairy: 'Dairy',
  Fruits: 'Fruits',
  Vegetables: 'Vegetables',
  Spices: 'Spices',
  Herbs: 'Herbs',
  Unsorted: 'Unsorted',
  Unavailable: 'Unavailable',
};

export default EInventoryCategory;

// const enum EInventoryCategory {
//   Vodka,
//   Gin,
//   Rum,
//   Tequila,
//   Whiskey,
//   Brandy,
//   Cognac,
//   Vermouth,
//   Beer,
//   Wine,
//   Liquor,
//   Beverage,
//   Juice,
//   Syrup,
//   Bitter,
//   Dairy,
//   Fridge,
//   Fruits,
//   Vegetables,
//   Spices,
//   Herbs,
//   Unsorted,
//   Unavailable,
// };

// enum EAlcohol {
//   Vodka,
//   Gin,
//   Rum,
//   Tequila,
//   Whiskey,
//   Brandy,
//   Cognac,
//   Vermouth,
//   Beer,
//   Wine,
//   Liquor,
// }

// enum EBottle {
//   Beverage,
//   Juice,
//   Syrup,
//   Bitter,
//   Dairy,
// }
// enum EMisc {
//   Fridge,
//   Fruits,
//   Vegetables,
//   Spices,
//   Herbs,
//   Unsorted,
//   Unavailable,
// }

// type InventoryCategory = EAlcohol | EBottle | EMisc;
// const EAlcohol = {
//   Vodka: 'Vodka',
//   Gin: 'Gin',
//   Rum: 'Rum',
//   Tequila: 'Tequila',
//   Whiskey: 'Whiskey',
//   Brandy: 'Brandy',
//   Cognac: 'Cognac',
//   Vermouth: 'Vermouth',
//   Beer: 'Beer',
//   Wine: 'Wine',
//   Liquor: 'Liquor',}
//   type EAlcohol = typeof EAlcohol[keyof typeof EAlcohol];

//   const EBottle = { ...EAlcohol, 
//     Beverage: 'Beverage',
//     Juice: 'Juice',
//     Syrup: 'Syrup',
//     Bitter: 'Bitter',
//     Dairy: 'Dairy',
//   }
//   type EBottle = typeof EBottle[keyof typeof EBottle];

//   const EInventoryCategory = {...EBottle, 
//     Fridge: 'Fridge',
//     Dairy: 'Dairy',
//     Fruits: 'Fruits',
//     Vegetables: 'Vegetables',
//     Spices: 'Spices',
//     Herbs: 'Herbs',
//     Unsorted: 'Unsorted',
//     Unavailable: 'Unavailable',}
//     type EInventoryCategory = typeof EInventoryCategory[keyof typeof EInventoryCategory];

// export default EInventoryCategory;
// export type { EBottle, EAlcohol, InventoryCategory };