import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DashboardScreen } from '@/components/dashboard';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet } from 'react-native';

export default function WeatherDashboardScreen() {
  const router = useRouter();
  const {
    state: { user, isProcessing },
    logout,
  } = useAuth();
  const canvas = useThemeColor({}, 'canvas');

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace(ROUTES.auth.login);
  }, [logout, router]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: canvas }]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <DashboardScreen
        userDisplayName={user?.email?.split('@')[0] ?? 'there'}
        isProcessingLogout={isProcessing}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
