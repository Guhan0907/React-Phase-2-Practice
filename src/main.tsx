import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CountProvider } from "./components/countContext.tsx";
import { Counter } from "./components/Counter.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  // <Provider store={store}>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CountProvider>
        <App />
        <Counter />
      </CountProvider>
    </PersistGate>
  </Provider>,
);
