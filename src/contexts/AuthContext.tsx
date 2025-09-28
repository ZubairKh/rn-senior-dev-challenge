import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from 'react';

import { AUTH_RULES, AUTH_SECURITY, DEFAULT_PASSWORD_PEPPER } from '@/constants/auth';
import { AuthState, authReducer, initialAuthState } from '@/contexts/authReducer';
import { createSession, createUserId, generateSalt, hashPassword } from '@/services/authCrypto';
import { restoreAuthState } from '@/services/authBootstrap';
import { logger } from '@/services/logger';
import {
  validateRegistrationCredentials,
  validateLoginCredentials,
  PasswordRules,
} from '@/services/authValidation';
import { loadUsers, persistSession, persistUsers } from '@/services/authStorage';
import { AuthUser } from '@/types/auth';

const passwordRules: PasswordRules = {
  minLength: AUTH_RULES.minPasswordLength,
  complexity: AUTH_RULES.passwordComplexity,
  guidance: AUTH_RULES.passwordGuidance,
};

export type AuthContextValue = {
  state: AuthState;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test' && AUTH_SECURITY.passwordPepper === DEFAULT_PASSWORD_PEPPER) {
      logger.warn(
        'Auth password pepper is using the default value. Provide EXPO_PUBLIC_AUTH_PASSWORD_PEPPER in your environment for production builds.',
      );
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const { users, session, user } = await restoreAuthState();

        if (!isMounted) {
          return;
        }

        dispatch({
          type: 'RESTORE',
          payload: {
            users,
            session,
            user,
          },
        });
      } catch (error) {
        logger.error('Auth bootstrap failed', error);
        if (!isMounted) {
          return;
        }
        dispatch({ type: 'RESTORE', payload: { users: [], session: null, user: null } });
      }
    };

    bootstrap();
    return () => {
      isMounted = false;
    };
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    dispatch({ type: 'SET_ERROR', payload: null });

    const validation = validateRegistrationCredentials(email, password, passwordRules);
    if (validation.error) {
      dispatch({ type: 'SET_ERROR', payload: validation.error });
      return;
    }

    dispatch({ type: 'SET_PROCESSING', payload: true });

    try {
      const users = await loadUsers();
      const existing = users.find((user) => user.email === validation.email);

      if (existing) {
        dispatch({ type: 'SET_ERROR', payload: 'An account already exists for that email address.' });
        dispatch({ type: 'SET_PROCESSING', payload: false });
        return;
      }

      const salt = await generateSalt();
      const passwordHash = await hashPassword(validation.password, salt);

      const newUser: AuthUser = {
        id: createUserId(),
        email: validation.email,
        passwordHash,
        salt,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];
      await persistUsers(updatedUsers);

      const session = createSession(newUser.id);
      await persistSession(session);

      dispatch({ type: 'REGISTER_SUCCESS', payload: { user: newUser, session, users: updatedUsers } });
    } catch (error) {
      logger.error('Registration failed', error);
      dispatch({ type: 'SET_ERROR', payload: 'Unable to register right now. Please try again.' });
      dispatch({ type: 'SET_PROCESSING', payload: false });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const validation = validateLoginCredentials(email, password);

    if (validation.error) {
      dispatch({ type: 'SET_ERROR', payload: validation.error });
      return;
    }

    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_PROCESSING', payload: true });

    try {
      const users = state.users.length > 0 ? state.users : await loadUsers();
      const user = users.find((candidate) => candidate.email === validation.email);

      if (!user) {
        dispatch({ type: 'SET_ERROR', payload: 'Incorrect email or password.' });
        dispatch({ type: 'SET_PROCESSING', payload: false });
        return;
      }

      const computedHash = await hashPassword(validation.password, user.salt);
      if (computedHash !== user.passwordHash) {
        dispatch({ type: 'SET_ERROR', payload: 'Incorrect email or password.' });
        dispatch({ type: 'SET_PROCESSING', payload: false });
        return;
      }

      const session = createSession(user.id);
      await persistSession(session);

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, session } });
    } catch (error) {
      logger.error('Login failed', error);
      dispatch({ type: 'SET_ERROR', payload: 'Unable to sign in right now. Please try again.' });
      dispatch({ type: 'SET_PROCESSING', payload: false });
    }
  }, [state.users]);

  const logout = useCallback(async () => {
    dispatch({ type: 'SET_PROCESSING', payload: true });
    try {
      await persistSession(null);
    } catch (error) {
      logger.warn('Failed to clear session', error);
    }
    dispatch({ type: 'LOGOUT' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      state,
      register,
      login,
      logout,
      clearError,
    }),
    [state, register, login, logout, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
