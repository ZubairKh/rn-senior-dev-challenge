import React from 'react';
import { View } from 'react-native';

import { weatherCardStyles } from './WeatherCard.styles';
import { WeatherMetricDescriptor } from './WeatherCard.types';
import { WeatherMetricPill } from './WeatherMetricPill';

type WeatherCardMetricsProps = {
  metrics: WeatherMetricDescriptor[];
  tint: string;
  background: string;
};

export const WeatherCardMetrics: React.FC<WeatherCardMetricsProps> = ({
  metrics,
  tint,
  background,
}) => (
  <View style={weatherCardStyles.metricsRow}>
    {metrics.map((metric) => (
      <WeatherMetricPill
        key={metric.label}
        icon={metric.icon}
        label={metric.label}
        value={metric.value}
        tint={tint}
        background={background}
      />
    ))}
  </View>
);
