import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import WishList from "./WishList";

const mockStore = configureMockStore();
const mockAxios = new MockAdapter(axios);

describe("WishList Component", () => {
  let store;

  const wishlistIds = ["52772", "52977"];

  const mockMeals = {
    52772: {
      idMeal: "52772",
      strMeal: "Teriyaki Chicken",
      strCategory: "Chicken",
      strArea: "Japanese",
      strMealThumb: "https://www.themealdb.com/images/media/meals/teriyaki.jpg",
    },
    52977: {
      idMeal: "52977",
      strMeal: "Corba",
      strCategory: "Soup",
      strArea: "Turkish",
      strMealThumb: "https://www.themealdb.com/images/media/meals/corba.jpg",
    },
  };

  beforeEach(() => {
    store = mockStore({
      wishlist: {
        values: wishlistIds,
      },
    });

    wishlistIds.forEach((id) => {
      mockAxios
        .onGet(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .reply(200, {
          meals: [mockMeals[id]],
        });
    });
  });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  it("renders meals in the wishlist from Redux store", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WishList />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText("Teriyaki Chicken")).toBeInTheDocument();
    expect(await screen.findByText("Corba")).toBeInTheDocument();
    expect(screen.getByText("Chicken")).toBeInTheDocument();
    expect(screen.getByText("Soup")).toBeInTheDocument();
  });

  it("removes a meal from the wishlist when delete button is clicked", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WishList />
        </MemoryRouter>
      </Provider>
    );

    const corba = await screen.findByText("Corba");
    expect(corba).toBeInTheDocument();

  
    const deletingButton = screen.getAllByRole("button");
    const mealDeleteButton = deletingButton[1];  // corba deleted

    fireEvent.click(await screen.findByTestId('removeFromWishlistCta52977'));

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "REMOVEFROMWISHLIST",
      payload: "52977",
    });;
    
    expect(screen.queryByTestId("mealTitleCorba")).toBeNull();
  });
});
