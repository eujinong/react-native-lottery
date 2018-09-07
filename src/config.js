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
    REFRESH_INTERVAL: 18000
  },

  VIEW_OPTIONS: {
    THEME: 'yellow',
    INITIAL_MENU: {
      ID: 'companies',
      OPTIONS: {
        toggle: true,
        trigger: true
      }
    },
    MENUS: {
      SHOW_COMPANIES: true,
      SHOW_POOLS: false,
      SHOW_STATS: false
    },
    LAYOUTS: {
      LOGO_ASPECT_RATIO: 247 / 110,
      SHOW_ALL_GAMES_AT_COMPANY: true,
      BREED_CRUMB_COMPANY_DISTINCTION: true,
      MENU_PRIMARY_DISTINCTION: true
    },
    NAVIGATIONS: {
      SHOW_TITLE: true
    }
  },
  ENUMS: {
    SCREEN_TYPE: {
      HOME: 1,
      MENU: 2,
      COMPANY: 3,
      GAME: 4,
      STAT_PREVIOUS_YEARS: 5,
      STAT_HOT_NUMBERS: 6,
      STAT_COLD_NUMBERS: 7,
      STAT_FORECASTS: 8,
      STAT_CHECK_NUMBERS: 9
    },
    MENU_TYPE: {
      PRIMARY: 1,
      COMPANY: 2,
      GAME: 3,
      STAT: 4
    }
  },

  VARIABLES: {
    app: null
  }
};

export default config;
