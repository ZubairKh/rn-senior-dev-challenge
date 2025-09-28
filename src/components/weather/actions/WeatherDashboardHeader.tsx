import React, { useMemo } from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

import { useAuth } from '@/contexts/AuthContext';
import { WeatherDashboardActions } from './WeatherDashboardActions';
import { WeatherDashboardGreeting } from './WeatherDashboardGreeting';
import { weatherDashboardHeaderStyles } from './WeatherDashboardHeader.styles';

export const WeatherDashboardHeader: React.FC<{ cityCount: number }> = ({
  cityCount,
}) => {
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');

  // Get user from context for greeting
  const {
    state: { user },
  } = useAuth();
  const name = user?.email?.split('@')[0] ?? 'there';
  const displayName = useMemo(() => {
    if (!name) return 'there';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, [name]);

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
          <WeatherDashboardActions />
        </View>
      </ThemedView>
    </View>
  );
};
