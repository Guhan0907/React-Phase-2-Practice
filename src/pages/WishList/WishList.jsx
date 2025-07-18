import React, { Component } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Home/Home.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Shimmer from "../Shimmer/Shimmer";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./WishList.css";
import { connect } from "react-redux";
import { removeFromWishlist } from "../../redux/action";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistMeals: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadWishlistMeals();
  }

  // loadWishlistMeals = async () => {
  //   const email = localStorage.getItem("email");
  //   // const {wishlistIds} = this.props;

  //   if (!email) {
  //     this.setState({ wishlistMeals: [], loading: false });
  //     return;
  //   }

  //   const wishlistIds = JSON.parse(localStorage.getItem(`wishlist`)) || [];

  //   try {
  //     const mealRequests = wishlistIds.map((id) =>
  //       axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`),
  //     );
  //     const mealResponses = await Promise.all(mealRequests);
  //     const meals = mealResponses.map((res) => res.data.meals[0]);

  //     this.setState({ wishlistMeals: meals, loading: false });
  //   } catch (error) {
  //     this.setState({ error: error.message, loading: false });
  //   }
  // };

  // updated loadWishlistMeals function
  loadWishlistMeals = async () => {
    const { wishlistIds } = this.props;

    if (!wishlistIds || wishlistIds.length === 0) {
      this.setState({ wishlistMeals: [], loading: false });
      return;
    }

    try {
      const mealRequests = wishlistIds.map((id) =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`),
      );
      const mealResponses = await Promise.all(mealRequests);
      const meals = mealResponses.map((res) => res.data.meals[0]);

      this.setState({ wishlistMeals: meals, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  // removeFromWishlist = (mealId) => {
  //   const email = localStorage.getItem("email");
  //   if (!email) return;

  //   let wishlist = JSON.parse(localStorage.getItem(`wishlist`)) || [];
  //   wishlist = wishlist.filter((id) => id !== mealId);
  //   localStorage.setItem(`wishlist`, JSON.stringify(wishlist));

  //   this.setState(
  //     (prevState) => ({
  //       wishlistMeals: prevState.wishlistMeals.filter(
  //         (meal) => meal.idMeal !== mealId,
  //       ),
  //     }),
  //     () => {
  //       if (this.state.wishlistMeals.length === 0) {
  //         this.setState({ error: "Your wishlist is empty." });
  //       }
  //     },
  //   );
  // };

  // updated removeFromWishlist function
  removeFromWishlist = (mealId) => {
    this.props.removeFromWishlist(mealId); // dispatch redux action

    this.setState((prevState) => ({
      wishlistMeals: prevState.wishlistMeals.filter(
        (meal) => meal.idMeal !== mealId,
      ),
    }));
  };

  render() {
    const { wishlistMeals, loading, error } = this.state;

    if (loading) return <Shimmer />;

    if (wishlistMeals.length === 0) {
      return (
        <div className="No-data-Found-img">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3613104-3020776.png"
            alt="Empty"
          />
          <h2>Your wishlist is empty.</h2>

          <div className="back-button-container"></div>
        </div>
      );
    }

    return (
      <div className="meals-container">
        <h1 className="meals-heading">Your Wishlist</h1>
        <div className="meals-grid">
          {wishlistMeals.map((meal) => (
            <div key={meal.idMeal} className="meals-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meals-image"
              />
              <div className="meals-card-content">
                <h3 className="meals-title" data-testid={`mealTitle${meal?.strMeal || ''}`}>{meal.strMeal}</h3>

                <Link to={`/category/${meal.strCategory}`}>
                  <p className="meals-category">{meal.strCategory}</p>
                </Link>

                <Link to={`/category/${meal.strArea}`}>
                  <p className="meals-area">{meal.strArea}</p>
                </Link>
              </div>
              <div className="delete-icon-wrapper">
                <IconButton
                  data-testid={`removeFromWishlistCta${meal?.idMeal || ''}`}
                  onClick={() => this.removeFromWishlist(meal.idMeal)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function CartFunction(props) {
  const navigate = useNavigate();

  return <Cart {...props} navigate={navigate} />;
}

const mapStateToProps = (state) => ({
  wishlistIds: state.wishlist.values, // array of meal IDs
});

const mapDispatchToProps = {
  removeFromWishlist,
};

// export default CartFunction;
export default connect(mapStateToProps, mapDispatchToProps)(CartFunction);
