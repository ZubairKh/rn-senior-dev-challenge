import { Redirect } from 'expo-router';

import { FullScreenLoader } from '@/components/common/FullScreenLoader';
import { AUTH_STATUS } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const {
    state: { status, isProcessing },
  } = useAuth();

  if (status === AUTH_STATUS.loading || isProcessing) {
    return <FullScreenLoader label="Preparing your experience…" />;
  }

  if (status === AUTH_STATUS.authenticated) {
    return <Redirect href={ROUTES.tabs.root} />;
  }

  return <Redirect href={ROUTES.auth.login} />;
}
