import { ADDTOWISHLIST, REMOVEFROMWISHLIST } from "./actionType";

const initialState = {
  values: [],
  // for storing the mealId's
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDTOWISHLIST:
      if (state.values.includes(action.payload)) return state;
      return { ...state, values: [...state.values, action.payload] };

    case REMOVEFROMWISHLIST:
      return {
        ...state,
        values: state.values.filter((mealID) => mealID !== action.payload),
      };

    default:
      return state;
  }
};
