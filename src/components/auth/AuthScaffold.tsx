import { Ionicons } from '@expo/vector-icons';
import React, { PropsWithChildren, ReactNode, useMemo } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BlobBackdrop } from '@/components/layout/BlobBackdrop';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useThemeColor } from '@/hooks/useThemeColor';
import { authStyles } from './styles';

type AuthScaffoldProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  scrollable?: boolean;
  onBackPress?: () => void;
  contentAlignmentOverride?: 'flex-start' | 'center';
}>;

export const AuthScaffold: React.FC<AuthScaffoldProps> = ({
  title,
  subtitle,
  footer,
  children,
  scrollable,
  onBackPress,
  contentAlignmentOverride,
}) => {
  const {
    maxWidth,
    paddingHorizontal,
    paddingVertical,
    contentGap,
    contentAlignment,
    shouldUseScroll,
  } = useResponsiveLayout();

  const canvasColor = useThemeColor({}, 'canvas');
  const surfaceColor = useThemeColor({}, 'surface');
  const cardBorderColor = 'rgba(10, 126, 164, 0.12)';
  const backButtonBackground = 'rgba(10,126,164,0.08)';
  const backIconColor = '#0b3d62';
  const topBlobColor = 'rgba(59,130,246,0.22)';
  const bottomBlobColor = 'rgba(14,165,233,0.18)';

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      maxWidth,
      width: '100%',
      alignSelf: 'center',
    }),
    [maxWidth],
  );

  const paddingStyle = useMemo<ViewStyle>(
    () => ({
      paddingHorizontal,
      paddingVertical,
    }),
    [paddingHorizontal, paddingVertical],
  );

  const finalAlignment = contentAlignmentOverride ?? contentAlignment;

  const spacingStyle = useMemo<ViewStyle>(
    () => ({
      gap: contentGap,
      justifyContent: finalAlignment,
    }),
    [contentGap, finalAlignment],
  );

  const scrollContentStyle = useMemo(
    () => [authStyles.scrollContent, paddingStyle, spacingStyle],
    [paddingStyle, spacingStyle],
  );

  const useScrollContainer = scrollable ?? shouldUseScroll;

  const content = (
    <ThemedView
      style={[
        authStyles.container,
        spacingStyle,
        { backgroundColor: surfaceColor, borderColor: cardBorderColor },
      ]}
      lightColor={surfaceColor}
    >
      {onBackPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBackPress}
          hitSlop={8}
          style={({ pressed }) => [
            authStyles.backButton,
            { backgroundColor: backButtonBackground, borderColor: cardBorderColor },
            pressed && authStyles.backButtonPressed,
          ]}
        >
          <Ionicons name="chevron-back" size={22} color={backIconColor} />
        </Pressable>
      ) : null}
      <View style={authStyles.header}>
        <ThemedText type="title">{title}</ThemedText>
        {subtitle ? <ThemedText type="defaultSemiBold">{subtitle}</ThemedText> : null}
      </View>

      <View style={authStyles.form}>{children}</View>

      {footer ? <View style={authStyles.footer}>{footer}</View> : null}
    </ThemedView>
  );

  return (
    <SafeAreaView
      style={[authStyles.safeArea, { backgroundColor: canvasColor }]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <BlobBackdrop
        style={[authStyles.background, { backgroundColor: canvasColor }]}
        topColor={topBlobColor}
        bottomColor={bottomBlobColor}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            style={authStyles.flex}
            behavior={Platform.select({ ios: 'padding', default: 'height' })}
          >
            {useScrollContainer ? (
              <ScrollView
                style={authStyles.flex}
                contentContainerStyle={scrollContentStyle}
                keyboardShouldPersistTaps="handled"
              >
                <View style={[containerStyle, { alignSelf: 'center' }]}>{content}</View>
              </ScrollView>
            ) : (
              <View style={[authStyles.flex, paddingStyle, spacingStyle]}>
                <View style={containerStyle}>{content}</View>
              </View>
            )}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </BlobBackdrop>
    </SafeAreaView>
  );
};
