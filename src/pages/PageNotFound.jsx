import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

class PageNotFound extends Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://deep-image.ai/blog/content/images/2024/04/e8b03cd2-bbf1-4153-9e33-403a2e0f8ea3-generated.png"
          alt="Page Not Found"
          style={{
            maxWidth: "400px",
            width: "100%",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        />
        <h2>We can't seem to find the page you're looking for...</h2>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.props.navigate(-1)}
          sx={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "13px",
            backgroundColor: "violet",
            "&:hover": {
              backgroundColor: "#9c27b0",
            },
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

function PageNotFoundFunction(props) {
  const navigate = useNavigate();

  return <PageNotFound {...props} navigate={navigate} />;
}

export default PageNotFoundFunction;
