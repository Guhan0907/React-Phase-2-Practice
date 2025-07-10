import { useSelector } from "react-redux";
import { useCount } from "./countContext";

export const Counter = () => {
  // const { count, setCount } = useCount();
  const { count } = useSelector((state: any) => ({
    count: state.counterReducer.count,
  }));

  const {letter} = useSelector((state : any) => ({
    letter : state.userReducer.users
  }))
  return (
    <div className="text-center mt-3">
      <h2 className="text-2xl">Counter Component</h2>
      <p className="text-lg">Current Count: {count}</p>
      <p className="text-lg"> Current Name: {letter}</p>
      {/* <button
        onClick={() => setCount((prev) => prev + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Increase Count
      </button> */}
    </div>
  );
};
