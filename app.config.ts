const EXPO_PUBLIC_APP_VERSION = process.env.EXPO_PUBLIC_VERSION;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const config = {
  expo: {
    name: 'Bloom',
    slug: 'Bloom',
    version: EXPO_PUBLIC_APP_VERSION,
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#1F2142',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.agave-solutions.bloom',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#1F2142',
      },
      package: 'com.agave_solutions.bloom',
      config: {
        googleMaps: {
          apiKey: GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '337fa667-fb10-4066-95dd-7cf0521905c5',
      },
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: 'https://u.expo.dev/337fa667-fb10-4066-95dd-7cf0521905c5',
    },
  },
};
