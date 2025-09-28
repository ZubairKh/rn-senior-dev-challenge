import { AUTH_STATUS } from '@/constants/auth';
import { AuthSession, AuthStatus, AuthUser } from '@/types/auth';

export type AuthState = {
  status: AuthStatus;
  user: AuthUser | null;
  session: AuthSession | null;
  users: AuthUser[];
  error: string | null;
  isProcessing: boolean;
};

export type AuthAction =
  | { type: 'RESTORE'; payload: { user: AuthUser | null; session: AuthSession | null; users: AuthUser[] } }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: { user: AuthUser; session: AuthSession } }
  | { type: 'REGISTER_SUCCESS'; payload: { user: AuthUser; session: AuthSession; users: AuthUser[] } }
  | { type: 'LOGOUT' };

export const initialAuthState: AuthState = {
  status: AUTH_STATUS.loading,
  user: null,
  session: null,
  users: [],
  error: null,
  isProcessing: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE': {
      const { user, session, users } = action.payload;
      return {
        ...state,
        status: user && session ? AUTH_STATUS.authenticated : AUTH_STATUS.unauthenticated,
        user,
        session,
        users,
        isProcessing: false,
        error: null,
      };
    }
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        status: AUTH_STATUS.authenticated,
        user: action.payload.user,
        session: action.payload.session,
        isProcessing: false,
        error: null,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        status: AUTH_STATUS.authenticated,
        user: action.payload.user,
        session: action.payload.session,
        users: action.payload.users,
        isProcessing: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        status: AUTH_STATUS.unauthenticated,
        user: null,
        session: null,
        isProcessing: false,
        error: null,
      };
    default:
      return state;
  }
}
