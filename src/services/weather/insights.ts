import {
  WEATHER_COMFORTABLE_RANGE
} from '@/constants/weather';
import type { WeatherFilterOption, WeatherSnapshot, WeatherSortOption } from '@/types/weather';

/**
 * Determines if the weather snapshot represents comfortable weather.
 * Excludes rainy conditions.
 *
 * @param snapshot The weather snapshot to check.
 * @returns True if comfortable and not rainy, false otherwise.
 */
export const isComfortableWeather = (snapshot: WeatherSnapshot) =>
  snapshot.temperature >= WEATHER_COMFORTABLE_RANGE.minTemp &&
  snapshot.temperature <= WEATHER_COMFORTABLE_RANGE.maxTemp &&
  snapshot.windSpeed <= WEATHER_COMFORTABLE_RANGE.maxWindSpeed &&
  !isRainyWeather(snapshot);

/**
 * Determines if the weather snapshot represents rainy conditions.
 * Only considers conditionId > 500 and < 600 as rainy (excludes 500/drizzle).
 *
 * @param snapshot The weather snapshot to check.
 * @returns True if rainy, false otherwise.
 */
export const isRainyWeather = (snapshot: WeatherSnapshot) =>
  snapshot.conditionId > 500 && snapshot.conditionId < 600;

export const filterSnapshots = (
  snapshots: WeatherSnapshot[],
  filter: WeatherFilterOption,
): WeatherSnapshot[] => {
  switch (filter) {
    case 'comfortable':
      return snapshots.filter(isComfortableWeather);
    case 'rainy':
      return snapshots.filter(isRainyWeather);
    default:
      return snapshots;
  }
};

/**
 * Sorts the weather snapshots based on the specified criteria.
 * @param snapshots The weather snapshots to sort.
 * @param sortBy The criteria to sort by.
 * @returns The sorted weather snapshots.
 */
export const sortSnapshots = (
  snapshots: WeatherSnapshot[],
  sortBy: WeatherSortOption,
): WeatherSnapshot[] => {
  const copy = [...snapshots];
  switch (sortBy) {
    case 'temperature':
      return copy.sort((a, b) => b.temperature - a.temperature);
    case 'humidity':
      return copy.sort((a, b) => b.humidity - a.humidity);
    case 'windSpeed':
      return copy.sort((a, b) => a.windSpeed - b.windSpeed);
    case 'name':
    default:
      return copy.sort((a, b) => a.city.name.localeCompare(b.city.name));
  }
};

/**
 * Derives a comfort score from the weather snapshot.
 * @param snapshot The weather snapshot to evaluate.
 * @returns The comfort score (0-100) based on various factors.
 */
export const deriveSnapshotScore = (snapshot: WeatherSnapshot): number => {
  const comfortPenalty = Math.abs(snapshot.temperature - (WEATHER_COMFORTABLE_RANGE.minTemp + WEATHER_COMFORTABLE_RANGE.maxTemp) / 2);
  const windPenalty = snapshot.windSpeed;
  const humidityPenalty = snapshot.humidity / 10;
  return Math.round(100 - (comfortPenalty * 2 + windPenalty * 1.5 + humidityPenalty));
};
