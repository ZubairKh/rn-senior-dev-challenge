import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { AUTH_STATUS } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';

export const useLoginForm = () => {
  const router = useRouter();
  const {
    state: { status, error, isProcessing },
    login,
    clearError,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

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
    await login(email, password);
  }, [login, email, password]);

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
    submit,
    isProcessing,
    formError,
     canSubmit,
    handleFocus,
  };
};
