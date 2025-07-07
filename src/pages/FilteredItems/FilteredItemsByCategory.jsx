import React, { Component } from "react";
import "../Home/Home.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { countries } from "../../constants/homeConstants";
import { Button, Pagination } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Shimmer from "../Shimmer/Shimmer";
import {
  itemDetailsApi,
  filteredItemsA,
  filteredItemsC,
} from "../../services/apiCalls";

class FilteredItemsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      loading: true,
      error: null,
      page: 1,
      itemsPerPage: 6,
    };
  }

  async componentDidMount() {
    const { params } = this.props;
    const categoryName = params.str;
    const isCountry = countries.includes(categoryName);

    const url = isCountry
      ? filteredItemsA(categoryName)
      : filteredItemsC(categoryName);

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.meals) {
        const fullMeals = await Promise.all(
          data.meals.map(async (meal) =>
            itemDetailsApi(meal.idMeal).then((res) => res.data.meals?.[0]),
          ),
        );

        this.setState({ meals: fullMeals.filter(Boolean), loading: false });
      } else {
        this.setState({
          error: "No meals found in this category",
          loading: false,
        });
      }
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  handleNavigation = (meal) => {
    this.props.navigate(`/meals/${meal.idMeal}`, { state: { meal } });
  };

  handleBack = () => {
    this.props.navigate(-1);
  };

  handlePageChange = (eve, val) => {
    this.setState({ page: val });
  };

  render() {
    const { meals, loading, error, page, itemsPerPage } = this.state;

    if (loading) return <Shimmer />;
    if (error) {
      return (
        <div className="no-details">
          <h2>{error}</h2>
        </div>
      );
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedMeals = meals.slice(startIndex, endIndex);

    const totalPages = Math.ceil(meals.length / itemsPerPage);

    return (
      <div className="meals-container">
        <h1 className="meals-heading">Meals in {this.props.params.str}</h1>

        <div className="meals-grid">
          {paginatedMeals.map((meal) => (
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
              </div>
            </div>
          ))}
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
        </div>
      </div>
    );
  }
}

function FilteredItemsByCategoryFunction(props) {
  const navigation = useNavigate();
  const params = useParams();
  const location = useLocation();

  return (
    <FilteredItemsByCategory
      {...props}
      navigate={navigation}
      params={params}
      locate={location}
    />
  );
}

export default FilteredItemsByCategoryFunction;
