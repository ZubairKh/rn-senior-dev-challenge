import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

import { weatherDashboardHeaderStyles } from './WeatherDashboardHeader.styles';

type WeatherDashboardSignOutButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  isProcessing?: boolean;
};

export const WeatherDashboardSignOutButton: React.FC<
  WeatherDashboardSignOutButtonProps
> = ({ onPress, disabled = false, isProcessing = false }) => {
  const danger = useThemeColor({}, 'danger');
  const surface = useThemeColor({}, 'surface');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Sign out"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        weatherDashboardHeaderStyles.signOutButton,
        {
          backgroundColor: surface,
          borderColor: danger,
          opacity: disabled ? 0.6 : 1,
        },
        pressed && !disabled && weatherDashboardHeaderStyles.signOutButtonPressed,
      ]}
    >
      <Feather name="log-out" size={16} color={danger} />
      <ThemedText style={[weatherDashboardHeaderStyles.signOutLabel, { color: danger }]}>
        {isProcessing ? 'Signing out…' : 'Sign out'}
      </ThemedText>
    </Pressable>
  );
};
