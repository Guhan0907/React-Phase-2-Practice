import React, { Component } from "react";
import "./components.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SignUpFields = [
  {
    name: "userName",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Re-enter your password",
  },
];

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {
        userName: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
      helperText: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      touched: {
        userName: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  validateField = (field) => {
    const { userName, email, password, confirmPassword } = this.state;
    let errors = this.state.errors;
    let helperText = this.state.helperText;
    let touched = this.state.touched;
    let isValid = true;

    switch (field) {
      case "userName":
        if (!userName.trim()) {
          errors.userName = true;
          helperText.userName = "Username is required";
          isValid = false;
          touched.userName = true;
        } else {
          errors.userName = false;
          helperText.userName = "";
          touched.userName = false;
        }

        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.email = true;
          helperText.email = "Please enter a valid email";
          isValid = false;
          touched.email = true;
        } else {
          errors.email = false;
          helperText.email = "";
          touched.email = false;
        }

        break;

      case "password":
        if (password.length < 6) {
          errors.password = true;
          helperText.password = "Password must be at least 6 characters";
          isValid = false;
          touched.password = true;
        } else {
          errors.password = false;
          helperText.password = "";
          touched.password = false;
        }

        break;

      case "confirmPassword":
        if (confirmPassword !== password) {
          errors.confirmPassword = true;
          helperText.confirmPassword = "Passwords do not match";
          isValid = false;
          touched.confirmPassword = true;
        } else {
          errors.confirmPassword = false;
          helperText.confirmPassword = "";
          touched.confirmPassword = false;
        }

        break;

      default:
        break;
    }

    this.setState({ errors, helperText, touched });
    return isValid;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.onSignUp(this.state);
    // this.props.onSignUp(this.state);
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Sign Up</h2>
          <Box
            sx={{ "& > :not(style)": { mb: 2, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            {SignUpFields.map(({ name, label, type, placeholder }) => (
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
              onClick={this.handleOnSubmit}
            >
              Sign Up
            </button>
            <br />
            Don you have an account ?{" "}
            <button
              type="submit"
              className="login-button"
              onClick={() => this.props.goToLogin()}
            >
              Login
            </button>
          </Box>
        </div>
      </div>
    );
  }
}

export default SignUp;
