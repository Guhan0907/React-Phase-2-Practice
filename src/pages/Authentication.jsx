// import React, { Component } from "react";
// import Login from "../components/Login";
// import SignUp from "../components/SignUp";
// import HomeFunction from "./Home/Home";
// import { useLocation, useNavigate, useNavigation } from "react-router-dom";

// class Authentication extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLogin: false,
//       isUserLogged: localStorage.getItem("email") ? true : false,
//       users: [
//         {
//           userName: "Gojo",
//           email: "hello@gmail.com",
//           password: "123456",
//         },
//       ],
//     };
//   }

//   handleLogin = (obj) => {
//     const user = this.state.users;
//     const userExists = user.find(
//       (x) => x.email === obj.email && x.password === obj.password
//     );

//     if (userExists) {
//       localStorage.setItem("email", obj.email);

//       this.setState({ isLogin: true, isUserLogged: true }, () => {
//         this.props.navigate("/"); // redirect to home
//         console.log(".............................");
//       });
//     } else if (obj.email === "") {
//       alert("Enter the Details");
//     } else {
//       alert("Invalid Credentials");
//     }
//   };

//   handleSignUp = (obj) => {
//     const { users } = this.state;

//     const userExists = users.find((x) => x.email === obj.email);

//     if (userExists) alert("User Already Present");
//     else if (obj.email === "") {
//       alert("Enter the Details");
//     } else {
//       let data = {
//         userName: obj.userName,
//         email: obj.email,
//         password: obj.password,
//       };
//       this.setState({
//         users: [...users, data],
//         isLogin: true,
//         isUserLogged: true,
//       });
//       localStorage.setItem("email", data.email);
//       this.props.navigate("/");
//     }
//   };

//   handleToggle = () => {
//     var temp = !this.state.isLogin;
//     this.setState({ isLogin: temp });
//   };

//   render() {
//     // if (this.state.isUserLogged && this.props.location.pathname === "/login") {
//     //   this.props.navigate("/");
//     //   console.log("Pathname  =>> ",this.props.location.pathname)
//     //   return null; // Prevent rendering anything else during redirect
//     // }

//     return (
//       <>
//         <div>
//           {this.state.isUserLogged ? (
//             <HomeFunction logout={this.handleLogout} />
//           ) : this.state.isLogin ? (
//             <Login onLogin={this.handleLogin} goToSignUp={this.handleToggle} />
//           ) : (
//             <SignUp
//               onSignUp={this.handleSignUp}
//               goToLogin={this.handleToggle}
//             />
//           )}
//         </div>
//       </>
//     );
//   }
// }

// function AuthenticationFunction(props) {
//   const navigate = useNavigate();
//   const location = useLocation()
//   return <Authentication {...props} navigate={navigate} location={location}/>;
// }

// export default AuthenticationFunction;




// recenty edited

import React, { Component } from "react";
import SigninPageWrapper from "../components/Signin-page";
import HomeFunction from "./Home/Home";
import { useLocation, useNavigate } from "react-router-dom";

class Authentication extends Component {
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

  handleLoginStatusChange = (status) => {
    this.setState({ isUserLogged: status });
  };

  validateCredentials = (email, password) => {
    const user = this.state.users.find(
      (x) => x.email === email && x.password === password
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

  componentDidMount() {
    const email = localStorage.getItem("email");
    if (email) {
      this.setState({ isUserLogged: true });
    }
  }

  render() {
    return (
      <>
        {this.state.isUserLogged ? (
          <HomeFunction />
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

function AuthenticationFunction(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return <Authentication {...props} navigate={navigate} location={location} />;
}

export default AuthenticationFunction;























// // Authentication.jsx (optional usage only)
// import React, { Component } from "react";
// import { useNavigate } from "react-router-dom";

// class Authentication extends Component {
//   componentDidMount() {
//     const isLoggedIn = localStorage.getItem("email");
//     if (isLoggedIn) {
//       this.props.navigate("/");
//     } else {
//       this.props.navigate("/login");
//     }
//   }

//   render() {
//     return null; // Nothing to render
//   }
// }

// export default function AuthenticationWrapper(props) {
//   // const { useNavigate } = require("react-router-dom");
//   // const navigate = useNavigate();
//   const navigate = useNavigate();
//   return <Authentication navigate={navigate} {...props} />;
// }

