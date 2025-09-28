import { WeatherBadgeAppearance, WeatherBadgeResolver, WeatherMetricFactory } from './WeatherCard.types';

export const buildIconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const resolveBadgeAppearance: WeatherBadgeResolver = (
  isComfortable,
  isRainy,
  controlInactive,
  accent,
  fallbackLabel,
): WeatherBadgeAppearance => {
  if (isComfortable) {
    return {
      label: 'Great for outdoor',
      backgroundColor: 'rgba(34,197,94,0.15)',
      textColor: '#0d7a32',
    };
  }

  if (isRainy) {
    return {
      label: 'Rain expected',
      backgroundColor: 'rgba(14,116,144,0.15)',
      textColor: '#0f6c94',
    };
  }

  return {
    label: fallbackLabel,
    backgroundColor: controlInactive,
    textColor: accent,
  };
};

export const buildMetricDescriptors: WeatherMetricFactory = (snapshot) => [
  {
    icon: 'droplet',
    label: 'Humidity',
    value: `${snapshot.humidity}%`,
  },
  {
    icon: 'wind',
    label: 'Wind',
    value: `${snapshot.windSpeed.toFixed(1)} m/s`,
  },
  {
    icon: 'activity',
    label: 'Pressure',
    value: `${snapshot.pressure} hPa`,
  },
];
