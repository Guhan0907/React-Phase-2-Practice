import React, { Component } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../../pages/Home/Home.css"

class MealCard extends Component {
  handleCardClick = () => {
    const { meal, onClick } = this.props;
    onClick(meal);
  };

  handleWishlistClick = (e) => {
    e.stopPropagation(); // prevent triggering the card click
    const { meal, onWishlistToggle } = this.props;
    onWishlistToggle(meal.idMeal);
  };

  render() {
    const { meal, isWishlisted } = this.props;

    return (
      <div className="meals-card" style={{ cursor: "pointer" }}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="meals-image"
          onClick={this.handleCardClick}
        />

        <div className="meals-card-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 className="meals-title">{meal.strMeal}</h3>

            <div className="wishlist-icon-wrapper">
              <FavoriteIcon
                className="wishlist-icon"
                onClick={this.handleWishlistClick}
                sx={{
                  color: isWishlisted ? "#e91e63" : "#888",
                }}
              />
            </div>
          </div>

          <Link to={`/category/${meal.strCategory}`}>
            <p className="meals-category">{meal.strCategory}</p>
          </Link>

          <Link to={`/category/${meal.strArea}`}>
            <p className="meals-area">{meal.strArea}</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default MealCard;
