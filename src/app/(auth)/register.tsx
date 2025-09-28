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
  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(ROUTES.auth.login);
  };
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
  const errorColor = '#ff3b30';

  return (
    <AuthScaffold
      title="Create an account"
      subtitle="Sign up to get activity tips based on the latest weather."
      scrollable
      onBackPress={handleBackPress}
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
      {formError ? (
        <ThemedText style={[authStyles.errorText, { color: errorColor }]}>
          {formError}
        </ThemedText>
      ) : null}
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
