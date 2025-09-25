import { logger } from '@/services/logger';
import { loadSession, loadUsers } from '@/services/authStorage';
import { AuthSession, AuthUser } from '@/types/auth';

type RestoreAuthStateResult = {
  users: AuthUser[];
  session: AuthSession | null;
  user: AuthUser | null;
};

export const restoreAuthState = async (): Promise<RestoreAuthStateResult> => {
  const [usersResult, sessionResult] = await Promise.allSettled([loadUsers(), loadSession()]);

  let storedUsers: AuthUser[] = [];
  if (usersResult.status === 'fulfilled') {
    storedUsers = usersResult.value;
  } else {
    logger.warn('Failed to restore persisted users', usersResult.reason);
  }

  let storedSession: AuthSession | null = null;
  if (sessionResult.status === 'fulfilled') {
    storedSession = sessionResult.value;
  } else {
    logger.warn('Failed to restore persisted session', sessionResult.reason);
  }

  const hydratedUser = storedSession
    ? storedUsers.find((candidate) => candidate.id === storedSession?.userId) ?? null
    : null;

  return {
    users: storedUsers,
    session: hydratedUser ? storedSession : null,
    user: hydratedUser,
  };
};
