import React, { useMemo } from 'react';

import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

import { weatherCardStyles } from './WeatherCard.styles';
import { WeatherCardProps } from './WeatherCard.types';
import {
  buildIconUrl,
  buildMetricDescriptors,
  resolveBadgeAppearance,
} from './WeatherCard.utils';
import { WeatherCardHeader } from './WeatherCardHeader';
import { WeatherCardMetrics } from './WeatherCardMetrics';
import { WeatherCardTempRow } from './WeatherCardTempRow';

export const WeatherCard: React.FC<WeatherCardProps> = ({
  snapshot,
  isComfortable,
  isRainy,
}) => {
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const accent = useThemeColor({}, 'tint');
  const controlInactive = useThemeColor({}, 'controlInactive');
  const badgeAppearance = useMemo(
    () =>
      resolveBadgeAppearance(
        isComfortable,
        isRainy,
        controlInactive,
        accent,
        snapshot.conditionLabel,
      ),
    [accent, controlInactive, isComfortable, isRainy, snapshot.conditionLabel],
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
    </ThemedView>
  );
};
