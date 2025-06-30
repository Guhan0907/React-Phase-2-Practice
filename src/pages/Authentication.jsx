// import React, { Component } from "react";
// import Login from "../components/Login";
// import SignUp from "../components/SignUp";
// import Home from "./Home";


// class Authentication extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLogin: true,
//       isUserLogged: (localStorage.getItem("email") ? true : false),
//       users: [
//         {
//           userName: "Gojo",
//           email: "hello@gmail.com", // fixed typo from gmial to gmail
//           password: "123456",
//         },
//       ],
//     };


//   }

//   handleLogin = (obj) => {
//     const user = this.state.users;
//     const userExists = user.find(
//       (x) => x.email === obj.email && x.password === obj.password,
//     );

//     if (userExists) {
//       localStorage.setItem("email" ,obj.email);
//       this.setState({ isLogin: true, isUserLogged: true });
//     } 
//     else if (obj.email === "") {
//       alert("Enter the Details");
//     } else {
//       console.log(obj);
//       alert("Invalid Credentials");
//     }
//   };

//   handleLogout = () => {
//     localStorage.removeItem("email");
//     // <Naviag
//     console.log("-- varutha --")
//   }

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
//       // users = [...users , data];
//       this.setState({
//         users: [...users, data],
//         isLogin: true,
//         // isUserLogged: true,
//       });
//       // this.setState({})
//     }
//   };

//   handleToggle = () => {
//     var temp = !this.state.isLogin;
//     this.setState({ isLogin: temp });
//   };

//   render() {
    
//     return (
//       <>
//         {/* <h1> Hello this is the Authentication Page </h1> */}
//         <div>
//           {this.state.isUserLogged ? (
//             <HomeCompWithHooks  logout = {this.handleLogout}/>
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

// export default Authentication;
