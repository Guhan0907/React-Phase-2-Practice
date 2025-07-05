import React, { Component } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import HomeFunction from "./Home/Home";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isUserLogged: localStorage.getItem("email") ? true : false,
      users: [
        {
          userName: "Gojo",
          email: "hello@gmail.com",
          password: "123456",
        },
      ],
    };
  }

  handleLogin = (obj) => {
    const user = this.state.users;
    const userExists = user.find(
      (x) => x.email === obj.email && x.password === obj.password
    );

    if (userExists) {
      localStorage.setItem("email", obj.email);

      this.setState({ isLogin: true, isUserLogged: true }, () => {
        this.props.navigate("/"); // redirect to home
        console.log(".............................");
      });
    } else if (obj.email === "") {
      alert("Enter the Details");
    } else {
      alert("Invalid Credentials");
    }
  };

  handleSignUp = (obj) => {
    const { users } = this.state;

    const userExists = users.find((x) => x.email === obj.email);

    if (userExists) alert("User Already Present");
    else if (obj.email === "") {
      alert("Enter the Details");
    } else {
      let data = {
        userName: obj.userName,
        email: obj.email,
        password: obj.password,
      };
      this.setState({
        users: [...users, data],
        isLogin: true,
        isUserLogged: true,
      });
      localStorage.setItem("email", data.email);
      this.props.navigate("/");
    }
  };

  handleToggle = () => {
    var temp = !this.state.isLogin;
    this.setState({ isLogin: temp });
  };

  render() {
    // if (this.state.isUserLogged && this.props.location.pathname === "/login") {
    //   this.props.navigate("/");
    //   console.log("Pathname  =>> ",this.props.location.pathname)
    //   return null; // Prevent rendering anything else during redirect
    // }

    return (
      <>
        <div>
          {this.state.isUserLogged ? (
            <HomeFunction logout={this.handleLogout} />
          ) : this.state.isLogin ? (
            <Login onLogin={this.handleLogin} goToSignUp={this.handleToggle} />
          ) : (
            <SignUp
              onSignUp={this.handleSignUp}
              goToLogin={this.handleToggle}
            />
          )}
        </div>
      </>
    );
  }
}

function AuthenticationFunction(props) {
  const navigate = useNavigate();
  const location = useLocation()
  return <Authentication {...props} navigate={navigate} location={location}/>;
}

export default AuthenticationFunction;
