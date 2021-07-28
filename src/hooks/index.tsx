import React from "react";

import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";
import { SpinnerProvider } from "./spinner";
import { InterceptorProvider } from "./interceptor";

const Hooks: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <SpinnerProvider>
        <InterceptorProvider>{children}</InterceptorProvider>
      </SpinnerProvider>
    </ToastProvider>
  </AuthProvider>
);

export default Hooks;
