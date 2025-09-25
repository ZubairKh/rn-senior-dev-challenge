import { useRouter } from 'expo-router';

import { AuthPrimaryButton } from '@/components/auth/AuthPrimaryButton';
import { AuthScaffold } from '@/components/auth/AuthScaffold';
import { AuthTextField } from '@/components/auth/AuthTextField';
import { authStyles } from '@/components/auth/styles';
import { ThemedText } from '@/components/ThemedText';
import { AUTH_RULES } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';

export default function RegisterScreen() {
  const router = useRouter();
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    submit,
    formError,
    isProcessing,
    canSubmit,
    handleFocus,
  } = useRegisterForm();

  return (
    <AuthScaffold
      title="Create your account"
      subtitle="Personalize activity recommendations with precise weather insights."
      scrollable
      onBackPress={() => router.replace(ROUTES.auth.login)}
    >
      <AuthTextField
        label="Email"
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        returnKeyType="next"
        onFocus={handleFocus}
      />
      <AuthTextField
        label="Password"
        placeholder="8+ characters"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="newPassword"
        returnKeyType="next"
        onFocus={handleFocus}
      />
      <ThemedText style={authStyles.helperText}>{AUTH_RULES.passwordGuidance}</ThemedText>
      <AuthTextField
        label="Confirm password"
        placeholder="Repeat password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        textContentType="password"
        returnKeyType="done"
        onSubmitEditing={submit}
        onFocus={handleFocus}
      />
      {formError ? <ThemedText style={authStyles.errorText}>{formError}</ThemedText> : null}
      <AuthPrimaryButton
        label="Sign up"
        loadingLabel="Creating account…"
        isLoading={isProcessing}
        onPress={submit}
        disabled={!canSubmit}
      />
    </AuthScaffold>
  );
}
