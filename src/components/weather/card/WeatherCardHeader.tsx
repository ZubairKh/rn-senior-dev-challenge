import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

import { weatherCardStyles } from './WeatherCard.styles';
import { WeatherBadgeAppearance } from './WeatherCard.types';

type WeatherCardHeaderProps = {
  cityName: string;
  countryCode: string;
  badge: WeatherBadgeAppearance;
};

export const WeatherCardHeader: React.FC<WeatherCardHeaderProps> = ({
  cityName,
  countryCode,
  badge,
}) => (
  <View style={weatherCardStyles.headerRow}>
    <View>
      <ThemedText type="subtitle" style={weatherCardStyles.city}>
        {cityName}
      </ThemedText>
      <ThemedText style={weatherCardStyles.country}>{countryCode}</ThemedText>
    </View>

    <View style={[weatherCardStyles.badge, { backgroundColor: badge.backgroundColor }]}>
      <ThemedText style={[weatherCardStyles.badgeText, { color: badge.textColor }]}>
        {badge.label}
      </ThemedText>
    </View>
  </View>
);
