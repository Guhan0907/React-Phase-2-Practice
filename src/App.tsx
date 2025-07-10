import { useState, type SetStateAction } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useCount } from "./components/countContext";
import { useDispatch, useSelector } from "react-redux";
import { increment, type incrementAction } from "./redux/action";
import type { Dispatch, AnyAction } from "redux";

function App() {
  const { count, setCount } = useCount();
  // const count = useSelector((state) => state.count)
  const dispatch = useDispatch<Dispatch<incrementAction>>();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}> */}
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
