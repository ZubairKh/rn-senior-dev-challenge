export const AUTH_STORAGE_KEYS = {
  users: 'envTracker.users',
  session: 'envTracker.session',
  sessionFallback: 'envTracker.session.fallback',
} as const;

export const DEFAULT_PASSWORD_PEPPER = 'change-me';

export const AUTH_SECURITY = {
  passwordPepper:
    typeof process !== 'undefined' && process.env.EXPO_PUBLIC_AUTH_PASSWORD_PEPPER
      ? process.env.EXPO_PUBLIC_AUTH_PASSWORD_PEPPER
      : DEFAULT_PASSWORD_PEPPER,
  sessionTtlMs: 1000 * 60 * 60 * 12,
} as const;

export const AUTH_RULES = {
  minPasswordLength: 8,
  passwordComplexity: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
  passwordGuidance: 'At least 8 characters with upper & lower case letters, numbers and a special character.',
} as const;

export const AUTH_STATUS = {
  loading: 'loading',
  unauthenticated: 'unauthenticated',
  authenticated: 'authenticated',
} as const;
