import React, { Component } from "react";
import "./ItemDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { itemDetailsApi } from "../../services/apiCalls";

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: null,
      loading: true,
      error: null,
      showFullInstructions: false,
    };
  }

  async componentDidMount() {
    const { locate, params } = this.props;
    const { mealId } = params.id;

    // Meal is passed via location state
    if (locate?.state?.meal) {
      this.setState({ meal: locate.state.meal, loading: false });
    } else {
      // Fetch by ID from URL
      const mealId = params.id;
      try {
        const fetchedMeal = (await itemDetailsApi(mealId)).data.meals?.[0];

        if (fetchedMeal) {
          this.setState({ meal: fetchedMeal, loading: false });
        } else {
          this.setState({
            error: "Meal not found. Invalid ID.",
            loading: false,
          });
        }
      } catch (err) {
        this.setState({
          error: "Failed to fetch meal details.",
          loading: false,
        });
      }
    }
  }

  getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(
          `${measure ? measure.trim() : ""} ${ingredient.trim()}`,
        );
      }
    }
    return ingredients;
  }

  getInstructionSteps(instructions) {
    if (!instructions) return [];

    return instructions
      .split(/\r?\n|\. (?=[A-Z])|(?:\d+\.?\s)/)
      .map((step) => step.trim())
      .filter((step) => step.length > 0);
  }

  toggleInstructions = () => {
    this.setState((prevState) => ({
      showFullInstructions: !prevState.showFullInstructions,
    }));
  };

  render() {
    const { meal, loading, error } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <h2>Loading meal details...</h2>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <div className="error-card">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button
              onClick={() => this.props.navigate(-1)}
              className="back-button"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    const ingredients = this.getIngredients(meal);
    const instructionSteps = this.getInstructionSteps(meal.strInstructions);

    return (
      <div className="meal-details-container">
        <div className="meal-card">
          <div className="meal-header">
            <h1 className="meal-title">{meal.strMeal}</h1>
          </div>

          <div className="meal-content">
            <div className="meal-image-section">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-image"
              />
            </div>

            <div className="meal-details">
              {ingredients.length > 0 && (
                <div className="details-section">
                  <h3 className="section-title">Ingredients</h3>
                  <div className="ingredients-grid">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="ingredient-item">
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {meal.strInstructions && (
                <div className="details-section">
                  <h3 className="section-title">Instructions</h3>
                  <div className="instructions-content">
                    {instructionSteps.length > 1 ? (
                      <>
                        {(this.state.showFullInstructions
                          ? instructionSteps
                          : instructionSteps.slice(0, 3)
                        ).map((step, index) => (
                          <p key={index} className="instruction-step">
                            <strong>Step {index + 1}:</strong> {step}
                          </p>
                        ))}

                        {instructionSteps.length > 3 && (
                          <Button
                            variant="text"
                            size="small"
                            onClick={this.toggleInstructions}
                            sx={{ mt: 1, textTransform: "none" }}
                          >
                            {this.state.showFullInstructions
                              ? "Show Less"
                              : "Show More"}
                          </Button>
                        )}
                      </>
                    ) : (
                      <p className="instruction-step">{meal.strInstructions}</p>
                    )}

                    {/* above is the added code */}
                  </div>
                </div>
              )}

              {meal.strYoutube && (
                <div className="details-section">
                  <h3 className="section-title">Video Tutorial</h3>
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-link"
                  >
                    <span className="video-icon">▶</span>
                    Watch on YouTube
                  </a>
                </div>
              )}
            </div>
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
