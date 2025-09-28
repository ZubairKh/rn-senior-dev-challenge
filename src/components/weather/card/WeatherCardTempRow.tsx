import React from 'react';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

import { weatherCardStyles } from './WeatherCard.styles';

type WeatherCardTempRowProps = {
  temperature: number;
  feelsLike: number;
  iconUrl: string;
  iconBackground: string;
  iconAccent: string;
};

export const WeatherCardTempRow: React.FC<WeatherCardTempRowProps> = ({
  temperature,
  feelsLike,
  iconUrl,
  iconBackground,
  iconAccent,
}) => (
  <View style={weatherCardStyles.tempRow}>
    <View>
      <ThemedText style={weatherCardStyles.temperature}>{Math.round(temperature)}°</ThemedText>
      <ThemedText style={weatherCardStyles.feelsLike}>
        Feels like {Math.round(feelsLike)}°
      </ThemedText>
    </View>
    <View
      style={[
        weatherCardStyles.iconWrapper,
        {
          backgroundColor: iconBackground,
          borderColor: iconAccent,
          shadowColor: iconAccent,
        },
      ]}
    >
      <Image
        source={iconUrl}
        style={weatherCardStyles.icon}
        contentFit="contain"
        accessibilityIgnoresInvertColors
      />
    </View>
  </View>
);
