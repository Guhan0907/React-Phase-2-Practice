import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CountProvider } from "./components/countContext.tsx";
import { Counter } from "./components/Counter.tsx";
// import ContextA
// import ContextApiChecking from './components/countContext.tsx'

createRoot(document.getElementById("root")!).render(
  <CountProvider>
    <App />
    <Counter />
  </CountProvider>,
);
