import { AUTH_SECURITY } from '@/constants/auth';
import {
  bytesToHex,
  createSession,
  createUserId,
  generateSalt,
  hashPassword,
} from '@/services/authCrypto';

describe('authCrypto', () => {
  const Crypto = require('expo-crypto') as jest.Mocked<typeof import('expo-crypto')>;

  beforeEach(() => {
    jest.clearAllMocks();
    Crypto.digestStringAsync.mockResolvedValue('digest-value');
    Crypto.getRandomBytesAsync.mockResolvedValue(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
    Crypto.randomUUID.mockReturnValue('uuid-mock');
  });

  it('hashPassword delegates to expo-crypto with peppered payload', async () => {
    const password = 'P@ssw0rd';
    const salt = 'abc123';

    const result = await hashPassword(password, salt);

    expect(Crypto.digestStringAsync).toHaveBeenCalledWith(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${password}:${salt}:${AUTH_SECURITY.passwordPepper}`,
    );
    expect(result).toBe('digest-value');
  });

  it('generateSalt returns hex string from random bytes', async () => {
    const result = await generateSalt();

    expect(Crypto.getRandomBytesAsync).toHaveBeenCalledWith(16);
    expect(result).toBe('deadbeef');
  });

  it('bytesToHex converts byte arrays to lowercase hex', () => {
    expect(bytesToHex(new Uint8Array([0, 15, 16, 255]))).toBe('000f10ff');
  });

  it('createSession yields ttl bounded session and uuid token', () => {
    const now = Date.now();
    jest.spyOn(Date, 'now').mockReturnValue(now);

    const session = createSession('user-1');

    expect(Crypto.randomUUID).toHaveBeenCalled();
    expect(session).toEqual({
      token: 'uuid-mock',
      userId: 'user-1',
      issuedAt: now,
      expiresAt: now + AUTH_SECURITY.sessionTtlMs,
    });
  });

  it('createUserId returns random uuid', () => {
    const id = createUserId();

    expect(Crypto.randomUUID).toHaveBeenCalledTimes(1);
    expect(id).toBe('uuid-mock');
  });
});
