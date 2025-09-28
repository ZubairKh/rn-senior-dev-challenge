import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

import { weatherControlsStyles } from './WeatherControls.styles';

export type WeatherControlsSegmentButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
  icon?: string;
};

export const WeatherControlsSegmentButton: React.FC<
  WeatherControlsSegmentButtonProps
> = ({ label, active, onPress, icon }) => {
  const tint = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'border');
  const textColor = active ? '#ffffff' : '#0b3d62';
  const iconColor = active ? '#ffffff' : tint;
  const backgroundColor = active ? tint : '#ffffff';
  const chipBorder = active ? tint : borderColor;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        weatherControlsStyles.segmentButton,
        {
          backgroundColor,
          borderColor: chipBorder,
        },
        pressed && weatherControlsStyles.segmentPressed,
      ]}
    >
      {icon ? <Feather name={icon as any} size={14} color={iconColor} /> : null}
      <ThemedText style={[weatherControlsStyles.segmentLabel, { color: textColor }]}>
        {label}
      </ThemedText>
    </Pressable>
  );
};
