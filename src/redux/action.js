import { ADDTOWISHLIST, REMOVEFROMWISHLIST } from "./actionType";

// function to add an item to redux
export const addToWishlist = (mealId) => ({
  type: ADDTOWISHLIST,
  payload: mealId,
});

// function to remove the data from the redux

export const removeFromWishlist = (mealId) => ({
  type: REMOVEFROMWISHLIST,
  payload: mealId,
});
