import { createContext, useContext, useState, type ReactNode } from "react";

interface user {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const contextUser = createContext<user | undefined>(undefined); // context created

export const CountProvider = ({ children }: { children: ReactNode }) => {
  // like the protected routes were used to wrap the component
  const [count, setCount] = useState(0);
  //   console.log("Inside the provider => ", count);
  return (
    <contextUser.Provider value={{ count, setCount }}>
      {children}
    </contextUser.Provider>
  );
};

export const useCount = () => {
  // get the values in the correct order
  const context = useContext(contextUser);

  if (context === undefined) throw new Error("The count is usdefined here");

  return context;
};
