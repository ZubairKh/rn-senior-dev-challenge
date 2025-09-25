type NativeMockState = {
  asyncStorageData: Record<string, string>;
  secureStoreData: Record<string, string>;
  uuidCounter: number;
};

const getGlobalState = (): NativeMockState => {
  const globalWithMocks = globalThis as typeof globalThis & {
    __authTestMocks?: NativeMockState;
  };

  if (!globalWithMocks.__authTestMocks) {
    globalWithMocks.__authTestMocks = {
      asyncStorageData: {},
      secureStoreData: {},
      uuidCounter: 0,
    };
  }

  return globalWithMocks.__authTestMocks;
};

type AsyncStorageMockShape = {
  getItem: jest.Mock<Promise<string | null>, [string]>;
  setItem: jest.Mock<Promise<void>, [string, string]>;
  removeItem: jest.Mock<Promise<void>, [string]>;
};

type SecureStoreMockShape = {
  isAvailableAsync: jest.Mock<Promise<boolean>, []>;
  getItemAsync: jest.Mock<Promise<string | null>, [string]>;
  setItemAsync: jest.Mock<Promise<void>, [string, string]>;
  deleteItemAsync: jest.Mock<Promise<void>, [string]>;
};

type ExpoCryptoMockShape = {
  CryptoDigestAlgorithm: {
    SHA256: 'SHA-256';
  };
  digestStringAsync: jest.Mock<Promise<string>, [string, string]>;
  getRandomBytesAsync: jest.Mock<Promise<Uint8Array>, []>;
  randomUUID: jest.Mock<string, []>;
};

jest.mock('@react-native-async-storage/async-storage', () => {
  const state = getGlobalState();

  const mock: AsyncStorageMockShape = {
    getItem: jest.fn((key: string) => Promise.resolve(state.asyncStorageData[key] ?? null)),
    setItem: jest.fn((key: string, value: string) => {
      state.asyncStorageData[key] = value;
      return Promise.resolve();
    }),
    removeItem: jest.fn((key: string) => {
      delete state.asyncStorageData[key];
      return Promise.resolve();
    }),
  };

  return {
    __esModule: true,
    default: mock,
  } as unknown as typeof import('@react-native-async-storage/async-storage');
});

jest.mock('expo-secure-store', () => {
  const state = getGlobalState();

  const module: SecureStoreMockShape = {
    isAvailableAsync: jest.fn(() => Promise.resolve(true)),
    getItemAsync: jest.fn((key: string) => Promise.resolve(state.secureStoreData[key] ?? null)),
    setItemAsync: jest.fn((key: string, value: string) => {
      state.secureStoreData[key] = value;
      return Promise.resolve();
    }),
    deleteItemAsync: jest.fn((key: string) => {
      delete state.secureStoreData[key];
      return Promise.resolve();
    }),
  };

  return {
    __esModule: true,
    ...module,
  } as unknown as typeof import('expo-secure-store');
});

jest.mock('expo-crypto', () => {
  const state = getGlobalState();

  const module: ExpoCryptoMockShape = {
    CryptoDigestAlgorithm: {
      SHA256: 'SHA-256',
    },
    digestStringAsync: jest.fn((_algorithm: string, value: string) =>
      Promise.resolve(`digest:${value}`),
    ),
    getRandomBytesAsync: jest.fn(() => Promise.resolve(new Uint8Array([0x01, 0x02, 0x03, 0x04]))),
    randomUUID: jest.fn(() => `uuid-${++state.uuidCounter}`),
  };

  return {
    __esModule: true,
    ...module,
  } as unknown as typeof import('expo-crypto');
});

export const resetNativeMocks = () => {
  const state = getGlobalState();

  state.uuidCounter = 0;
  Object.keys(state.asyncStorageData).forEach((key) => delete state.asyncStorageData[key]);
  Object.keys(state.secureStoreData).forEach((key) => delete state.secureStoreData[key]);

  const asyncStorageModule = jest.requireMock('@react-native-async-storage/async-storage')
    .default as unknown as AsyncStorageMockShape;
  asyncStorageModule.getItem.mockClear();
  asyncStorageModule.setItem.mockClear();
  asyncStorageModule.removeItem.mockClear();

  const secureStoreModule = jest.requireMock('expo-secure-store') as unknown as SecureStoreMockShape;
  secureStoreModule.isAvailableAsync.mockClear();
  secureStoreModule.getItemAsync.mockClear();
  secureStoreModule.setItemAsync.mockClear();
  secureStoreModule.deleteItemAsync.mockClear();

  const cryptoModule = jest.requireMock('expo-crypto') as unknown as ExpoCryptoMockShape;
  cryptoModule.digestStringAsync.mockClear();
  cryptoModule.getRandomBytesAsync.mockClear();
  cryptoModule.randomUUID.mockClear();
};
