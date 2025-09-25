import React from 'react';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

import { authStyles } from './styles';

type AuthPrimaryButtonProps = {
  label: string;
  loadingLabel?: string;
  isLoading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export const AuthPrimaryButton: React.FC<AuthPrimaryButtonProps> = ({
  label,
  loadingLabel,
  isLoading = false,
  onPress,
  disabled = false,
}) => (
  <Pressable
    onPress={onPress}
    disabled={isLoading || disabled}
    style={({ pressed }) => [
      authStyles.primaryButton,
      pressed && authStyles.primaryButtonPressed,
      (isLoading || disabled) && authStyles.primaryButtonDisabled,
    ]}
  >
    <ThemedText type="defaultSemiBold" style={authStyles.primaryButtonText}>
      {isLoading ? loadingLabel ?? label : label}
    </ThemedText>
  </Pressable>
);
