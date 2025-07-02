import React, { Component } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./component.css"

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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      if (password.length < 6) {
        errors.password = true;
        helperText.password = "Password must be at least 6 characters";
        touched.password = true;
        isValid = false;
      } else {
        errors.password = false;
        helperText.password = "";
      }

      // Re-check confirmPassword when password changes
      if (confirmPassword && confirmPassword !== password) {
        errors.confirmPassword = true;
        helperText.confirmPassword = "Passwords do not match";
        touched.confirmPassword = true;
      } else if (confirmPassword && confirmPassword === password) {
        errors.confirmPassword = false;
        helperText.confirmPassword = "";
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


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

   handleOnSubmit = (e) => {
  e.preventDefault();

  const fields = ["userName", "email", "password", "confirmPassword"];
  const allValid = fields.every((field) => this.validateField(field));

  if (allValid) {
    this.props.onSignUp(this.state);
  }
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
            Do you have an account ?{" "}
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
