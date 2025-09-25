import './__tests__/test-utils/mocks/nativeModules';

import { resetNativeMocks } from './__tests__/test-utils/mocks/nativeModules';

afterEach(() => {
  resetNativeMocks();
});
