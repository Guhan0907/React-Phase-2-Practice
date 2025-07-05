import React, { Component } from "react";
import { Chip, Stack, Avatar } from "@mui/material";

class Filter extends Component {
  render() {
    const {
      categories = [],
      selectedCategory = "",
      onCategorySelect = () => {},
      countries = [], // default to empty array
      selectedCountry = "",
      onCountrySelect = () => {},
    } = this.props;

    // console.log("coinuhuhihhiuhiuh  => ", countries.length);

    return (
      <div>
        {/* Categories Filter */}
        {categories.length > 0 && (
          // <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          <div className="category-chip-scroll">
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'nowrap' }}>

            <Chip
              label="All"
              onClick={() => onCategorySelect("")}
              color={selectedCategory === "" ? "primary" : "default"}
              variant={selectedCategory === "" ? "filled" : "outlined"}
            />
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.strCategory;
              return (
                <Chip
                  key={cat.idCategory}
                  label={cat.strCategory}
                  onClick={() => onCategorySelect(cat.strCategory)}
                  onDelete={isSelected ? () => onCategorySelect("") : undefined}
                  color={isSelected ? "primary" : "default"}
                  variant={isSelected ? "filled" : "outlined"}
                />
              );
            })}
          </Stack>
          </div>
        )}

        {/* Country Filter */}
        <div className="flag-chip-row">
          {countries.length > 0 && (
            <>
              <Chip
                label="All"
                onClick={() => onCountrySelect("")}
                color={selectedCountry === "" ? "primary" : "default"}
                variant={selectedCountry === "" ? "filled" : "outlined"}
              />
              {countries.map((country) => {
                const isSelected = selectedCountry === country.demonym;
                return (
                  <Chip
                    key={country.country}
                    avatar={
                      <Avatar
                        src={country.flag_svg_url}
                        alt={country.country}
                        sx={{ width: 24, height: 24 }}
                      />
                    }
                    label={country.country}
                    onClick={() => onCountrySelect(country.demonym)}
                    onDelete={
                      isSelected ? () => onCountrySelect("") : undefined
                    }
                    color={isSelected ? "primary" : "default"}
                    variant={isSelected ? "filled" : "outlined"}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Filter;
