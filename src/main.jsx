import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ItemDetailsFunction from './pages/ItemDetails/ItemDetails.jsx';
import FilteredItemsByCategoryFunction from './pages/FilteredItems/FilteredItemsByCategory.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const rout = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/meals/:id',
    element: <ItemDetailsFunction />,
  },
  {
    path : "/category/:str",
    element : <FilteredItemsByCategoryFunction />
  }
]);

const themeObj = createTheme({
  palette: {
    primary: {
      main: '#720bb3',
    },
    secondary: {
      main: '#a8a432',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={themeObj}>
      <RouterProvider router={rout} />
    </ThemeProvider>
  </StrictMode>
);
