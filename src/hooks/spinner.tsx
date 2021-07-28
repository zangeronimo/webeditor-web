import React, { createContext, useCallback, useContext, useState } from "react";
import { Spinner } from "../components/Spinner";

type SpinnerContextData = {
  showSpinner: (start: boolean) => void;
};

const SpinnerContext = createContext({} as SpinnerContextData);

const SpinnerProvider: React.FC = ({ children }) => {
  const [start, setStart] = useState(false);

  const showSpinner = useCallback((value: boolean) => {
    setStart(value);
  }, []);

  return (
    <SpinnerContext.Provider value={{ showSpinner }}>
      {start && <Spinner />}
      {children}
    </SpinnerContext.Provider>
  );
};

function useSpinner(): SpinnerContextData {
  const context = useContext(SpinnerContext);

  if (!context) {
    throw new Error("useSpinner must be used within a SpinnerProvider");
  }

  return context;
}

export { SpinnerProvider, useSpinner };
