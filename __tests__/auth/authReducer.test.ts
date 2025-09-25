import { AUTH_STATUS } from '@/constants/auth';
import { authReducer, initialAuthState } from '@/contexts/authReducer';
import { AuthSession, AuthUser } from '@/types/auth';

const mockUser: AuthUser = {
  id: 'user-1',
  email: 'test@example.com',
  passwordHash: 'hash',
  salt: 'salt',
  createdAt: '2025-01-01T00:00:00.000Z',
};

const mockSession: AuthSession = {
  token: 'session-token',
  userId: mockUser.id,
  issuedAt: 0,
  expiresAt: 1000,
};

describe('authReducer', () => {
  it('returns initial state', () => {
    expect(initialAuthState.status).toBe(AUTH_STATUS.loading);
    expect(initialAuthState.user).toBeNull();
  });

  it('restores authenticated state when user and session provided', () => {
    const result = authReducer(initialAuthState, {
      type: 'RESTORE',
      payload: { users: [mockUser], user: mockUser, session: mockSession },
    });

    expect(result.status).toBe(AUTH_STATUS.authenticated);
    expect(result.user).toEqual(mockUser);
    expect(result.session).toEqual(mockSession);
  });

  it('restores unauthenticated state when session missing', () => {
    const result = authReducer(initialAuthState, {
      type: 'RESTORE',
      payload: { users: [], user: null, session: null },
    });

    expect(result.status).toBe(AUTH_STATUS.unauthenticated);
    expect(result.user).toBeNull();
    expect(result.session).toBeNull();
  });

  it('handles login success', () => {
    const result = authReducer(initialAuthState, {
      type: 'LOGIN_SUCCESS',
      payload: { user: mockUser, session: mockSession },
    });

    expect(result.status).toBe(AUTH_STATUS.authenticated);
    expect(result.user).toEqual(mockUser);
    expect(result.session).toEqual(mockSession);
  });

  it('handles register success and tracks users', () => {
    const result = authReducer(initialAuthState, {
      type: 'REGISTER_SUCCESS',
      payload: { user: mockUser, session: mockSession, users: [mockUser] },
    });

    expect(result.status).toBe(AUTH_STATUS.authenticated);
    expect(result.users).toHaveLength(1);
  });

  it('handles logout transition', () => {
    const authenticatedState = {
      ...initialAuthState,
      status: AUTH_STATUS.authenticated,
      user: mockUser,
      session: mockSession,
      users: [mockUser],
    };

    const result = authReducer(authenticatedState, { type: 'LOGOUT' });

    expect(result.status).toBe(AUTH_STATUS.unauthenticated);
    expect(result.user).toBeNull();
    expect(result.session).toBeNull();
  });
});
