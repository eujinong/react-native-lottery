import { Platform } from 'react-native';

const config = {
  API_ENDPOINT: 'https://loteriasdominicanas.com/mobile-api-new',

  // ADMOB
  ADMOB: {
    REWARDED_MAX: 4,
    SECRETS: Platform.select({
      ios: {
        BANNER: 'ca-app-pub-1196303242456869/1836073509',
        INTERSTITIAL: 'ca-app-pub-1196303242456869/8046258636'
      },
      android: {
        BANNER: 'ca-app-pub-1196303242456869/1842769753',
        INTERSTITIAL: 'ca-app-pub-1196303242456869/4137335574'
      }
    })
  },

  FIELDS: {
    DOMAIN: 'domain'
  },

  SETTINGS: {
    ENCRYPT: true,
    REFRESH_INTERVAL: 18000,
    DIFFERENCE_IN_MILISECONDS: 0
  },

  VARIABLES: {
    app: null
  }
};

export default config;
