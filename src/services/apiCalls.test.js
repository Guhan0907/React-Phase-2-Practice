// api.test.js
import axios from 'axios';
import {
  HomeApi,
  categoryApi,
  itemDetailsApi,
  searchMealApi,
  filteredItemsA,
  filteredItemsC,
} from './apiCalls'; // adjust the path if needed

vi.mock('axios'); // use jest.mock('axios') if using Jest

describe('API Service Functions', () => {
  afterEach(() => {
    vi.clearAllMocks(); // or jest.clearAllMocks() if using Jest
  });

  it('fetches meals in HomeApi', async () => {
    const mockData = { data: { meals: ['Meal1', 'Meal2'] } };
    axios.get.mockResolvedValueOnce(mockData);

    const response = await HomeApi();
    expect(axios.get).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(response).toEqual(mockData);
  });

  it('fetches categories in categoryApi', async () => {
    const mockData = { data: { categories: ['Cat1', 'Cat2'] } };
    axios.get.mockResolvedValueOnce(mockData);

    const response = await categoryApi();
    expect(axios.get).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/categories.php');
    expect(response).toEqual(mockData);
  });

  it('fetches item details in itemDetailsApi', async () => {
    const mockData = { data: { meals: [{ idMeal: '1234' }] } };
    axios.get.mockResolvedValueOnce(mockData);

    const response = await itemDetailsApi('1234');
    expect(axios.get).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=1234');
    expect(response).toEqual(mockData);
  });

  it('searches meal in searchMealApi', async () => {
    const mockData = { data: { meals: ['Burger'] } };
    axios.get.mockResolvedValueOnce(mockData);

    const response = await searchMealApi('burger');
    expect(axios.get).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=burger');
    expect(response).toEqual(mockData);
  });

  it('returns correct filteredItemsA URL', () => {
    const url = filteredItemsA('Indian');
    expect(url).toBe('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
  });

  it('returns correct filteredItemsC URL', () => {
    const url = filteredItemsC('Beef');
    expect(url).toBe('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
  });
});
