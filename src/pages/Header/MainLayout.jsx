import React, { Component } from "react";
import { Outlet, Navigate } from "react-router-dom";
import HeaderFunction from "./Header";

class MainLayout extends Component {
  render() {
    return (
      <>
        <HeaderFunction />
        <Outlet />
      </>
    );
  }
}

export default MainLayout;


// import React, { Component } from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import HeaderFunction from "./Header";

// class MainLayout extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoggedIn: localStorage.getItem("email") !== null,
//     };
//   }

//   handleLoginStatusChange = (status) => {
//     this.setState({ isLoggedIn: status });
//   };

//   render() {
//     return (
//       <>
//         <HeaderFunction
//           isLoggedIn={this.state.isLoggedIn}
//           onLoginStatusChange={this.handleLoginStatusChange}
//         />
//         <Outlet context={{ onLoginStatusChange: this.handleLoginStatusChange }} />
//       </>
//     );
//   }
// }

// export default MainLayout;
