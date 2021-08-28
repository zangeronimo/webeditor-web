import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { SpinnerProvider } from './spinner';
import { InterceptorProvider } from './interceptor';
import { TitleProvider } from './title';

const Hooks: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <SpinnerProvider>
        <InterceptorProvider>
          <TitleProvider>{children}</TitleProvider>
        </InterceptorProvider>
      </SpinnerProvider>
    </ToastProvider>
  </AuthProvider>
);

export default Hooks;
