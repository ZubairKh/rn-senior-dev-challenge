import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { AUTH_RULES, AUTH_STATUS } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { PasswordRules, validateRegistrationCredentials } from '@/services/authValidation';

const PASSWORD_RULES: PasswordRules = {
  minLength: AUTH_RULES.minPasswordLength,
  complexity: AUTH_RULES.passwordComplexity,
  guidance: AUTH_RULES.passwordGuidance,
};

export const useRegisterForm = (rules: PasswordRules = PASSWORD_RULES) => {
  const router = useRouter();
  const {
    state: { status, error, isProcessing },
    register,
    clearError,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const canSubmit =
    email.trim().length > 0 && password.trim().length > 0 && confirmPassword.trim().length > 0;

  useEffect(() => {
    if (error) {
      setFormError(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    if (status === AUTH_STATUS.authenticated) {
      router.replace(ROUTES.tabs.root);
    }
  }, [status, router]);

  const submit = useCallback(async () => {
    setFormError(null);

    if (password.trim() !== confirmPassword.trim()) {
      setFormError('Passwords do not match.');
      return;
    }

    const validation = validateRegistrationCredentials(email, password, rules);
    if (validation.error) {
      setFormError(validation.error);
      return;
    }

    await register(validation.email, validation.password);
  }, [email, password, confirmPassword, rules, register]);

  const handleFocus = useCallback(() => {
    if (formError) {
      setFormError(null);
    }
    if (error) {
      clearError();
    }
  }, [formError, error, clearError]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    submit,
    formError,
    canSubmit,
    isProcessing,
    handleFocus,
  };
};
