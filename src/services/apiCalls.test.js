import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  HomeApi,
  categoryApi,
  itemDetailsApi,
  searchMealApi,
  filteredItemsA,
  filteredItemsC,
} from "./apiCalls";

describe("Meal API Tests", () => {
  const mock = new MockAdapter(axios);
  const baseURL = "https://www.themealdb.com";

  afterEach(() => {
    mock.reset();
  });

  it("should fetch all meals using HomeApi", async () => {
    const mockData = { meals: [{ idMeal: "1", strMeal: "Pizza" }] };
    mock.onGet(`${baseURL}/api/json/v1/1/search.php?s=`).reply(200, mockData);

    const response = await HomeApi();
    expect(response.data).toEqual(mockData);
  });

  it("should fetch all categories using categoryApi", async () => {
    const mockData = { categories: [{ idCategory: "1", strCategory: "Beef" }] };
    mock.onGet(`${baseURL}/api/json/v1/1/categories.php`).reply(200, mockData);

    const response = await categoryApi();
    expect(response.data).toEqual(mockData);
  });

  it("should fetch item details using itemDetailsApi", async () => {
    const propsId = "52772";
    const mockData = { meals: [{ idMeal: propsId, strMeal: "Spaghetti" }] };
    mock
      .onGet(`${baseURL}/api/json/v1/1/lookup.php?i=${propsId}`)
      .reply(200, mockData);

    const response = await itemDetailsApi(propsId);
    expect(response.data).toEqual(mockData);
  });

  it("should search meals using searchMealApi", async () => {
    const query = "chicken";
    const mockData = { meals: [{ strMeal: "Chicken Curry" }] };
    mock
      .onGet(`${baseURL}/api/json/v1/1/search.php?s=${query}`)
      .reply(200, mockData);

    const response = await searchMealApi(query);
    expect(response.data).toEqual(mockData);
  });

  it("should return correct filteredItemsA URL", () => {
    const area = "Indian";
    const expectedUrl = `${baseURL}/api/json/v1/1/filter.php?a=${area}`;
    expect(filteredItemsA(area)).toBe(expectedUrl);
  });

  it("should return correct filteredItemsC URL", () => {
    const category = "Seafood";
    const expectedUrl = `${baseURL}/api/json/v1/1/filter.php?c=${category}`;
    expect(filteredItemsC(category)).toBe(expectedUrl);
  });
});
