import { WeatherSnapshot } from '@/types/weather';

export const buildSnapshot = (overrides: Partial<WeatherSnapshot> = {}): WeatherSnapshot => ({
  city: {
    id: 123,
    name: 'Sample City',
    countryCode: 'SC',
    latitude: 0,
    longitude: 0,
  },
  temperature: 24,
  temperatureFeelsLike: 25,
  humidity: 60,
  pressure: 1012,
  windSpeed: 3,
  conditionId: 500,
  conditionLabel: 'light rain',
  conditionIcon: '10d',
  sunrise: 1000,
  sunset: 2000,
  observationTime: 1500,
  ...overrides,
});
