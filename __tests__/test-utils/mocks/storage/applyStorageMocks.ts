export type StorageMockConfig = {
  secureAvailable: boolean;
  asyncData: Record<string, string>;
  secureData: Record<string, string>;
};

export type StorageMockHandles = {
  asyncGetItem: jest.Mock<Promise<string | null>, [string]>;
  asyncSetItem: jest.Mock<Promise<void>, [string, string]>;
  asyncRemoveItem: jest.Mock<Promise<void>, [string]>;
  secureGetItem: jest.Mock<Promise<string | null>, [string]>;
  secureSetItem: jest.Mock<Promise<void>, [string, string]>;
  secureDeleteItem: jest.Mock<Promise<void>, [string]>;
  secureIsAvailable: jest.Mock<Promise<boolean>, []>;
};

export const applyStorageMocks = ({
  secureAvailable,
  asyncData,
  secureData,
}: StorageMockConfig): StorageMockHandles => {
  const asyncGetItem = jest.fn((key: string) => Promise.resolve(asyncData[key] ?? null));
  const asyncSetItem = jest.fn((key: string, value: string) => {
    asyncData[key] = value;
    return Promise.resolve();
  });
  const asyncRemoveItem = jest.fn((key: string) => {
    delete asyncData[key];
    return Promise.resolve();
  });

  const secureGetItem = jest.fn((key: string) => Promise.resolve(secureData[key] ?? null));
  const secureSetItem = jest.fn((key: string, value: string) => {
    secureData[key] = value;
    return Promise.resolve();
  });
  const secureDeleteItem = jest.fn((key: string) => {
    delete secureData[key];
    return Promise.resolve();
  });
  const secureIsAvailable = jest.fn(() => Promise.resolve(secureAvailable));

  jest.doMock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
      getItem: asyncGetItem,
      setItem: asyncSetItem,
      removeItem: asyncRemoveItem,
    },
  }));

  jest.doMock('expo-secure-store', () => ({
    __esModule: true,
    isAvailableAsync: secureIsAvailable,
    getItemAsync: secureGetItem,
    setItemAsync: secureSetItem,
    deleteItemAsync: secureDeleteItem,
  }));

  return {
    asyncGetItem,
    asyncSetItem,
    asyncRemoveItem,
    secureGetItem,
    secureSetItem,
    secureDeleteItem,
    secureIsAvailable,
  };
};
