import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export type BlobBackdropProps = ViewProps & {
  topColor: string;
  bottomColor: string;
};

export const BlobBackdrop: React.FC<BlobBackdropProps> = ({
  topColor,
  bottomColor,
  style,
  children,
  ...rest
}) => {
  return (
    <View style={[styles.root, style]} {...rest}>
      <View pointerEvents="none" style={styles.decoratorLayer}>
        <View style={[styles.decoratorBlob, styles.topBlob, { backgroundColor: topColor }]} />
        <View style={[styles.decoratorBlob, styles.bottomBlob, { backgroundColor: bottomColor }]} />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  decoratorLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    overflow: 'hidden',
  },
  decoratorBlob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    opacity: 0.28,
  },
  topBlob: {
    top: -160,
    right: -120,
  },
  bottomBlob: {
    bottom: -220,
    left: -140,
  },
});
