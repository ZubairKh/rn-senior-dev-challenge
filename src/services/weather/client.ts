import { ENV, assertWeatherEnv } from '@/constants/environment';
import { WEATHER_DEFAULT_UNITS } from '@/constants/weather';
import { logger } from '@/services/logger';
import type { WeatherCity, WeatherSnapshot, WeatherUnits } from '@/types/weather';

const OWM_SINGLE_ENDPOINT = '/data/2.5/weather';

export class WeatherApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

type HttpClient = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

type OpenWeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type OpenWeatherPayload = {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind?: {
    speed?: number;
  };
  sys: {
    country?: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  weather: OpenWeatherCondition[];
};

type BuildUrlParams = Record<string, string | number | undefined>;

import { getHealthGuideForWeather } from './insights';

const mapSnapshot = (payload: OpenWeatherPayload, explicitCity?: WeatherCity): WeatherSnapshot => {
  const condition = payload.weather?.[0];
  const city: WeatherCity =
    explicitCity ??
    ({
      id: payload.id,
      name: payload.name,
      countryCode: payload.sys?.country ?? '',
      latitude: payload.coord.lat,
      longitude: payload.coord.lon,
    } satisfies WeatherCity);

  const snapshot: WeatherSnapshot = {
    city,
    temperature: payload.main.temp,
    temperatureFeelsLike: payload.main.feels_like,
    humidity: payload.main.humidity,
    pressure: payload.main.pressure,
    windSpeed: payload.wind?.speed ?? 0,
    conditionId: condition?.id ?? 0,
    conditionLabel: condition?.description ?? 'Unknown',
    conditionIcon: condition?.icon ?? '01d',
    sunrise: payload.sys.sunrise,
    sunset: payload.sys.sunset,
    observationTime: payload.dt,
  };
  snapshot.healthGuide = getHealthGuideForWeather(snapshot);
  return snapshot;
};

const safeReadError = async (response: Response): Promise<string> => {
  try {
    const text = await response.text();
    return text || response.statusText;
  } catch (error) {
    return response.statusText;
  }
};

const buildUrl = (endpoint: string, params: BuildUrlParams) => {
  assertWeatherEnv();
  const url = new URL(endpoint, ENV.weather.apiBaseUrl);

  url.searchParams.set('appid', ENV.weather.apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
};

export class WeatherApiClient {
  constructor(private readonly httpClient: HttpClient = fetch) { }

  async fetchCity(city: WeatherCity, units: WeatherUnits = WEATHER_DEFAULT_UNITS): Promise<WeatherSnapshot> {
    const url = buildUrl(OWM_SINGLE_ENDPOINT, {
      id: city.id,
      units,
    });

    const response = await this.httpClient(url.toString());

    if (!response.ok) {
      const message = await safeReadError(response);
      throw new WeatherApiError(`Failed to fetch weather for ${city.name}: ${message}`, response.status);
    }

    const data = (await response.json()) as OpenWeatherPayload;
    return mapSnapshot(data, city);
  }

  async fetchCities(
    cities: WeatherCity[],
    units: WeatherUnits = WEATHER_DEFAULT_UNITS,
  ): Promise<WeatherSnapshot[]> {
    if (cities.length === 0) {
      return [];
    }

    const results = await Promise.allSettled(cities.map((city) => this.fetchCity(city, units)));

    const snapshots: WeatherSnapshot[] = [];
    const failures: Array<{ city: WeatherCity; reason: unknown }> = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        snapshots.push(result.value);
      } else {
        failures.push({ city: cities[index], reason: result.reason });
      }
    });

    if (snapshots.length === 0 && failures.length > 0) {
      const first = failures[0];
      const reason =
        first.reason instanceof Error
          ? first.reason.message
          : typeof first.reason === 'string'
            ? first.reason
            : JSON.stringify(first.reason);
      throw new WeatherApiError(`Failed to fetch weather data: ${reason}`);
    }

    if (failures.length > 0) {
      logger.warn('Some weather requests failed', failures);
    }

    return snapshots;
  }
}

const defaultClient = new WeatherApiClient();

export const fetchWeatherForCity = (
  city: WeatherCity,
  units?: WeatherUnits,
): Promise<WeatherSnapshot> => defaultClient.fetchCity(city, units);

export const fetchWeatherForCities = (
  cities: WeatherCity[],
  units?: WeatherUnits,
): Promise<WeatherSnapshot[]> => defaultClient.fetchCities(cities, units);
