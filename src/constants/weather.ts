import { WeatherCity, WeatherFilterOption, WeatherSortOption } from '@/types/weather';

export const WEATHER_DEFAULT_UNITS = 'metric' as const;

export const WEATHER_DEFAULT_CITIES: WeatherCity[] = [
  {
    id: 2950159,
    name: 'Berlin',
    countryCode: 'DE',
    latitude: 52.5244,
    longitude: 13.4105,
  },
  {
    id: 2643743,
    name: 'London',
    countryCode: 'GB',
    latitude: 51.5085,
    longitude: -0.1257,
  },
  {
    id: 2968815,
    name: 'Paris',
    countryCode: 'FR',
    latitude: 48.8534,
    longitude: 2.3488,
  },
  {
    id: 2759794,
    name: 'Amsterdam',
    countryCode: 'NL',
    latitude: 52.374,
    longitude: 4.8897,
  },
  {
    id: 3067696,
    name: 'Prague',
    countryCode: 'CZ',
    latitude: 50.088,
    longitude: 14.4208,
  },
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
  minTemp: 18,
  maxTemp: 27,
  maxWindSpeed: 6,
};

export const WEATHER_RAIN_CONDITION_GROUP = 500;
