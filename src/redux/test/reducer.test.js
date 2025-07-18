import { wishlistReducer } from "../reducer";
import { ADDTOWISHLIST, REMOVEFROMWISHLIST } from "../actionType";

describe("wishlistReducer", () => {
  it("should return initial state", () => {
    expect(wishlistReducer(undefined, {})).toEqual({ values: [] });
  });

  it("should add a mealId to the wishlist", () => {
    const action = { type: ADDTOWISHLIST, payload: "123" };
    const state = wishlistReducer({ values: [] }, action);
    expect(state).toEqual({ values: ["123"] });
  });

  it("should not add duplicate mealId", () => {
    const action = { type: ADDTOWISHLIST, payload: "123" };
    const state = wishlistReducer({ values: ["123"] }, action);
    expect(state).toEqual({ values: ["123"] });
  });

  it("should remove a mealId from the wishlist", () => {
    const action = { type: REMOVEFROMWISHLIST, payload: "123" };
    const state = wishlistReducer({ values: ["123", "456"] }, action);
    expect(state).toEqual({ values: ["456"] });
  });
});
