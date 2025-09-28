import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewProps } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface FullScreenLoaderProps extends ViewProps {
  label?: string;
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  label = 'Loading…',
  style,
  ...rest
}) => {
  return (
    <ThemedView style={[styles.container, style]} {...rest}>
      <View style={styles.content}>
        <ActivityIndicator size="large" />
        {label ? <ThemedText style={styles.label}>{label}</ThemedText> : null}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    gap: 12,
  },
  label: {
    textAlign: 'center',
  },
});
