import React, { useCallback, useMemo } from 'react';
import { Alert, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

import { WeatherDashboardActions } from './WeatherDashboardActions';
import { WeatherDashboardGreeting } from './WeatherDashboardGreeting';
import { weatherDashboardHeaderStyles } from './WeatherDashboardHeader.styles';
import { WeatherDashboardHeaderProps } from './WeatherDashboardHeader.types';

export const WeatherDashboardHeader: React.FC<WeatherDashboardHeaderProps> = ({
  name,
  cityCount,
  onLogout,
  isProcessingLogout,
  lastUpdatedLabel,
  onRefresh,
  isRefreshing,
}) => {
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');

  const displayName = useMemo(() => {
    if (!name) {
      return 'there';
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  }, [name]);

  const handleSignOutPress = useCallback(() => {
    if (isProcessingLogout) {
      return;
    }

    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: onLogout },
    ]);
  }, [isProcessingLogout, onLogout]);

  return (
    <View style={weatherDashboardHeaderStyles.wrapper}>
      <ThemedView
        style={[
          weatherDashboardHeaderStyles.heroCard,
          { backgroundColor: surface, borderColor: border },
        ]}
        lightColor={surface}
      >
        <WeatherDashboardGreeting name={displayName} cityCount={cityCount} />
        <ThemedText style={weatherDashboardHeaderStyles.helperText}>
          Tip: pull down on the dashboard or press refresh button below to sync the latest
          data.
        </ThemedText>
        <View style={weatherDashboardHeaderStyles.headerRow}>
          <WeatherDashboardActions
            lastUpdatedLabel={lastUpdatedLabel}
            onRefresh={onRefresh}
            onSignOut={handleSignOutPress}
            isRefreshing={isRefreshing}
            disableSignOut={isProcessingLogout}
            isSignOutProcessing={isProcessingLogout}
          />
        </View>
      </ThemedView>
    </View>
  );
};
