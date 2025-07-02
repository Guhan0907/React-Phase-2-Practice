import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemDetailsFunction from "./pages/ItemDetails/ItemDetails.jsx";
import FilteredItemsByCategoryFunction from "./pages/FilteredItems/FilteredItemsByCategory.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import CartFunction from "./pages/Cart/Cart.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRoutes from "./constants/Protectedroutes.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import PageNotFoundFunction from "./pages/PageNotFound.jsx";
import Header from "./pages/Header/Header.jsx";
import MainLayout from "./pages/Header/MainLayout.jsx";

const themeObj = createTheme({
  palette: {
    primary: {
      main: "#BA487F",
    },
    secondary: {
      main: "#a8a432",
    },
  },
});

const rout = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "meals/:id",
        element: (
          <ProtectedRoutes>
            <ItemDetailsFunction />
          </ProtectedRoutes>
        ),
      },
      {
        path: "category/:str",
        element: (
          <ProtectedRoutes>
            <FilteredItemsByCategoryFunction />
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoutes>
            <CartFunction />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <PageNotFoundFunction />,
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={themeObj}>
    <RouterProvider router={rout} />
  </ThemeProvider>
);
