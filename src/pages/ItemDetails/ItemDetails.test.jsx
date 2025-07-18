import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import ItemDetailsFunction from "./ItemDetails";
import * as apiCalls from "../../services/apiCalls";

vi.mock("../../services/apiCalls", () => ({
  itemDetailsApi: vi.fn(),
}));

// Todo: snapshots,
// Mock api calls using axios mock adapter
const mockMeal = {
  idMeal: "52772",
  strMeal: "Teriyaki Chicken Casserole",
  strCategory: "Chicken",
  strArea: "Japanese",
  strInstructions:
    "Step 1: Preheat oven to 350 degrees.\nStep 2: Cook chicken.\nStep 3: Mix sauce.",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
  strIngredient1: "soy sauce",
  strMeasure1: "3/4 cup",
  strIngredient2: "water",
  strMeasure2: "1/2 cup",
};

describe("ItemDetails Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    apiCalls.itemDetailsApi.mockResolvedValue({ data: { meals: [mockMeal] } });
  });

  it("renders loading state initially", () => {
    render(
      <MemoryRouter initialEntries={["/meals/52772"]}>
        <Routes>
          <Route path="/meals/:id" element={<ItemDetailsFunction />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Loading meal details/i)).toBeInTheDocument();
  });

  it("renders meal details after successful fetch", async () => {
    render(
      <MemoryRouter initialEntries={["/meals/52772"]}>
        <Routes>
          <Route path="/meals/:id" element={<ItemDetailsFunction />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Teriyaki Chicken Casserole"),
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/Ingredients/i)).toBeInTheDocument();
    expect(screen.getByText(/Instructions/i)).toBeInTheDocument();
    expect(screen.getByText(/Watch on YouTube/i)).toBeInTheDocument();
  });

  it("displays error if meal is not found", async () => {
    apiCalls.itemDetailsApi.mockResolvedValue({ data: { meals: null } });

    render(
      <MemoryRouter initialEntries={["/meals/99999"]}>
        <Routes>
          <Route path="/meals/:id" element={<ItemDetailsFunction />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Meal not found. Invalid ID./i),
      ).toBeInTheDocument();
    });
  });

  it("handles API failure", async () => {
    apiCalls.itemDetailsApi.mockRejectedValue(new Error("API Error"));

    render(
      <MemoryRouter initialEntries={["/meals/52772"]}>
        <Routes>
          <Route path="/meals/:id" element={<ItemDetailsFunction />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to fetch meal details./i),
      ).toBeInTheDocument();
    });
  });
});
