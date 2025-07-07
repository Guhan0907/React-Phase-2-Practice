import React, { Component } from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

class Filter extends Component {
  render() {
    const {
      categories = [],
      selectedCategory = "",
      onCategorySelect = () => {},
      countries = [],
      selectedCountry = "",
      onCountrySelect = () => {},
    } = this.props;

    return (
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
        width="100%"
      >
        {/* Category Dropdown */}
        {categories.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => onCategorySelect(e.target.value)}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.idCategory} value={cat.strCategory}>
                  {cat.strCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Country Dropdown */}
        {countries.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={selectedCountry}
              onChange={(e) => onCountrySelect(e.target.value)}
              label="Country"
            >
              <MenuItem value="">All</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.country} value={country.demonym}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
    );
  }
}

export default Filter;
