import { useCount } from "./countContext";

export const Counter = () => {
  const { count, setCount } = useCount();
  return (
    <div className="text-center mt-3">
      <h2 className="text-2xl">Counter Component</h2>
      <p className="text-lg">Current Count: {count}</p>
      {/* <button
        onClick={() => setCount((prev) => prev + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Increase Count
      </button> */}
    </div>
  );
};
