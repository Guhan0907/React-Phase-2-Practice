import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CountProvider } from "./components/countContext.tsx";
import { Counter } from "./components/Counter.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  // <Provider store={store}>
  <Provider store={store}>
    {/* {console.log("store", store.getState())} */}
    <CountProvider>
      <App />
      <Counter />
    </CountProvider>
  </Provider>,
);
