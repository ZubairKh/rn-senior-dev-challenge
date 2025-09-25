export const ROUTES = {
  root: '/',
  auth: {
    root: '/(auth)' as const,
    login: '/(auth)/login' as const,
    register: '/(auth)/register' as const,
  },
  tabs: {
    root: '/(tabs)' as const,
    dashboard: '/(tabs)/index' as const,
    explore: '/(tabs)/explore' as const,
  },
};
