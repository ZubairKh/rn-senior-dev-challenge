import {
  deriveSnapshotScore,
  filterSnapshots,
  isComfortableWeather,
  isRainyWeather,
  sortSnapshots,
} from '@/services/weather';
import { WeatherFilterOption, WeatherSortOption } from '@/types/weather';

import { buildSnapshot } from './weatherFixtures';

describe('weatherInsights', () => {
  const comfortableSnapshot = buildSnapshot();
  const windySnapshot = buildSnapshot({ windSpeed: 12, city: { id: 2, name: 'Windy', countryCode: 'SC', latitude: 0, longitude: 0 } });
  const rainySnapshot = buildSnapshot({
    city: { id: 3, name: 'Rainville', countryCode: 'SC', latitude: 0, longitude: 0 },
    conditionId: 501,
  });

  it('detects comfortable weather', () => {
    expect(isComfortableWeather(comfortableSnapshot)).toBe(true);
    expect(isComfortableWeather(windySnapshot)).toBe(false);
  });

  it('detects rainy conditions', () => {
    expect(isRainyWeather(rainySnapshot)).toBe(true);
    expect(isRainyWeather(comfortableSnapshot)).toBe(false);
  });

  it.each<WeatherFilterOption>(['all', 'comfortable', 'rainy'])('filters snapshots with option %s', (filter) => {
    const filtered = filterSnapshots([comfortableSnapshot, windySnapshot, rainySnapshot], filter);
    if (filter === 'all') {
      expect(filtered).toHaveLength(3);
    }
    if (filter === 'comfortable') {
      expect(filtered).toEqual([comfortableSnapshot]);
    }
    if (filter === 'rainy') {
      expect(filtered).toEqual([rainySnapshot]);
    }
  });

  it.each<WeatherSortOption>(['name', 'temperature', 'humidity', 'windSpeed'])(
    'sorts snapshots by %s',
    (sortOption) => {
      const unordered = [
        buildSnapshot({ city: { id: 2, name: 'Bravo', countryCode: 'SC', latitude: 0, longitude: 0 }, temperature: 25, humidity: 70, windSpeed: 2 }),
        buildSnapshot({ city: { id: 1, name: 'Alpha', countryCode: 'SC', latitude: 0, longitude: 0 }, temperature: 21, humidity: 40, windSpeed: 5 }),
        buildSnapshot({ city: { id: 3, name: 'Charlie', countryCode: 'SC', latitude: 0, longitude: 0 }, temperature: 30, humidity: 55, windSpeed: 1 }),
      ];

      const sorted = sortSnapshots(unordered, sortOption);

      if (sortOption === 'name') {
        expect(sorted.map((snapshot) => snapshot.city.name)).toEqual(['Alpha', 'Bravo', 'Charlie']);
      }
      if (sortOption === 'temperature') {
        expect(sorted[0].temperature).toBeGreaterThanOrEqual(sorted[1].temperature);
      }
      if (sortOption === 'humidity') {
        expect(sorted[0].humidity).toBeGreaterThanOrEqual(sorted[1].humidity);
      }
      if (sortOption === 'windSpeed') {
        expect(sorted[0].windSpeed).toBeLessThanOrEqual(sorted[1].windSpeed);
      }
    },
  );

  it('derives a composite comfort score', () => {
    const baseline = buildSnapshot({ temperature: 24, humidity: 40, windSpeed: 2 });
    const harsher = buildSnapshot({ temperature: 35, humidity: 85, windSpeed: 8 });

    const baselineScore = deriveSnapshotScore(baseline);
    const harsherScore = deriveSnapshotScore(harsher);

    expect(baselineScore).toBeGreaterThan(harsherScore);
  });
});
