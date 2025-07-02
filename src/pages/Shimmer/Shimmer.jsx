import React, { Component } from "react";
import "./Shimmer.css";

class Shimmer extends Component {
  render() {
    // Render 8 shimmer cards
    const shimmerCards = Array.from({ length: 8 }).map((_, i) => (
      <div className="meals-card shimmer-card" key={i}>
        <div className="shimmer shimmer-image" />
        <div className="shimmer shimmer-line" style={{ width: "80%" }} />
        <div className="shimmer shimmer-line" style={{ width: "60%" }} />
      </div>
    ));

    return (
      <div className="meals-container">
        <h1 className="meals-heading">Loading Meals...</h1>
        <div className="meals-grid">{shimmerCards}</div>
      </div>
    );
  }
}

export default Shimmer;
