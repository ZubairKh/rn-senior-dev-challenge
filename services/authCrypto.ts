import * as Crypto from 'expo-crypto';

import { AUTH_SECURITY } from '@/constants/auth';
import { AuthSession } from '@/types/auth';

const { passwordPepper, sessionTtlMs } = AUTH_SECURITY;

export async function hashPassword(password: string, salt: string): Promise<string> {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${password}:${salt}:${passwordPepper}`,
  );
}

export async function generateSalt(byteLength = 16): Promise<string> {
  const saltBytes = await Crypto.getRandomBytesAsync(byteLength);
  return bytesToHex(saltBytes);
}

export function createSession(userId: string): AuthSession {
  const issuedAt = Date.now();

  return {
    token: Crypto.randomUUID(),
    userId,
    issuedAt,
    expiresAt: issuedAt + sessionTtlMs,
  };
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function createUserId(): string {
  return Crypto.randomUUID();
}
