import React, { Component } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HeaderFunction from "./pages/Header/Header";
import SigninPageWrapper from "./components/LoginSignup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount() {
    const email = localStorage.getItem("email");
    if (email) {
      this.setState({ isUserLogged: true });
    }
  }

  handleLoginStatusChange = (status) => {
    this.setState({ isUserLogged: status });
  };

  validateCredentials = (email, password) => {
    const user = this.state.users.find(
      (x) => x.email === email && x.password === password,
    );
    return !!user;
  };

  registerNewUser = ({ userName, email, password }) => {
    const { users } = this.state;
    const userExists = users.find((x) => x.email === email);
    if (userExists) {
      alert("User already exists.");
      return false;
    }

    const newUser = { userName, email, password };
    this.setState({ users: [...users, newUser] });
    return true;
  };

  handleLogout = () => {
    this.setState({ isUserLogged: false });
  };

  render() {
    const { isUserLogged } = this.state;

    return (
      <>
        {isUserLogged ? (
          <>
            {/* <HeaderFunction /> */}
            <HeaderFunction onLogout={this.handleLogout} />

            <Outlet />
          </>
        ) : (
          <SigninPageWrapper
            onLoginStatusChange={this.handleLoginStatusChange}
            validateCredentials={this.validateCredentials}
            registerUser={this.registerNewUser}
          />
        )}
      </>
    );
  }
}

function AppFunction(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return <App {...props} navigate={navigate} location={location} />;
}

export default AppFunction;
