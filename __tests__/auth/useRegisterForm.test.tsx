import React, { forwardRef, useImperativeHandle } from 'react';
import TestRenderer, { act } from 'react-test-renderer';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: jest.fn() }),
}));

type RegisterFormHandle = ReturnType<typeof useRegisterForm> & {
  logout: () => Promise<void>;
};

const Harness = forwardRef<RegisterFormHandle>((_, ref) => {
  const form = useRegisterForm();
  const { logout } = useAuth();

  useImperativeHandle(ref, () => ({ ...form, logout }));
  return null;
});

const renderRegisterHarness = () => {
  const ref = React.createRef<RegisterFormHandle>();

  act(() => {
    TestRenderer.create(
      <AuthProvider>
        <Harness ref={ref} />
      </AuthProvider>,
    );
  });

  if (!ref.current) {
    throw new Error('Harness did not mount correctly');
  }

  return ref;
};

describe('useRegisterForm', () => {
  it('validates password confirmation mismatch', async () => {
    const ref = renderRegisterHarness();

    act(() => {
      ref.current?.setEmail('user@example.com');
      ref.current?.setPassword('Pass!word1');
      ref.current?.setConfirmPassword('Different1!');
    });

    await act(async () => {
      await ref.current?.submit();
    });

    expect(ref.current?.canSubmit).toBe(true);
    expect(ref.current?.formError).toBe('Passwords do not match.');
  });

  it('surfaces error when registering an existing email', async () => {
    const ref = renderRegisterHarness();

    act(() => {
      ref.current?.setEmail('duplicate@example.com');
      ref.current?.setPassword('Pass!word1');
      ref.current?.setConfirmPassword('Pass!word1');
    });

    await act(async () => {
      await ref.current?.submit();
    });

    // logout to attempt duplicate registration
    await act(async () => {
      await ref.current?.logout();
    });

    await act(async () => {
      await ref.current?.submit();
    });

    expect(ref.current?.canSubmit).toBe(true);
    expect(ref.current?.formError).toBe('An account already exists for that email address.');
  });
});
