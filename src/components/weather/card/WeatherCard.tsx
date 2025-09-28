import React, { useMemo } from 'react';

import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

import { View } from 'react-native';
import { weatherCardStyles } from './WeatherCard.styles';
import { WeatherCardProps } from './WeatherCard.types';
import {
  buildIconUrl,
  buildMetricDescriptors,
  resolveBadgeAppearance,
} from './WeatherCard.utils';
import { WeatherCardHeader } from './WeatherCardHeader';
import { WeatherCardHealthGuide } from './WeatherCardHealthGuide';
import { WeatherCardMetrics } from './WeatherCardMetrics';
import { WeatherCardTempRow } from './WeatherCardTempRow';

import { useWeather } from '@/contexts/WeatherContext';

export const WeatherCard: React.FC<WeatherCardProps> = ({ snapshot }) => {
  const { isComfortable, isRainy } = useWeather();
  const comfortable = isComfortable(snapshot);
  const rainy = isRainy(snapshot);
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const accent = useThemeColor({}, 'tint');
  const controlInactive = useThemeColor({}, 'controlInactive');
  const badgeAppearance = useMemo(
    () =>
      resolveBadgeAppearance(
        comfortable,
        rainy,
        controlInactive,
        accent,
        snapshot.conditionLabel,
      ),
    [accent, controlInactive, comfortable, rainy, snapshot.conditionLabel],
  );

  const metricDescriptors = useMemo(() => buildMetricDescriptors(snapshot), [snapshot]);
  const iconUrl = useMemo(
    () => buildIconUrl(snapshot.conditionIcon),
    [snapshot.conditionIcon],
  );

  return (
    <ThemedView
      style={[weatherCardStyles.card, { backgroundColor: surface, borderColor: border }]}
      lightColor={surface}
    >
      <WeatherCardHeader
        cityName={snapshot.city.name}
        countryCode={snapshot.city.countryCode}
        badge={badgeAppearance}
      />

      <WeatherCardTempRow
        temperature={snapshot.temperature}
        feelsLike={snapshot.temperatureFeelsLike}
        iconUrl={iconUrl}
        iconBackground={controlInactive}
        iconAccent={accent}
      />

      <WeatherCardMetrics
        metrics={metricDescriptors}
        tint={accent}
        background={controlInactive}
      />

      {snapshot.healthGuide && (
        <View style={{ marginTop: 12 }}>
          <WeatherCardHealthGuide text={snapshot.healthGuide} />
        </View>
      )}
    </ThemedView>
  );
};
