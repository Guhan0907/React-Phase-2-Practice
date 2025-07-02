import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
class Header extends Component {
  handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("wishlist");
    window.location.reload();
  };

  render() {
    const { navigate } = this.props;

    return (
      <div className="header">
        <div className="header-left" onClick={() => navigate("/")}>
          <h1 className="header-title">Feast Feed</h1>
        </div>

        <div className="header-right">
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate("/wishlist")}
            startIcon={<FavoriteIcon />}
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#fce4ec", // light pink background on hover
                color: "#e91e63", // pink text/icon
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
        </div>
      </div>
    );
  }
}

function HeaderFunction(props) {
  const navigate = useNavigate();
  return <Header {...props} navigate={navigate} />;
}

export default HeaderFunction;
