import React from 'react';
import { ImageBackground, StyleSheet, View, ViewProps } from 'react-native';

const gradientSource = require('@/assets/images/auth-gradient.png');

export type GradientBackgroundProps = ViewProps & {
  overlayColor?: string;
};

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  style,
  children,
  overlayColor = 'rgba(255,255,255,0.6)',
  ...viewProps
}) => {
  return (
    <ImageBackground source={gradientSource} style={styles.image} resizeMode="cover">
      <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
      <View style={[styles.content, style]} {...viewProps}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
  },
});
