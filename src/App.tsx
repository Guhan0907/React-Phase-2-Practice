import "./App.css";
import { useCount } from "./components/countContext";
import { useDispatch, useSelector } from "react-redux";
import { increment, setUser, type incrementAction } from "./redux/action";
import type { Dispatch, AnyAction } from "redux";

function App() {
  const { count, setCount } = useCount();
  const dispatch = useDispatch<Dispatch<any>>();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}> */}
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <button onClick={() => dispatch(setUser("Gojo Satoru"))} > Name Change </button>
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
