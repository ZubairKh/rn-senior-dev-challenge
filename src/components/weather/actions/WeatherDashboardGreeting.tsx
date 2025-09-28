import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

import { weatherDashboardHeaderStyles } from './WeatherDashboardHeader.styles';

type WeatherDashboardGreetingProps = {
  name: string;
  cityCount: number;
};

export const WeatherDashboardGreeting: React.FC<WeatherDashboardGreetingProps> = ({
  name,
  cityCount,
}) => {
  const textColor = useThemeColor({}, 'text');
  const accent = useThemeColor({}, 'tint');

  return (
    <View style={weatherDashboardHeaderStyles.copyBlock}>
      <ThemedText type="title" style={[weatherDashboardHeaderStyles.title, { color: textColor }]}>
        Hello {name}
      </ThemedText>
      <ThemedText style={[weatherDashboardHeaderStyles.subtitle, { color: textColor }]}>
        Stay ahead of the weather in{' '}
        <ThemedText style={[weatherDashboardHeaderStyles.subtitleAccent, { color: accent }]}>
          {cityCount} {cityCount === 1 ? 'city' : 'cities'}
        </ThemedText>
        {' '}and adjust your routines with confidence.
      </ThemedText>
    </View>
  );
};
