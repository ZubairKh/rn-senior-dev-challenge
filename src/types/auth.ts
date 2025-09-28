import { AUTH_STATUS } from '@/constants/auth';

export type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

export type AuthUser = {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
};

export type AuthSession = {
  token: string;
  userId: string;
  issuedAt: number;
  expiresAt: number;
};
