import { ThemedText } from '@/components/ThemedText';
import { useWeather } from '@/contexts/WeatherContext';
import { logger } from '@/services/logger';
import { formatLastUpdatedLabel } from '@/services/weather/formatters';
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { weatherDashboardHeaderStyles } from './WeatherDashboardHeader.styles';

export const WeatherDashboardRefreshButton: React.FC = () => {
  const { state, refresh } = useWeather();
  const refreshing = state.status === 'refreshing';
  const lastUpdatedLabel = useMemo(
    () => formatLastUpdatedLabel(state.lastUpdated ?? null),
    [state.lastUpdated],
  );
  const handleRefresh = useCallback(() => {
    refresh({ silent: true }).catch((error) => {
      logger.warn('Weather refresh failed', error);
    });
  }, [refresh]);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Refresh weather"
      onPress={handleRefresh}
      disabled={refreshing}
      style={({ pressed }) => [
        weatherDashboardHeaderStyles.refreshButton,
        refreshing && { opacity: 0.55 },
        pressed && !refreshing && weatherDashboardHeaderStyles.refreshButtonPressed,
      ]}
    >
      <View style={weatherDashboardHeaderStyles.refreshContent}>
        <Feather name="rotate-ccw" size={16} color="#0a7ea4" />
        <ThemedText
          type="defaultSemiBold"
          style={weatherDashboardHeaderStyles.refreshLabel}
        >
          {refreshing ? 'Refreshing…' : lastUpdatedLabel}
        </ThemedText>
      </View>
    </Pressable>
  );
};
