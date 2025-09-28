import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

import { authStyles } from './styles';

type AuthTextFieldProps = TextInputProps & {
  label: string;
};

export const AuthTextField: React.FC<AuthTextFieldProps> = ({ label, style, ...rest }) => {
  return (
    <View style={authStyles.fieldWrapper}>
      <ThemedText style={authStyles.label}>{label}</ThemedText>
      <TextInput style={[authStyles.input, style]} {...rest} />
    </View>
  );
};
