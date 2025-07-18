import { createRoot } from "react-dom/client";
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
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Home from "./pages/Home/Home.jsx";

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

const router = createBrowserRouter([
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

// it() => {
//   mockLocalSTorage = () => email{}
//   mockAPI() => return mockData;
//   <P store={{}}>
//     renderMainjSX();
//   </P>
//   mockHistory.push(/wishlist)
//   expect path to be /wishlist
//   expect cards to be rendered with mockData
//   remove from wishlist
//   not to be or query by null -> card removed?
//   click Home
//   expect path to be on home && home container
// }

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={themeObj}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>,
);
