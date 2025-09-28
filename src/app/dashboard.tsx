import { DashboardScreen } from '@/components/dashboard';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeatherDashboardScreen() {
  const canvas = useThemeColor({}, 'canvas');

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: canvas }]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <DashboardScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
