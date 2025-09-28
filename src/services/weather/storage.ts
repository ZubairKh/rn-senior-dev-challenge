import AsyncStorage from '@react-native-async-storage/async-storage';

import type { WeatherFilterOption, WeatherSnapshotMap, WeatherSortOption } from '@/types/weather';

const STORAGE_KEYS = {
  snapshots: 'envTracker.weather.snapshots',
  preferences: 'envTracker.weather.preferences',
} as const;

/**
 * User preferences for weather data sorting and filtering.
 */
export type WeatherPreferences = {
  sortBy: WeatherSortOption;
  filter: WeatherFilterOption;
};

export type StoredWeather = {
  snapshots: WeatherSnapshotMap;
  lastUpdated: number | null;
  preferences: WeatherPreferences | null;
};

type StoredSnapshotsPayload = {
  lastUpdated: number;
  snapshots: WeatherSnapshotMap;
};

const safeParse = <T>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn('Failed to parse stored weather payload', error);
    return null;
  }
};

/**
 * Loads the stored weather data from AsyncStorage.
 * @returns The stored weather snapshots, last updated timestamp, and user preferences (if any).
 * @remarks Returns empty/default values if no data is found or parsing fails.
 */
export const loadStoredWeather = async (): Promise<StoredWeather> => {
  const [snapshotsRaw, preferencesRaw] = await Promise.all([
    AsyncStorage.getItem(STORAGE_KEYS.snapshots),
    AsyncStorage.getItem(STORAGE_KEYS.preferences),
  ]);

  const snapshotsPayload = safeParse<StoredSnapshotsPayload>(snapshotsRaw);
  const preferences = safeParse<WeatherPreferences>(preferencesRaw);

  return {
    snapshots: snapshotsPayload?.snapshots ?? {},
    lastUpdated: snapshotsPayload?.lastUpdated ?? null,
    preferences: preferences ?? null,
  };
};

/**
 * Persists the weather snapshots and last updated timestamp to AsyncStorage.
 * @param snapshots The weather snapshots to store.
 * @param lastUpdated The timestamp of the last update.
 */
export const persistWeatherSnapshots = async (snapshots: WeatherSnapshotMap, lastUpdated: number) => {
  const payload: StoredSnapshotsPayload = { snapshots, lastUpdated };
  await AsyncStorage.setItem(STORAGE_KEYS.snapshots, JSON.stringify(payload));
};

/**
 * Persists the user preferences for weather data sorting and filtering.
 * @param preferences The user preferences to store.
 */
export const persistWeatherPreferences = async (preferences: WeatherPreferences) => {
  await AsyncStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(preferences));
};

/**
 * Clears all stored weather data and preferences from AsyncStorage.
 */
export const clearWeatherStorage = async () => {
  await Promise.all([
    AsyncStorage.removeItem(STORAGE_KEYS.snapshots),
    AsyncStorage.removeItem(STORAGE_KEYS.preferences),
  ]);
};
