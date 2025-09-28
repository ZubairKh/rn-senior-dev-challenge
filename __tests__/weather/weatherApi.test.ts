import { fetchWeatherForCity, fetchWeatherForCities } from '@/services/weather';
import { WeatherCity } from '@/types/weather';

const fetchMock = globalThis.fetch as jest.Mock;

jest.mock('@/constants/environment', () => ({
  ENV: {
    auth: { passwordPepper: '' },
    weather: {
      apiBaseUrl: 'https://example.com',
      apiKey: 'test-key',
    },
  },
  assertWeatherEnv: jest.fn(),
}));

jest.mock('@/services/logger', () => ({
  logger: {
    warn: jest.fn(),
  },
}));

const buildPayload = (overrides: Partial<Record<string, unknown>> = {}) => ({
  id: 123,
  name: 'Sample',
  coord: { lat: 1, lon: 2 },
  main: {
    temp: 21,
    feels_like: 19,
    humidity: 70,
    pressure: 1005,
  },
  sys: {
    country: 'GB',
    sunrise: 100,
    sunset: 200,
  },
  weather: [
    {
      id: 500,
      main: 'Rain',
      description: 'light rain',
      icon: '10d',
    },
  ],
  dt: 123456,
  ...overrides,
});

describe('weatherApi', () => {
  const city: WeatherCity = {
    id: 123,
    name: 'Sample',
    countryCode: 'GB',
    latitude: 1,
    longitude: 2,
  };

  beforeEach(() => {
    fetchMock.mockReset();
  });

  it('fetches and maps a single city snapshot', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => buildPayload(),
    });

    const snapshot = await fetchWeatherForCity(city);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [requestedUrl] = fetchMock.mock.calls[0] as [string];
    expect(requestedUrl).toContain('https://example.com/data/2.5/weather');
    expect(requestedUrl).toContain('id=123');
    expect(requestedUrl).toContain('appid=test-key');
    expect(snapshot.city).toEqual(city);
    expect(snapshot.temperature).toBe(21);
    expect(snapshot.conditionLabel).toBe('light rain');
  });

  it('throws with detailed message when fetch fails', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
      text: async () => 'Invalid API key',
    });

    await expect(fetchWeatherForCity(city)).rejects.toThrow(
      /Failed to fetch weather for Sample: Invalid API key/,
    );
  });

  it('warns about partial failures when fetching multiple cities', async () => {
    const logger = require('@/services/logger').logger;
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => buildPayload() });
    fetchMock.mockResolvedValueOnce({ ok: false, statusText: 'Error', text: async () => 'Fail' });

    const snapshots = await fetchWeatherForCities([
      city,
      { ...city, id: 999, name: 'Other' },
    ]);

    expect(snapshots).toHaveLength(1);
    expect(logger.warn).toHaveBeenCalledWith(
      'Some weather requests failed',
      expect.any(Array),
    );
  });

  it('throws when every city fails', async () => {
    fetchMock.mockResolvedValue({ ok: false, statusText: 'Bad', text: async () => 'Nope' });

    await expect(fetchWeatherForCities([city])).rejects.toThrow(/Failed to fetch weather data/);
  });
});
