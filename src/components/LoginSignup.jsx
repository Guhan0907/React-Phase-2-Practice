import React, { Component } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import "./component.css";
import {
  LoginFields,
  SignUpFields,
  emailRegex,
  strongPasswordRegex,
} from "../constants/homeConstants";

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      email: "",
      password: "",
      userName: "",
      confirmPassword: "",
      errors: {},
      helperText: {},
      touched: {},
    };
  }

  toggleMode = () => {
    this.setState({
      isLogin: !this.state.isLogin,
      errors: {},
      helperText: {},
      touched: {},
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateField = (field) => {
    const { userName, email, password, confirmPassword } = this.state;
    let errors = { ...this.state.errors };
    let helperText = { ...this.state.helperText };
    let touched = { ...this.state.touched };
    let isValid = true;

    switch (field) {
      case "userName":
        if (!userName.trim()) {
          errors.userName = true;
          helperText.userName = "Username is required";
          touched.userName = true;
          isValid = false;
        } else {
          errors.userName = false;
          helperText.userName = "";
        }
        break;

      case "email":
        if (!emailRegex.test(email)) {
          errors.email = true;
          helperText.email = "Please enter a valid email";
          touched.email = true;
          isValid = false;
        } else {
          errors.email = false;
          helperText.email = "";
        }
        break;

      case "password":
        if (this.state.isLogin) {
          if (password.length < 6) {
            errors.password = true;
            helperText.password = "Password must be at least 6 characters";
            touched.password = true;
            isValid = false;
          } else {
            errors.password = false;
            helperText.password = "";
          }
        } else {
          if (!strongPasswordRegex.test(password)) {
            errors.password = true;
            helperText.password =
              "Must be 6+ chars with letters, numbers & special characters";
            touched.password = true;
            isValid = false;
          } else {
            errors.password = false;
            helperText.password = "";
          }

          if (confirmPassword && confirmPassword !== password) {
            errors.confirmPassword = true;
            helperText.confirmPassword = "Passwords do not match";
          } else {
            errors.confirmPassword = false;
            helperText.confirmPassword = "";
          }
        }
        break;

      case "confirmPassword":
        if (confirmPassword !== password) {
          errors.confirmPassword = true;
          helperText.confirmPassword = "Passwords do not match";
          touched.confirmPassword = true;
          isValid = false;
        } else {
          errors.confirmPassword = false;
          helperText.confirmPassword = "";
        }
        break;

      default:
        break;
    }

    this.setState({ errors, helperText, touched });
    return isValid;
  };

  validateLoginForm = () => {
    return this.validateField("email") & this.validateField("password");
  };

  validateSignUpForm = () => {
    return (
      this.validateField("userName") &
      this.validateField("email") &
      this.validateField("password") &
      this.validateField("confirmPassword")
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.isLogin) {
      const isValid = this.validateLoginForm();
      if (isValid) {
        localStorage.setItem("email", this.state.email);
        this.props.onLoginStatusChange(true);
        this.props.navigate("/");
      }
    } else {
      const isValid = this.validateSignUpForm();
      if (isValid) {
        localStorage.setItem("email", this.state.email);
        this.props.onLoginStatusChange(true);
        this.props.navigate("/");
      }
    }
  };

  render() {
    const { isLogin } = this.state;
    const fields = isLogin ? LoginFields : SignUpFields;

    return (
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">{isLogin ? "Login" : "Sign Up"}</h2>
          <Box
            sx={{ "& > :not(style)": { mb: 2, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            {fields.map(({ name, label, type, placeholder }) => (
              <TextField
                key={name}
                name={name}
                label={label}
                type={type}
                placeholder={placeholder}
                variant="outlined"
                size="small"
                value={this.state[name]}
                onChange={this.handleChange}
                onBlur={() => this.validateField(name)}
                error={this.state.errors[name]}
                helperText={this.state.helperText[name]}
              />
            ))}

            <button
              type="submit"
              className="login-button"
              onClick={this.handleSubmit}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <br />
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button className="login-button" onClick={this.toggleMode}>
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button className="login-button" onClick={this.toggleMode}>
                  Login
                </button>
              </>
            )}
          </Box>
        </div>
      </div>
    );
  }
}

function SigninPageWrapper(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return <SigninPage {...props} navigate={navigate} location={location} />;
}

export default SigninPageWrapper;
