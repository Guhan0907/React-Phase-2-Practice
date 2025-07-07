import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

class Header extends Component {
  handleLogout = () => {
    const email = localStorage.getItem("email");
    if (email) {
      localStorage.removeItem("email");
      localStorage.removeItem(`wishlist`);
      localStorage.removeItem(`hasReloaded`);
    }
    this.props.onLogout();
    // window.location.reload();
  };

  render() {
    const { navigate, location } = this.props;
    const isLoggedIn = localStorage.getItem("email") !== null;

    return (
      <div className="header">
        <div className="header-left">
          {!(
            location.pathname === "/" &&
            (location.search === "" || location.search.startsWith("?query="))
          ) && (
            <ArrowBackIcon
              onClick={() => window.history.back()}
              sx={{
                cursor: "pointer",
                mr: 1,
                color: "#333",
                "&:hover": { color: "#1565c0" },
              }}
            />
          )}
          <h1
            className="header-title"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Feast Feed
          </h1>
        </div>

        <div className="header-right">
          {isLoggedIn && (
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate("/wishlist")}
                startIcon={<FavoriteIcon />}
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#fce4ec",
                    color: "#e91e63",
                    borderColor: "#e91e63",
                  },
                }}
              >
                Wishlist
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={this.handleLogout}
                color="inherit"
                sx={{
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "red",
                  },
                }}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
}

function HeaderFunction(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return <Header {...props} navigate={navigate} location={location} />;
}

export default HeaderFunction;
