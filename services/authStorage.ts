import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { AUTH_STORAGE_KEYS } from '@/constants/auth';
import { logger } from '@/services/logger';
import { AuthSession, AuthUser } from '@/types/auth';

const { users, session, sessionFallback } = AUTH_STORAGE_KEYS;

let secureStoreAvailable: boolean | null = null;

/**
 * Checks if SecureStore is available for use.
 * @returns A boolean indicating whether SecureStore is available.
 * @remarks Caches the result after the first check to avoid redundant calls.
 */
export async function ensureSecureStoreAvailability(): Promise<boolean> {
  if (secureStoreAvailable !== null) {
    return secureStoreAvailable;
  }

  if (typeof SecureStore?.isAvailableAsync !== 'function') {
    secureStoreAvailable = false;
    return secureStoreAvailable;
  }

  try {
    secureStoreAvailable = await SecureStore.isAvailableAsync();
  } catch (error) {
    logger.warn('Unable to determine SecureStore availability', error);
    secureStoreAvailable = false;
  }

  return secureStoreAvailable;
}

/**
 * Loads users from storage.
 * @returns A list of stored users, or an empty array if none are found or if parsing fails.
 * @remarks Uses AsyncStorage for user data storage.
 */
export async function loadUsers(): Promise<AuthUser[]> {
  const stored = await AsyncStorage.getItem(users);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as AuthUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    logger.warn('Failed to parse stored users', error);
    return [];
  }
}

/**
 * Persists a list of users to storage.
 * @param value The list of users to persist.
 * @returns A promise that resolves when the users have been persisted.
 * @remarks Uses AsyncStorage for user data storage.
 */
export async function persistUsers(value: AuthUser[]): Promise<void> {
  await AsyncStorage.setItem(users, JSON.stringify(value));
}

/**
 * Loads the currently stored session from storage.
 * @returns The currently stored session, or null if none exists or if it has expired.
 * @remarks Uses SecureStore if available, otherwise falls back to AsyncStorage.
 */
export async function loadSession(): Promise<AuthSession | null> {
  const hasSecureStore = await ensureSecureStoreAvailability();

  try {
    const stored = hasSecureStore
      ? await SecureStore.getItemAsync(session)
      : await AsyncStorage.getItem(sessionFallback);

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as AuthSession | null;
    if (!parsed || !parsed.expiresAt || parsed.expiresAt < Date.now()) {
      await clearSession();
      return null;
    }

    return parsed;
  } catch (error) {
    logger.warn('Failed to load session', error);
    return null;
  }
}

/**
 * Persists a session to storage.
 * @param value The session to persist, or null to clear the stored session.
 * @returns A promise that resolves when the session has been persisted.
 */
export async function persistSession(value: AuthSession | null): Promise<void> {

  if (!value) {
    await clearSession();
    return;
  }

  const hasSecureStore = await ensureSecureStoreAvailability();

  const payload = JSON.stringify(value);

  if (hasSecureStore) {
    await SecureStore.setItemAsync(session, payload);
  } else {
    await AsyncStorage.setItem(sessionFallback, payload);
  }
}

/**
 * Clears the stored session from both SecureStore and AsyncStorage.
 * @returns A promise that resolves when the session has been cleared.
 * @remarks Attempts to clear from both storage mechanisms to ensure no residual data remains.
 */
export async function clearSession(): Promise<void> {
  const hasSecureStore = await ensureSecureStoreAvailability();

  if (hasSecureStore) {
    await SecureStore.deleteItemAsync(session);
  }
  await AsyncStorage.removeItem(sessionFallback);
}
