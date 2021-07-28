import React, { createContext, useContext, useEffect } from "react";
import api from "../services/api";
import { useSpinner } from "./spinner";

const InterceptorContext = createContext({});

const InterceptorProvider: React.FC = ({ children }) => {
  const { showSpinner } = useSpinner();

  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        showSpinner(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => {
        showSpinner(false);
        return response;
      },
      (error) => {
        showSpinner(false);
        return Promise.reject(error);
      }
    );
  }, [showSpinner]);

  return (
    <InterceptorContext.Provider value={{}}>
      {children}
    </InterceptorContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useInterceptor() {
  const context = useContext(InterceptorContext);

  if (!context) {
    throw new Error("useInterceptor must be used within a InterceptorProvider");
  }

  return context;
}

export { InterceptorProvider, useInterceptor };
