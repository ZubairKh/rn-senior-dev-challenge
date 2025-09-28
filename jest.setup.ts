import './__tests__/test-utils/mocks/nativeModules';

import { resetNativeMocks } from './__tests__/test-utils/mocks/nativeModules';

const fetchMock = jest.fn();
(globalThis as any).fetch = fetchMock;

afterEach(() => {
  resetNativeMocks();
  fetchMock.mockReset();
});
