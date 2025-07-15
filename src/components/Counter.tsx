// import { useSelector } from "react-redux";

// export const Counter = () => {
//   // const { count, setCount } = useCount();
//   const { count } = useSelector((state: any) => ({
//     count: state.counterReducer.count,
//   }));

//   const { letter } = useSelector((state: any) => ({
//     letter: state.userReducer.users,
//   }));

//   const { values } = useSelector((state: any) => ({
//     values: state.persistReducerVal.users,
//   }));
//   var letterSize = letter.length;
//   return (
//     <div className="text-center mt-3">
//       <h2 className="text-2xl">Counter Component</h2>
//       <p className="text-lg">Current Count: {count}</p>
//       <p className="text-lg"> Current Name: {letter[letterSize - 1]}</p>
//       <p className="text-lg"> Next Name: {values}</p>
//     </div>
//   );
// };

import { useCallback, useMemo } from "react";
import Child from "./Child";
import { useSelector } from "react-redux";

export const Counter = () => {
  const count = useSelector((state: any) => state.counterReducer.count);
  const letter = useSelector((state: any) => state.userReducer.users);
  const values = useSelector((state: any) => state.persistReducerVal.users);

  // useMemo to memoize expensive or derived values
  const letterSize = useMemo(() => letter.length, [letter]);

  const currentName = useMemo(() => {
    console.log("changes are done .......");
    console.log(letter);

    return letterSize > 0 ? letter : "N/A";
  }, [letter, letterSize]);

  console.log(" is the app re-rendered 🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️");

  const handleFunction = useCallback(() => {
    console.log("This is the call from child ");
  }, []);

  return (
    <div className="text-center mt-3">
      <h2 className="text-2xl">Counter Component</h2>
      <p className="text-lg">Current Count: {count}</p>
      <p className="text-lg">Current Name: {currentName}</p>
      <p className="text-lg">Next Name: {values} </p>
      <Child handleFunction={handleFunction} />
    </div>
  );
};
