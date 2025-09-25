import React, { forwardRef, useImperativeHandle } from 'react';
import TestRenderer, { act } from 'react-test-renderer';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useLoginForm } from '@/hooks/auth/useLoginForm';

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: jest.fn() }),
}));

type LoginFormHandle = ReturnType<typeof useLoginForm> & {
  logout: () => Promise<void>;
};

const Harness = forwardRef<LoginFormHandle>((_, ref) => {
  const form = useLoginForm();
  const { logout } = useAuth();

  useImperativeHandle(ref, () => ({ ...form, logout }));
  return null;
});

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

const renderLoginHarness = () => {
  const ref = React.createRef<LoginFormHandle>();

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

describe('useLoginForm', () => {
  it('surfaces an error when credentials are invalid', async () => {
    const ref = renderLoginHarness();

    await act(async () => {
      ref.current?.setEmail('user@example.com');
      ref.current?.setPassword('Pass!word1');
    });

    await act(async () => {
      await ref.current?.submit();
    });

    await act(async () => {
      await flushPromises();
    });

    expect(ref.current?.canSubmit).toBe(true);
    expect(ref.current?.formError).toBe('Incorrect email or password.');
  });

  it('clears error state on focus handler', async () => {
    const ref = renderLoginHarness();

    await act(async () => {
      ref.current?.setEmail('user@example.com');
      ref.current?.setPassword('Pass!word1');
    });

    await act(async () => {
      await ref.current?.submit();
    });

    await act(async () => {
      await flushPromises();
    });

    expect(ref.current?.formError).toBeTruthy();

    act(() => {
      ref.current?.handleFocus();
    });

    expect(ref.current?.formError).toBeNull();
  });
});
