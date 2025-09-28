export const ROUTES = {
  root: '/',
  auth: {
    root: '/(auth)' as const,
    login: '/(auth)/login' as const,
    register: '/(auth)/register' as const,
  },
  dashboard: '/dashboard' as const,
};
