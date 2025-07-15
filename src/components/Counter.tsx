import { useSelector } from "react-redux";
// import { useCount } from "./countContext";

export const Counter = () => {
  // const { count, setCount } = useCount();
  const { count } = useSelector((state: any) => ({
    count: state.counterReducer.count,
  }));

  const { letter } = useSelector((state: any) => ({
    letter: state.userReducer.users,
  }));

  const { values } = useSelector((state: any) => ({
    values: state.persistReducerVal.users,
  }));
  var letterSize = letter.length;
  return (
    <div className="text-center mt-3">
      <h2 className="text-2xl">Counter Component</h2>
      <p className="text-lg">Current Count: {count}</p>
      <p className="text-lg"> Current Name: {letter[letterSize - 1]}</p>
      <p className="text-lg"> Next Name: {values}</p>
    </div>
  );
};
