import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';

type WeatherMetricPillProps = {
  icon: string;
  label: string;
  value: string;
  tint: string;
  background: string;
};

export const WeatherMetricPill: React.FC<WeatherMetricPillProps> = ({
  icon,
  label,
  value,
  tint,
  background,
}) => (
  <View style={[styles.container, { backgroundColor: background }]}>
    <Feather name={icon as any} size={16} color={tint} style={styles.icon} />
    <View>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedText style={styles.value}>{value}</ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    flexGrow: 1,
    minWidth: 110,
  },
  icon: {
    marginTop: 2,
  },
  label: {
    fontSize: 12,
    opacity: 0.65,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
  },
});
