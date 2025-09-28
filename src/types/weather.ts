export type WeatherUnits = 'metric' | 'imperial';

export type WeatherCity = {
  id: number;
  name: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

export type WeatherSnapshot = {
  city: WeatherCity;
  temperature: number;
  temperatureFeelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  conditionId: number;
  conditionLabel: string;
  conditionIcon: string;
  sunrise: number;
  sunset: number;
  observationTime: number;
};

export type WeatherSortOption = 'name' | 'temperature' | 'humidity' | 'windSpeed';

export type WeatherFilterOption = 'all' | 'comfortable' | 'rainy';

export type WeatherSnapshotMap = Record<number, WeatherSnapshot>;
