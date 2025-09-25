import React, { forwardRef, useImperativeHandle } from 'react';
import TestRenderer, { act } from 'react-test-renderer';

import { AUTH_STATUS } from '@/constants/auth';
import { AuthContextValue, AuthProvider, useAuth } from '@/contexts/AuthContext';

const Harness = forwardRef<AuthContextValue>((_, ref) => {
  const auth = useAuth();
  useImperativeHandle(ref, () => auth, [auth]);
  return null;
});

const strongPassword = 'ValidPass!A';

describe('AuthProvider integration', () => {
  it('supports register, login, logout and rejects bad credentials', async () => {
    const ref = React.createRef<AuthContextValue>();

    await act(async () => {
      TestRenderer.create(
        <AuthProvider>
          <Harness ref={ref} />
        </AuthProvider>,
      );
    });

    const getAuth = () => {
      const context = ref.current;
      if (!context) {
        throw new Error('Auth context not available');
      }
      return context;
    };

    await act(async () => {
      await getAuth().register('user@example.com', strongPassword);
    });

    expect(getAuth().state.status).toBe(AUTH_STATUS.authenticated);

    await act(async () => {
      await getAuth().logout();
    });

    expect(getAuth().state.status).toBe(AUTH_STATUS.unauthenticated);

    await act(async () => {
      await getAuth().login('user@example.com', strongPassword);
    });

    expect(getAuth().state.status).toBe(AUTH_STATUS.authenticated);

    await act(async () => {
      await getAuth().logout();
    });

    expect(getAuth().state.status).toBe(AUTH_STATUS.unauthenticated);

    await act(async () => {
      await getAuth().login('user@example.com', 'WrongPassword!');
    });

    expect(getAuth().state.status).toBe(AUTH_STATUS.unauthenticated);
    expect(getAuth().state.error).toBe('Incorrect email or password.');
  });
});
