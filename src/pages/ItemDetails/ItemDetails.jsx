import React, { Component } from "react";
import "./ItemDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: null,
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const { locate, params } = this.props;

    // Meal is passed via location state 
    if (locate?.state?.meal) {
      this.setState({ meal: locate.state.meal, loading: false });
    } else {
      // Fetch by ID from URL
      const mealId = params.id;
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const fetchedMeal = response.data.meals?.[0];

        if (fetchedMeal) {
          this.setState({ meal: fetchedMeal, loading: false });
        } else {
          this.setState({ error: "Meal not found. Invalid ID.", loading: false });
        }
      } catch (err) {
        this.setState({ error: "Failed to fetch meal details.", loading: false });
      }
    }
  }

  render() {
    const { meal, loading, error } = this.state;

    if (loading) return <h1>Loading...</h1>;
    if (error) {
      return (
        <div className="no-details">
          <h2>{error}</h2>
        </div>
      );
    }

    return (
      <div className="meal-details-container">
        <h1 className="meal-title">{meal.strMeal}</h1>
        <div className="meal-details-card">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="meal-details-image"
          />
          <div className="meal-info">
            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Area:</strong> {meal.strArea}</p>
            <p><strong>Instructions:</strong></p>
            <p className="meal-instructions">{meal.strInstructions}</p>

            {meal.strYoutube && (
              <div className="meal-video">
                <p><strong>Watch Video:</strong></p>
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                  {meal.strYoutube}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function ItemDetailsFunction(props) {
  const navigation = useNavigate();
  const params = useParams();
  const location = useLocation();

  return (
    <ItemDetails
      {...props}
      navigate={navigation}
      params={params}
      locate={location}
    />
  );
}

export default ItemDetailsFunction;
