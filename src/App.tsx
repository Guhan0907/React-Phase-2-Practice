import "./App.css";
import { useCount } from "./components/countContext";
import { useDispatch } from "react-redux";
import { fetchUsers, increment, setUser } from "./redux/action";
import type { Dispatch } from "redux";

function App() {
  const { count, setCount } = useCount();
  const dispatch = useDispatch<Dispatch<any>>();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}> */}
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <button onClick={() => dispatch(setUser("Gojo Satoru"))}>
          {" "}
          Name Change{" "}
        </button>
        <button onClick={() => dispatch(fetchUsers())}> Name Adding </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
