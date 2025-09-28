import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export const WeatherLoader: React.FC = () => {
  const tint = useThemeColor({}, 'tint');

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={tint} />
      <ThemedText style={styles.label}>Fetching the latest weather insights…</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 48,
  },
  label: {
    opacity: 0.7,
  },
});
