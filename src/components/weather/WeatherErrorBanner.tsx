import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

type WeatherErrorBannerProps = {
  message: string;
  helper?: string;
};

export const WeatherErrorBanner: React.FC<WeatherErrorBannerProps> = ({ message, helper }) => {
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surfaceSecondary');

  return (
    <View style={[styles.container, { borderColor: border, backgroundColor: surface }]}>
      <ThemedText style={styles.title}>{message}</ThemedText>
      {helper ? <ThemedText style={styles.subtitle}>{helper}</ThemedText> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.8,
  },
});
