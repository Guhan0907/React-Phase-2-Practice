import React, { Component } from "react";
import { Outlet } from "react-router-dom";
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
