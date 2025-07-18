import { addToWishlist, removeFromWishlist } from "../action";
import { ADDTOWISHLIST, REMOVEFROMWISHLIST } from "../actionType";

describe("wishlist actions", () => {
  it("should create addToWishlist action", () => {
    expect(addToWishlist("123")).toEqual({
      type: ADDTOWISHLIST,
      payload: "123",
    });
  });

  it("should create removeFromWishlist action", () => {
    expect(removeFromWishlist("123")).toEqual({
      type: REMOVEFROMWISHLIST,
      payload: "123",
    });
  });
});
