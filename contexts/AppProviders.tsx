import React from 'react';

import { AuthProvider } from './AuthContext';

export const AppProviders: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);
