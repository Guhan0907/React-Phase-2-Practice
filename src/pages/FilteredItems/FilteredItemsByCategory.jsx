// import React, { Component } from "react";
// // import "./Home.css";
// // import { countries } from "../../constants/homeConstants";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// class FilteredItemsByCategory extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       meals: [],
//       loading: true,
//       error: null,
//       selectedCountry: "",
//       selectedType: "",
//       filteredMeals: [],
//     };
//   }

// //   async componentDidMount() {
// //     try {
// //       const response = await axios.get(
// //         "https://www.themealdb.com/api/json/v1/1/search.php?s="
// //       );

// //       const data = response.data;

// //       this.setState(
// //         { meals: data.meals || [], loading: false },
// //         this.applyFilters
// //       );
// //     } catch (error) {
// //       this.setState({ error: error.message, loading: false });
// //     }
// //   }


// //   async componentDidMount() {
// //     const {locate , params , navigate} = this.state;

// //     if (locate?.state?.meal)
// //   }

// //   applyFilters = () => {
// //     const { meals, selectedCountry, selectedType } = this.state;

// //     const filtered = meals.filter((meal) => {
// //       const matchesCountry = selectedCountry
// //         ? meal.strArea === selectedCountry
// //         : true;

// //       const isVeg = meal.strCategory?.includes("Vegetarian");
// //       const matchesType =
// //         selectedType === "Vegetarian"
// //           ? isVeg
// //           : selectedType === "Non-Vegetarian"
// //           ? !isVeg
// //           : true;

// //       return matchesCountry && matchesType;
// //     });

// //     this.setState({ filteredMeals: filtered });
// //   };

//   handleNavigation = (meal) => {
//     console.log("Navigate to meal:", meal);
//     this.props.navigate(`/meals/${meal.idMeal}`, { state: { meal } });
//   };

//   render() {
//     const {
//       meals,
//       loading,
//       error,
//       selectedCountry,
//       selectedType,
//       filteredMeals,
//     } = this.state;

//     if (loading) return <h1>Loading...</h1>;
//     if (error) return <p className="meals-error">Error: {error}</p>;

//     // const displayMeals = filteredMeals.length > 0 ? filteredMeals : meals;
//     const displayMeals = filteredMeals;

//     if (displayMeals.length === 0) {
//       // console.log("Onnum illa da")
//       return (
//         <div className="No-data-Found-img">
//           <img
//             src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?format=webp&resize=400x300&vertical=center"
//             alt="No data"
//           />
//           <h2>No meals found</h2>
//           <button
//             onClick={() =>
//               this.setState(
//                 { selectedCountry: "", selectedType: "" },
//                 this.applyFilters
//               )
//             }
//             className="reset-filters-btn"
//           >
//             Reset Filters
//           </button>
//         </div>
//       );
//     }

//     return (
//       <div className="meals-container">
//         <h1 className="meals-heading">Filtered Meal List</h1>

//         {/* <div className="filter-box">
//           <h3>Filter Meals</h3>

//           <label>Country:</label>

//           <select
//             value={selectedCountry}
//             onChange={(e) => this.setState({ selectedCountry: e.target.value })}
//           >
//             <option value="">All</option>
//             {countries.map((country) => (
//               <option key={country} value={country}>
//                 {country}
//               </option>
//             ))}
//           </select>

//           <label>Type:</label>
//           <select
//             value={selectedType}
//             onChange={(e) => this.setState({ selectedType: e.target.value })}
//           >
//             <option value="">All</option>
//             <option value="Vegetarian">Vegetarian</option>
//             <option value="Non-Vegetarian">Non-Vegetarian</option>
//           </select>

//           <button onClick={this.applyFilters} className="filter-done-btn">
//             Done
//           </button>
//         </div> */}

//         <div className="meals-grid">
//           {displayMeals.map((meal) => (
//             <div
//               key={meal.idMeal}
//               className="meals-card"
//               onClick={() => this.handleNavigation(meal)}
//               style={{ cursor: "pointer" }}
//             >
//               <img
//                 src={meal.strMealThumb}
//                 alt={meal.strMeal}
//                 className="meals-image"
//               />
//               <div className="meals-card-content">
//                 <h3 className="meals-title">{meal.strMeal}</h3>
//                 <p className="meals-category">{meal.strCategory}</p>
//                 <p className="meals-area">{meal.strArea}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// function FilteredItemsByCategoryFunction(props) {
//   const navigation = useNavigate();
//   const params = useParams();
//   const location = useLocation();

//   return <Home {...props} navigate={navigation} params = {params} locate = {location} />;
// }

// export default FilteredItemsByCategoryFunction;



import React, { Component } from "react";
import "../Home/Home.css"; // reuse Home styles  
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { countries } from "../../constants/homeConstants";

class FilteredItemsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const { params } = this.props;
    const categoryName = params.str;
    const isCountry = countries.includes(categoryName);

    const url = isCountry
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${categoryName}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;

    try {
    // if (categoryName.)
      const response = await axios.get(
        // `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
        url
      );
      const data = response.data;
    //   console.log("-----------" , data, "=======")
    console.log("name => ",this.props.params.str)

      if (data.meals) {
        this.setState({ meals: data.meals, loading: false });
        console.log("Data iruku da")
      } else {
        this.setState({ error: "No meals found in this category", loading: false });
        console.log("Data illa da--------")
      }
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  handleNavigation = (meal) => {
    this.props.navigate(`/meals/${meal.idMeal}`, { state: { meal } });
  };

  render() {
    const { meals, loading, error } = this.state;

    if (loading) return <h1>Loading...</h1>;
    if (error) {
      return (
        <div className="no-details">
          <h2>{error}</h2>
        </div>
      );
    }

    return (
      <div className="meals-container">
        <h1 className="meals-heading">Meals in {this.props.params.str}</h1>

        <div className="meals-grid">
          {meals.map((meal) => (
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
      </div>
    );
  }
}

// Wrapper to pass hooks into class component
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
