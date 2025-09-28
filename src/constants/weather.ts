import { WeatherCity, WeatherFilterOption, WeatherSortOption } from '@/types/weather';

export const WEATHER_DEFAULT_UNITS = 'metric' as const;

export const WEATHER_DEFAULT_CITIES: WeatherCity[] = [
  // Americas
  { id: 5128581, name: 'New York', countryCode: 'US', latitude: 40.7128, longitude: -74.0060 },
  { id: 3448439, name: 'São Paulo', countryCode: 'BR', latitude: -23.5505, longitude: -46.6333 },
  { id: 3530597, name: 'Cancún', countryCode: 'MX', latitude: 21.1619, longitude: -86.8515 },

  // Europe
  { id: 2950159, name: 'Berlin', countryCode: 'DE', latitude: 52.5244, longitude: 13.4105 },
  { id: 2925533, name: 'Frankfurt', countryCode: 'DE', latitude: 50.1109, longitude: 8.6821 },
  { id: 2643743, name: 'London', countryCode: 'GB', latitude: 51.5085, longitude: -0.1257 },
  { id: 2968815, name: 'Paris', countryCode: 'FR', latitude: 48.8534, longitude: 2.3488 },
  { id: 524901, name: 'Moscow', countryCode: 'RU', latitude: 55.7558, longitude: 37.6173 },

  // Africa
  { id: 3369157, name: 'Cape Town', countryCode: 'ZA', latitude: -33.9249, longitude: 18.4241 },
  { id: 360630, name: 'Cairo', countryCode: 'EG', latitude: 30.0444, longitude: 31.2357 },

  // Asia
  { id: 1850147, name: 'Tokyo', countryCode: 'JP', latitude: 35.6895, longitude: 139.6917 },
  { id: 1880252, name: 'Singapore', countryCode: 'SG', latitude: 1.3521, longitude: 103.8198 },
  { id: 1273294, name: 'Islamabad', countryCode: 'PK', latitude: 33.6844, longitude: 73.0479 },
  { id: 1816670, name: 'Beijing', countryCode: 'CN', latitude: 39.9042, longitude: 116.4074 },
  { id: 292223, name: 'Dubai', countryCode: 'AE', latitude: 25.2048, longitude: 55.2708 },

  // Oceania
  { id: 2147714, name: 'Sydney', countryCode: 'AU', latitude: -33.8688, longitude: 151.2093 },
  { id: 2172517, name: 'Canberra', countryCode: 'AU', latitude: -35.2820, longitude: 149.1286 },

  // Antarctica (for fun/extreme demo)
  { id: 6620339, name: 'Vostok Station', countryCode: 'AQ', latitude: -78.4648, longitude: 106.8371 },
];

export const WEATHER_SORT_OPTIONS: WeatherSortOption[] = [
  'name',
  'temperature',
  'humidity',
  'windSpeed',
];

export const WEATHER_FILTER_OPTIONS: WeatherFilterOption[] = [
  'all', 'comfortable', 'rainy'
];

export const WEATHER_COMFORTABLE_RANGE = {
  minTemp: 16,
  maxTemp: 27,
  maxWindSpeed: 6,
};

export const WEATHER_RAIN_CONDITION_GROUP = 500;

export function getHealthGuideMeta(text: string, primaryColor: string) {
  if (text.includes('Great weather')) return { color: '#22c55e' };
  if (text.includes('ideal') || text.includes('Rain is expected')) return { color: '#e11d48' };
  if (text.includes('High temperature')) return { color: '#e11d48' };
  if (text.includes('Cold weather')) return { color: '#e11d48' };
  if (text.includes('Windy')) return { color: '#e11d48' };
  if (text.includes('High humidity')) return { color: '#e11d48' };
  return { color: primaryColor };
}
