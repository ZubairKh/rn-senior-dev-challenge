import { AuthFooterSwitch } from '@/components/auth/AuthFooterSwitch';
import { AuthPrimaryButton } from '@/components/auth/AuthPrimaryButton';
import { AuthScaffold } from '@/components/auth/AuthScaffold';
import { AuthTextField } from '@/components/auth/AuthTextField';
import { authStyles } from '@/components/auth/styles';
import { ThemedText } from '@/components/ThemedText';
import { ROUTES } from '@/constants/routes';
import { useLoginForm } from '@/hooks/auth/useLoginForm';

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    submit,
    isProcessing,
    formError,
    canSubmit,
    handleFocus,
  } = useLoginForm();
  const errorColor = '#ff3b30';

  return (
    <AuthScaffold
      title="Welcome"
      subtitle="Sign in to track how the environment impacts your routines."
      contentAlignmentOverride="center"
      footer={
        <AuthFooterSwitch
          prompt="Need an account?"
          linkLabel="Create one"
          href={ROUTES.auth.register}
        />
      }
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
        placeholder="••••••••"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
        returnKeyType="done"
        onSubmitEditing={submit}
        onFocus={handleFocus}
      />
      {formError ? (
        <ThemedText style={[authStyles.helperText, { color: errorColor }]}>
          {formError}
        </ThemedText>
      ) : null}
      <AuthPrimaryButton
        label="Sign in"
        loadingLabel="Signing in…"
        isLoading={isProcessing}
        onPress={submit}
        disabled={!canSubmit}
      />
    </AuthScaffold>
  );
}
