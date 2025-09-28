import React from 'react';

import { AuthProvider } from './AuthContext';
import { WeatherProvider } from './WeatherContext';

export const AppProviders: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AuthProvider>
    <WeatherProvider>{children}</WeatherProvider>
  </AuthProvider>
);
