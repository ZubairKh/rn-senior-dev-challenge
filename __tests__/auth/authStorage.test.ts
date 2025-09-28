import { AUTH_STORAGE_KEYS } from '@/constants/auth';
import { AuthSession, AuthUser } from '@/types/auth';
import { applyStorageMocks } from '../test-utils/mocks/storage/applyStorageMocks';

const createMockUser = (): AuthUser => ({
  id: 'user-1',
  email: 'test@example.com',
  passwordHash: 'hash',
  salt: 'salt',
  createdAt: new Date().toISOString(),
});

const createMockSession = (): AuthSession => ({
  token: 'session-token',
  userId: 'user-1',
  issuedAt: Date.now(),
  expiresAt: Date.now() + 1000,
});

type StorageModule = typeof import('@/services/authStorage');

describe('authStorage', () => {
  const setup = async (secureAvailable = true) => {
    const asyncData: Record<string, string> = {};
    const secureData: Record<string, string> = {};

    jest.resetModules();

    const handles = applyStorageMocks({ secureAvailable, asyncData, secureData });

    const module = require('@/services/authStorage') as StorageModule;

    return {
      module,
      ...handles,
      asyncData,
      secureData,
    };
  };

  it('loadUsers returns empty array when storage empty', async () => {
    const { module, asyncGetItem } = await setup();

    const users = await module.loadUsers();

    expect(users).toEqual([]);
    expect(asyncGetItem).toHaveBeenCalledWith(AUTH_STORAGE_KEYS.users);
  });

  it('persistUsers stores serialized users', async () => {
    const { module, asyncSetItem, asyncData } = await setup();
    const user = createMockUser();

    await module.persistUsers([user]);

    expect(asyncSetItem).toHaveBeenCalledWith(
      AUTH_STORAGE_KEYS.users,
      JSON.stringify([user]),
    );
    expect(asyncData[AUTH_STORAGE_KEYS.users]).toBe(JSON.stringify([user]));
  });

  it('loadSession uses secure store when available', async () => {
    const { module, secureSetItem, secureData, secureIsAvailable } = await setup(true);
    const session = createMockSession();

    await module.persistSession(session);

    expect(secureSetItem).toHaveBeenCalled();
    expect(secureIsAvailable).toHaveBeenCalled();

    const stored = await module.loadSession();
    expect(stored).toEqual(session);
    expect(secureData[AUTH_STORAGE_KEYS.session]).toBe(JSON.stringify(session));
  });

  it('loadSession falls back to async storage when secure store unavailable', async () => {
    const { module, asyncSetItem, asyncData, secureSetItem } = await setup(false);
    const session = createMockSession();

    await module.persistSession(session);

    expect(asyncSetItem).toHaveBeenCalledWith(
      AUTH_STORAGE_KEYS.sessionFallback,
      JSON.stringify(session),
    );
    expect(secureSetItem).not.toHaveBeenCalled();

    const stored = await module.loadSession();
    expect(stored).toEqual(session);
    expect(asyncData[AUTH_STORAGE_KEYS.sessionFallback]).toBe(JSON.stringify(session));
  });

  it('loadSession clears expired sessions', async () => {
    const { module, secureSetItem, secureData } = await setup(true);
    const session = { ...createMockSession(), expiresAt: Date.now() - 1 };

    await module.persistSession(session);
    expect(secureSetItem).toHaveBeenCalled();

    const result = await module.loadSession();
    expect(result).toBeNull();
    expect(secureData[AUTH_STORAGE_KEYS.session]).toBeUndefined();
  });

  it('clearSession removes both storage slots', async () => {
    const { module, secureSetItem, secureDeleteItem, asyncRemoveItem } = await setup(false);
    await module.persistSession(createMockSession());

    expect(secureSetItem).not.toHaveBeenCalled();

    await module.clearSession();

    expect(secureDeleteItem).not.toHaveBeenCalled();
    expect(asyncRemoveItem).toHaveBeenCalledWith(AUTH_STORAGE_KEYS.sessionFallback);
  });
});
