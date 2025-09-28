import type { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
    name: 'HET',
    slug: 'health-environment-tracker',
    scheme: 'rn-senior-dev-challenge',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/images/app_icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
        image: './src/assets/images/app_icon.png',
        resizeMode: 'contain',
        backgroundColor: '#e0f2fe',
    },
    assetBundlePatterns: ['src/assets/**/*'],
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './src/assets/images/adaptive-icon.png',
            backgroundColor: '#ffffff',
        },
    },
    web: {
        favicon: './src/assets/images/favicon.png',
    },
    extra: {
        authPasswordPepper: process.env.AUTH_PASSWORD_PEPPER ?? 'change-me',
    },
};

export default config;
