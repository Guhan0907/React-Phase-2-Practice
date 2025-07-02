import React, { Component } from "react";
import "./Home.css";
import { countries, countriesFlag } from "../../constants/homeConstants";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Chip,
  Stack,
  Avatar,
  TextField,
  Pagination,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Shimmer from "../Shimmer/Shimmer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      loading: true,
      error: null,
      selectedCountry: "",
      selectedType: "",
      filteredMeals: [],
      searchTerm: props.queryParam,
      categories: [],
      selectedCategory: "",
      countries: countriesFlag,
      page: 1,
      itemsPerPage: 6,
      showSnackbar: false,
      snackbarMessage: "",
      wishList: JSON.parse(localStorage.getItem("wishlist")) || [],
    };
  }

  async componentDidMount() {
    try {
      const [mealsResponse, categoriesResponse, wishList] = await Promise.all([
        axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s="),
        axios.get("https://www.themealdb.com/api/json/v1/1/categories.php"),
      ]);

      // const wishlists = JSON.parse(localStorage.getItem("wishlist")) || [];
      this.setState(
        {
          meals: mealsResponse.data.meals || [],
          categories: categoriesResponse.data.categories || [],
          // wishList , wishlists,
          loading: false,
          
        },
        this.applyFilters
      );
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryParam !== this.props.queryParam) {
      this.setState({ searchTerm: this.props.queryParam }, this.applyFilters);
    }
  }

  applyFilters = () => {
    const {
      meals,
      selectedCountry,
      selectedType,
      searchTerm,
      selectedCategory,
      page,
    } = this.state;

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

      const matchesSearch = searchTerm
        ? meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesCategory = selectedCategory
        ? meal.strCategory === selectedCategory
        : true;

      return matchesCountry && matchesType && matchesSearch && matchesCategory;
    });

    this.setState({ filteredMeals: filtered, page: 1 });
    // here page is set to 1 to make it available for the filters
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    this.props.navigate(`/?query=${searchTerm}`);
    this.applyFilters();
  };

  handleNavigation = (meal) => {
    this.props.navigate(`/meals/${meal.idMeal}`, { state: { meal } });
  };

  handleSelect = (category) => {
    this.setState({ selectedCategory: category }, this.applyFilters);
  };

  handlePageChange = (eve, val) => {
    this.setState({ page: val });
  };

  // for the wishlist
  handleWishlistToggle = (mealId) => {
    const email = localStorage.getItem("email");
    if (!email) return;

    let wishlist = [...this.state.wishList];

    if (wishlist.includes(mealId)) {
      // wishlist = wishlist.filter((id) => id !== mealId);
      this.setState({
        showSnackbar: true,
        snackbarMessage: "Item already in wishlist!",
      });
      // return;
    } else {
      // Add to wishlist
      wishlist.push(mealId);

      this.setState({
        showSnackbar: true,
        snackbarMessage: "Item added to wishlist!",
      });
    }

    localStorage.setItem(`wishlist`, JSON.stringify(wishlist));

    // Auto close after 1 second
    setTimeout(() => {
      this.setState({ showSnackbar: false });
    }, 500);
  };

  render() {
    const {
      loading,
      error,
      selectedCountry,
      selectedType,
      filteredMeals,
      searchTerm,
      selectedCategory,
      categories,
      page,
      itemsPerPage,
    } = this.state;

    if (loading) return <Shimmer />;
    if (error) return <p className="meals-error">Error: {error}</p>;

    const displayMeals = filteredMeals;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedMeals = filteredMeals.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

    return (
      <div className="meals-container">
        <div className="top-bar">
          <TextField
            fullWidth
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") this.handleSearch();
            }}
            sx={{
              maxWidth: "600px",
              width: "100%",
              backgroundColor: "#fff",
              "& .MuiInputBase-root": {
                height: "36px",
                fontSize: "0.85rem",
              },
            }}
          />
        </div>

        <div className="flag-chip-scroll-container">
          <Stack direction="row" spacing={1} flexWrap="scroll" sx={{ mb: 2 }}>
            <Chip
              label="All"
              onClick={() => this.handleSelect("")}
              color={selectedCategory === "" ? "primary" : "default"}
              variant={selectedCategory === "" ? "filled" : "outlined"}
            />
            {[...categories].map((food) => {
              const isSelected = selectedCategory === food.strCategory;
              return (
                <Chip
                  key={food.idCategory}
                  label={food.strCategory}
                  onClick={() => this.handleSelect(food.strCategory)}
                  onDelete={
                    isSelected ? () => this.handleSelect("") : undefined
                  }
                  color={isSelected ? "primary" : "default"}
                  variant={isSelected ? "filled" : "outlined"}
                />
              );
            })}
          </Stack>

          <div className="flag-chip-row">
            <Chip
              label="All"
              onClick={() =>
                this.setState({ selectedCountry: "" }, this.applyFilters)
              }
              color={this.state.selectedCountry === "" ? "primary" : "default"}
              variant={
                this.state.selectedCountry === "" ? "filled" : "outlined"
              }
            />
            {this.state.countries.map((countryObj) => {
              const isSelected =
                this.state.selectedCountry === countryObj.demonym;
              return (
                <Chip
                  key={countryObj.country}
                  avatar={
                    <Avatar
                      src={countryObj.flag_svg_url}
                      alt={countryObj.country}
                      sx={{ width: 24, height: 24 }}
                    />
                  }
                  label={countryObj.country}
                  onClick={() =>
                    this.setState(
                      { selectedCountry: countryObj.demonym },
                      this.applyFilters
                    )
                  }
                  onDelete={
                    isSelected
                      ? () =>
                          this.setState(
                            { selectedCountry: "" },
                            this.applyFilters
                          )
                      : undefined
                  }
                  color={isSelected ? "primary" : "default"}
                  variant={isSelected ? "filled" : "outlined"}
                />
              );
            })}
          </div>
        </div>

        <div className="meals-grid">
  {paginatedMeals.length > 0 ? (
    paginatedMeals.map((meal) => (
      <div
        key={meal.idMeal}
        className="meals-card"
        style={{ cursor: "pointer" }}
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="meals-image"
          onClick={() => this.handleNavigation(meal)}
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
                onClick={() => this.handleWishlistToggle(meal.idMeal)}
                sx={{
                  color: this.state.wishList.includes(meal.idMeal)
                    ? "#e91e63"
                    : "#888",
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
    ))
  ) : (
    <div className="No-data-Found-img">
      <img
        src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?format=webp&resize=400x300&vertical=center"
        alt="No data"
      />
      <h2>No meals found</h2>
      <button
        onClick={() =>
          this.setState(
            {
              selectedCountry: "",
              selectedType: "",
              searchTerm: "",
              selectedCategory: "",
            },
            this.applyFilters
          )
        }
        className="reset-filters-btn"
      >
        Reset Filters
      </button>
    </div>
  )}
</div>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={this.handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />

          <Snackbar
            open={this.state.showSnackbar}
            message={this.state.snackbarMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            action={
              <IconButton
                size="small"
                color="inherit"
                onClick={() => this.setState({ showSnackbar: false })}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </div>
      </div>
    );
  }
}

function HomeFunction(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Home
      {...props}
      navigate={navigate}
      queryParam={searchParams.get("query") || ""}
    />
  );
}

export default HomeFunction;
