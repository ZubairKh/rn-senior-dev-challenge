export const ENV = {
  auth: {
    passwordPepper: process.env.EXPO_PUBLIC_AUTH_PASSWORD_PEPPER ?? '',
  },
  weather: {
    apiBaseUrl: process.env.EXPO_PUBLIC_OWM_API_URL ?? 'https://api.openweathermap.org',
    apiKey: process.env.EXPO_PUBLIC_OWM_API_KEY ?? '',
  },
};

export const assertWeatherEnv = () => {
  if (!ENV.weather.apiKey) {
    throw new Error('Missing EXPO_PUBLIC_OWM_API_KEY environment variable');
  }
};
