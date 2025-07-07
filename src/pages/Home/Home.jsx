import React, { Component } from "react";
import "./Home.css";
import { countriesFlag } from "../../constants/homeConstants";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { TextField, Pagination, Snackbar, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Shimmer from "../Shimmer/Shimmer";
import Filter from "../../components/UI-Components/Filter";
import MealCard from "../../components/UI-Components/MealCard";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
// API
import { HomeApi, categoryApi, searchMealApi } from "../../services/apiCalls";

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
      const { data: { meals = [] } = {} } = await HomeApi();
      // const meals = mealsResponse.data.meals || [];

      this.setState(
        {
          meals,
          loading: false,
        },
        this.applyFilters
      );
    } catch (error) {
      this.setState({ error: "Failed to fetch meals.", loading: false });
    }

    categoryApi()
      .then((res) => {
        this.setState({
          categories: res.data.categories || [],
        });
      })
      .catch((err) => {
        console.warn("Failed to fetch categories: ", err.message);
        // If it fails, don't set categories at all
        this.setState({ categories: [] });
      });
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

  handleSearch = async () => {
    const { searchTerm } = this.state;
    this.props.navigate(`/?query=${searchTerm.trim()}`);

    if (searchTerm.trim()) {
      try {
        const response = await searchMealApi(searchTerm.trim());
        const meals = response.data.meals || [];

        this.setState(
          {
            meals: meals,
          },
          this.applyFilters
        );
      } catch (error) {
        this.setState({ error: "Search failed", meals: [] });
      }
    } else {
      // fallback to full list if searchTerm is empty
      this.props.navigate(`/`);
      try {
        const { data: { meals = [] } = {} } = await HomeApi();
        this.setState(
          {
            meals: meals,
          },
          this.applyFilters
        );
      } catch (error) {
        this.setState({ error: "Failed to load data", meals: [] });
      }
    }
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
      wishlist = wishlist.filter((id) => id !== mealId);
      this.setState({
        showSnackbar: true,
        snackbarMessage: "Item removed in wishlist!",
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
    this.setState({ wishList: wishlist });

    // Auto close after 0.5 second
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
        {/* Search and Dropdown Filters in One Line */}
        <div className="search-filter-wrapper">
          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <TextField
              fullWidth
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => this.setState({ searchTerm: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") this.handleSearch();
              }}
              sx={{
                flex: 1,
                backgroundColor: "#fff",
                "& .MuiInputBase-root": {
                  height: "36px",
                  fontSize: "0.85rem",
                },
              }}
              slotProps={{
                input: {
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          this.setState({ searchTerm: "" }, this.handleSearch)
                        }
                        size="small"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <IconButton
              onClick={this.handleSearch}
              sx={{
                backgroundColor: "#d9d9d9",
                ml: 1,
                height: "32px",
                width: "32px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#adadad",
                },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>

          {/* Dropdown Filters */}
          <div className="dropdown-filter-wrapper">
            <Filter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={this.handleSelect}
              countries={this.state.countries}
              selectedCountry={this.state.selectedCountry}
              onCountrySelect={(country) =>
                this.setState({ selectedCountry: country }, this.applyFilters)
              }
            />
          </div>
        </div>

        <div className="meals-grid">
          {paginatedMeals.length > 0 ? (
            paginatedMeals.map((meal) => (
              // meal card component
              <MealCard
                key={meal.idMeal}
                meal={meal}
                onClick={this.handleNavigation}
                onWishlistToggle={this.handleWishlistToggle}
                isWishlisted={this.state.wishList.includes(meal.idMeal)}
              />
            ))
          ) : (
            <div className="No-data-Found-img">
              <img
                src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?format=webp&resize=400x300&vertical=center"
                alt="No data"
              />
              {/* <h2>No meals found</h2> */}
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
