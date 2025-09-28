import { Feather } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { weatherDashboardHeaderStyles } from './WeatherDashboardHeader.styles';

export const WeatherDashboardSignOutButton: React.FC = () => {
  const danger = useThemeColor({}, 'danger');
  const surface = useThemeColor({}, 'surface');
  const {
    logout,
    state: { isProcessing },
  } = useAuth();
  const router = useRouter();
  const [localProcessing, setLocalProcessing] = useState(false);

  const handleSignOut = useCallback(async () => {
    setLocalProcessing(true);
    await logout();
    setLocalProcessing(false);
    router.replace(ROUTES.auth.login);
  }, [logout, router]);

  const processing = isProcessing || localProcessing;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Sign out"
      onPress={handleSignOut}
      disabled={processing}
      style={({ pressed }) => [
        weatherDashboardHeaderStyles.signOutButton,
        {
          backgroundColor: surface,
          borderColor: danger,
          opacity: processing ? 0.6 : 1,
        },
        pressed && !processing && weatherDashboardHeaderStyles.signOutButtonPressed,
      ]}
    >
      <Feather name="log-out" size={16} color={danger} />
      <ThemedText style={[weatherDashboardHeaderStyles.signOutLabel, { color: danger }]}>
        {processing ? 'Signing out…' : 'Sign out'}
      </ThemedText>
    </Pressable>
  );
};
