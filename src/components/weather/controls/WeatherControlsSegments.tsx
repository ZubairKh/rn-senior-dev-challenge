import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

import { weatherControlsStyles } from './WeatherControls.styles';
import { WeatherControlsSegmentOption, WeatherControlsSegmentsProps } from './WeatherControls.types';
import { WeatherControlsSegmentButton } from './WeatherControlsSegmentButton';

export const WeatherControlsSegments: React.FC<WeatherControlsSegmentsProps> = ({ title, options }) => (
  <View style={weatherControlsStyles.segmentSection}>
    <ThemedText style={weatherControlsStyles.sectionLabel}>{title}</ThemedText>
    <View style={weatherControlsStyles.segmentRow}>
      {options.map((option: WeatherControlsSegmentOption) => (
        <WeatherControlsSegmentButton
          key={option.key}
          label={option.label}
          icon={option.icon}
          active={option.active}
          onPress={option.onPress}
        />
      ))}
    </View>
  </View>
);
