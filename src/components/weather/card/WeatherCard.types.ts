import { WeatherSnapshot } from '@/types/weather';

export type WeatherCardProps = {
  snapshot: WeatherSnapshot;
  isComfortable?: boolean;
  isRainy?: boolean;
};

export type WeatherBadgeAppearance = {
  label: string;
  backgroundColor: string;
  textColor: string;
};

export type WeatherMetricDescriptor = {
  icon: string;
  label: string;
  value: string;
};

export type WeatherMetricFactory = (snapshot: WeatherSnapshot) => WeatherMetricDescriptor[];

export type WeatherBadgeResolver = (
  isComfortable: boolean | undefined,
  isRainy: boolean | undefined,
  controlInactive: string,
  accent: string,
  fallbackLabel: string,
) => WeatherBadgeAppearance;
