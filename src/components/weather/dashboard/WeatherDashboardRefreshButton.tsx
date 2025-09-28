import React from 'react';
import { Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';

import { weatherDashboardHeaderStyles } from './WeatherDashboardHeader.styles';

type WeatherDashboardRefreshButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export const WeatherDashboardRefreshButton: React.FC<WeatherDashboardRefreshButtonProps> = ({
  label,
  onPress,
  disabled = false,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Refresh weather"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        weatherDashboardHeaderStyles.refreshButton,
        disabled && { opacity: 0.55 },
        pressed && !disabled && weatherDashboardHeaderStyles.refreshButtonPressed,
      ]}
    >
      <View style={weatherDashboardHeaderStyles.refreshContent}>
        <Feather name="rotate-ccw" size={16} color="#0a7ea4" />
        <ThemedText type="defaultSemiBold" style={weatherDashboardHeaderStyles.refreshLabel}>
          {label}
        </ThemedText>
      </View>
    </Pressable>
  );
};
