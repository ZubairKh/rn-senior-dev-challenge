import React from 'react';
import { View } from 'react-native';

import { weatherDashboardHeaderStyles } from './WeatherDashboardHeader.styles';
import { WeatherDashboardRefreshButton } from './WeatherDashboardRefreshButton';
import { WeatherDashboardSignOutButton } from './WeatherDashboardSignOutButton';

export type WeatherDashboardActionsProps = {
  lastUpdatedLabel: string;
  onRefresh: () => void;
  onSignOut: () => void;
  disableRefresh?: boolean;
  isRefreshing?: boolean;
  disableSignOut?: boolean;
  isSignOutProcessing?: boolean;
};

export const WeatherDashboardActions: React.FC<WeatherDashboardActionsProps> = ({
  lastUpdatedLabel,
  onRefresh,
  onSignOut,
  disableRefresh = false,
  isRefreshing = false,
  disableSignOut = false,
  isSignOutProcessing = false,
}) => {
  return (
    <View style={weatherDashboardHeaderStyles.actionsRow}>
      <WeatherDashboardRefreshButton
        label={isRefreshing ? 'Refreshing…' : lastUpdatedLabel}
        onPress={onRefresh}
        disabled={disableRefresh || isRefreshing}
      />

      <WeatherDashboardSignOutButton
        onPress={onSignOut}
        disabled={disableSignOut}
        isProcessing={isSignOutProcessing}
      />
    </View>
  );
};
