import * as Crypto from 'expo-crypto';

import { AUTH_SECURITY } from '@/constants/auth';
import { AuthSession } from '@/types/auth';


const { passwordPepper, sessionTtlMs } = AUTH_SECURITY;


/**
 * Hashes a password using SHA256 with salt and pepper.
 *
 * @param password The plain text password.
 * @param salt The salt to use for hashing.
 * @returns The hashed password as a hex string.
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${password}:${salt}:${passwordPepper}`,
  );
}


/**
 * Generates a random salt of the specified byte length.
 *
 * @param byteLength The number of bytes for the salt. Defaults to 16.
 * @returns The generated salt as a hex string.
 */
export async function generateSalt(byteLength = 16): Promise<string> {
  const saltBytes = await Crypto.getRandomBytesAsync(byteLength);
  return bytesToHex(saltBytes);
}


/**
 * Creates a new authentication session for a user.
 *
 * @param userId The user's unique identifier.
 * @returns The created AuthSession object.
 */
export function createSession(userId: string): AuthSession {
  const issuedAt = Date.now();

  return {
    token: Crypto.randomUUID(),
    userId,
    issuedAt,
    expiresAt: issuedAt + sessionTtlMs,
  };
}


/**
 * Converts a byte array to a hex string.
 *
 * @param bytes The byte array to convert.
 * @returns The resulting hex string.
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}


/**
 * Generates a new unique user ID.
 *
 * @returns A UUID string.
 */
export function createUserId(): string {
  return Crypto.randomUUID();
}
