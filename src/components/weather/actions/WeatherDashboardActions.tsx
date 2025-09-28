import React from 'react';
import { View } from 'react-native';

import { weatherDashboardHeaderStyles } from './WeatherDashboardHeader.styles';
import { WeatherDashboardRefreshButton } from './WeatherDashboardRefreshButton';
import { WeatherDashboardSignOutButton } from './WeatherDashboardSignOutButton';

export const WeatherDashboardActions: React.FC = () => {
  return (
    <View style={weatherDashboardHeaderStyles.actionsRow}>
      <WeatherDashboardRefreshButton />
      <WeatherDashboardSignOutButton />
    </View>
  );
};
