export const PRODUCT_CATEGORY = Object.freeze({
  ELECTRONICS: "Electronics",
  FASHION: "Fashion",
  HOME_APPLIANCES: "Home Appliances",
  BOOKS: "Books",
  TOYS: "Toys",
  SPORTS: "Sports",
  BEAUTY: "Beauty",
  AUTOMOTIVE: "Automotive",
  GROCERY: "Grocery",
  HEALTH: "Health",
  DRINKS: "Drinks",
});

export type ProductCategoryValue = typeof PRODUCT_CATEGORY[keyof typeof PRODUCT_CATEGORY];
