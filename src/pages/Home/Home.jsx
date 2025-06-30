import React, { Component } from "react";
import "./Home.css";
import {countries} from "../../constants/homeConstants";
import { useNavigate } from "react-router-dom";

class Home extends Component {
  state = {
    meals: [],
    loading: true,
    error: null,
    selectedCountry: "",
    selectedType: "",
    filteredMeals: [],
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      if (!res.ok) {
        throw new Error("Failed to fetch meals");
      }
      const data = await res.json();
      this.setState({ meals: data.meals || [], loading: false }
        ,this.applyFilters
      );
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  applyFilters = () => {
    const { meals, selectedCountry, selectedType } = this.state;

    const filtered = meals.filter((meal) => {
      const matchesCountry = selectedCountry
        ? meal.strArea === selectedCountry
        : true;

      const isVeg = meal.strCategory?.includes("Vegetarian");
      const matchesType =
        selectedType === "Vegetarian"
          ? isVeg
          : selectedType === "Non-Vegetarian"
          ? !isVeg
          : true;

      return matchesCountry && matchesType;
    });

    this.setState({ filteredMeals: filtered });
  };

  handleNavigation = (meal) => {
    console.log("Navigate to meal:", meal.idMeal);
    this.props.navigate(`/${meal.idMeal}` , {state : {meal}});
  };

  render() {
    const {
      meals,
      loading,
      error,
      selectedCountry,
      selectedType,
      filteredMeals,
    } = this.state;

    if (loading) return <h1>Loading...</h1>;
    if (error) return <p className="meals-error">Error: {error}</p>;

    // const displayMeals = filteredMeals.length > 0 ? filteredMeals : meals;
    const displayMeals = filteredMeals;

    if (displayMeals.length === 0) {
      // console.log("Onnum illa da")
      return (
        <div className="No-data-Found-img">
          <img
            src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?format=webp&resize=400x300&vertical=center"
            alt="No data"
          />
          <h2>No meals found</h2>
        </div>
      );
    }

    return (
      <div className="meals-container">
        <h1 className="meals-heading">Meal List</h1>

        <div className="filter-box">
          <h3>Filter Meals</h3>

          <label>Country:</label>

          <select
            value={selectedCountry}
            onChange={(e) => this.setState({ selectedCountry: e.target.value })}
          >
            <option value="">All</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <label>Type:</label>
          <select
            value={selectedType}
            onChange={(e) => this.setState({ selectedType: e.target.value })}
          >
            <option value="">All</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>

          <button onClick={this.applyFilters} className="filter-done-btn">
            Done
          </button>
        </div>

        <div className="meals-grid">
          {displayMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meals-card"
              onClick={() => this.handleNavigation(meal)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meals-image"
              />
              <div className="meals-card-content">
                <h3 className="meals-title">{meal.strMeal}</h3>
                <p className="meals-category">{meal.strCategory}</p>
                <p className="meals-area">{meal.strArea}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}


function HomeFunction(props) {
  const navigation = useNavigate();

  return (
    <Home {...props} navigate = {navigation} />
  )
}

export default HomeFunction;

