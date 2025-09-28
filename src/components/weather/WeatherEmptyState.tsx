import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const WeatherEmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.iconBadge}>
        <Feather name="cloud-off" size={28} color="#0a7ea4" />
      </ThemedView>
      <ThemedText type="title" style={styles.title}>
        No weather insights
      </ThemedText>
      <ThemedText style={styles.subtitle}>{message}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 64,
    gap: 14,
    alignItems: 'center',
    borderRadius: '5%',
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(10,126,164,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 260,
    opacity: 0.7,
  },
});
