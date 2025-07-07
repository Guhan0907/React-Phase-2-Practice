import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemDetailsFunction from "./pages/ItemDetails/ItemDetails.jsx";
import FilteredItemsByCategoryFunction from "./pages/FilteredItems/FilteredItemsByCategory.jsx";
import CartFunction from "./pages/WishList/WishList.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRoutes from "./constants/Protectedroutes.jsx";
import PageNotFoundFunction from "./pages/PageNotFound.jsx";
import HomeFunction from "./pages/Home/Home.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import AppFunction from "./App.jsx";

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
    element: <AppFunction />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <HomeFunction />
          </ProtectedRoutes>
        ),
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
    path: "*",
    element: <PageNotFoundFunction />,
  },
]);

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <ThemeProvider theme={themeObj}>
      <RouterProvider router={rout} />
    </ThemeProvider>
  </ErrorBoundary>
);
