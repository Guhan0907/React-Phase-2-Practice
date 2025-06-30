import React, { Component } from "react";
import "./components.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// button
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
const LoginFields = [
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
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: false,
        password: false,
      },
      helperText: {
        email: "",
        password: "",
      },
      touched: {
        email: false,
        password: false,
      },
    };
  }

  validateForm = (field) => {
    const { email, password, touched } = this.state;
    let errors = this.state.errors;
    let helperText = this.state.helperText;
    let touchedState = this.state.touched;
    let isValid = true;

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = true;
        helperText.email = "Please enter a valid email";
        isValid = false;
        touchedState.email = true;
      } else {
        errors.email = false;
        helperText.email = "";
        touched.email = false;
      }
    }

    if (field === "password") {
      if (password.length < 6) {
        errors.password = true;
        helperText.password = "Password should be at least 6 characters";
        isValid = false;
        touched.password = true;
      } else {
        errors.password = false;
        helperText.password = "";
        touched.password = false;
      }
      // touchedState.password = true;
    }

    this.setState({ errors, helperText, touched: touchedState });
    return isValid;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", this.state);
    this.props.onLogin(this.state);
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <Box
            sx={{ "& > :not(style)": { mb: 2, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            {LoginFields.map(({ name, label, type, placeholder }) => (
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
                error={this.state.errors[name]}
                helperText={this.state.helperText[name]}
                onBlur={() => this.validateForm(name)}
              />
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <button
                type="submit"
                className="login-button"
                onClick={this.handleOnSubmit}
              >
                Login
              </button>
              <br />
              Don't you have an account ?{" "}
              <button
                type="submit"
                className="login-button"
                onClick={() => this.props.goToSignUp()}
              >
                Sign Up
              </button>
            </Box>
            {/* <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                  />
                }
                label="Label"
              />
              <FormControlLabel
                required
                control={<Switch />}
                label="Required"
              />
              <FormControlLabel
                disabled
                control={<Switch />}
                label="Disabled"
              />
            </FormGroup> */}
          </Box>
        </div>
      </div>
    );
  }
}

export default Login;

// import * as React from 'react';

// export default function SwitchLabels() {
//   return (

//   );
// }
