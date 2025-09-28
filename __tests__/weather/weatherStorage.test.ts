import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  clearWeatherStorage,
  loadStoredWeather,
  persistWeatherPreferences,
  persistWeatherSnapshots,
} from '@/services/weather';
import { WeatherSnapshot } from '@/types/weather';

const asyncStorageMock = AsyncStorage as unknown as {
  getItem: jest.Mock<Promise<string | null>, [string]>;
  setItem: jest.Mock<Promise<void>, [string, string]>;
  removeItem: jest.Mock<Promise<void>, [string]>;
};

describe('weatherStorage', () => {
  const snapshotMap = {
    1: {
      city: { id: 1, name: 'City', countryCode: 'CC', latitude: 0, longitude: 0 },
      temperature: 25,
      temperatureFeelsLike: 24,
      humidity: 50,
      pressure: 1010,
      windSpeed: 4,
      conditionId: 800,
      conditionLabel: 'Clear',
      conditionIcon: '01d',
      sunrise: 100,
      sunset: 200,
      observationTime: 150,
    } satisfies WeatherSnapshot,
  };

  beforeEach(() => {
    asyncStorageMock.getItem.mockReset();
    asyncStorageMock.setItem.mockReset();
  });

  it('persists snapshots with timestamp', async () => {
    await persistWeatherSnapshots(snapshotMap, 999);

    expect(asyncStorageMock.setItem).toHaveBeenCalledWith(
      'envTracker.weather.snapshots',
      JSON.stringify({ snapshots: snapshotMap, lastUpdated: 999 }),
    );
  });

  it('persists user preferences', async () => {
    await persistWeatherPreferences({ sortBy: 'humidity', filter: 'comfortable' });

    expect(asyncStorageMock.setItem).toHaveBeenCalledWith(
      'envTracker.weather.preferences',
      JSON.stringify({ sortBy: 'humidity', filter: 'comfortable' }),
    );
  });

  it('returns parsed snapshots and preferences', async () => {
    asyncStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'envTracker.weather.snapshots') {
        return Promise.resolve(
          JSON.stringify({ snapshots: snapshotMap, lastUpdated: 321 }),
        );
      }
      if (key === 'envTracker.weather.preferences') {
        return Promise.resolve(
          JSON.stringify({ sortBy: 'wind', filter: 'rainy' }),
        );
      }
      return Promise.resolve(null);
    });

    const result = await loadStoredWeather();

    expect(result.snapshots).toEqual(snapshotMap);
    expect(result.lastUpdated).toBe(321);
    expect(result.preferences).toEqual({ sortBy: 'wind', filter: 'rainy' });
  });

  it('handles empty storage gracefully', async () => {
    asyncStorageMock.getItem.mockResolvedValue(null);

    const result = await loadStoredWeather();

    expect(result.snapshots).toEqual({});
    expect(result.lastUpdated).toBeNull();
    expect(result.preferences).toBeNull();
  });

  it('clears stored weather artifacts', async () => {
    const removeMock = AsyncStorage.removeItem as unknown as jest.Mock<Promise<void>, [string]>;
    removeMock.mockReset();

    await clearWeatherStorage();

    expect(removeMock).toHaveBeenCalledWith('envTracker.weather.snapshots');
    expect(removeMock).toHaveBeenCalledWith('envTracker.weather.preferences');
  });
});
