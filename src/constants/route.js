export const API = {
  SERVER_STATUS: 'api',
  AUTH: {
    LOGIN: 'auth/login',
    DUP_CHECK: 'auth/dup-check',
    REGISTER: 'auth/sign-up',
    VERIFY_TOKEN: 'auth/protected',
    REFRESH_TOKEN: 'auth/refresh-token',
  },
  USER: {
    RESET_PASSWORD: 'user/reset-password',
    MODIFY_USER_INFO: 'user/modify-user-info',
    CHANGE_PASSWORD: 'user/change-password',
    LAND_LIKE: 'user/change-land-like',
    GET_FAVORITE_LAND: 'user/get-favorite-lands-by-user',
    GET_LISTINGS: 'user/get-listings',
  },
  GEO: {
    GET_PNU: 'geo/get-pnu',
    AUTO_COMPLETE_ADDRESS: 'geo/auto-complete-address',
    GET_CADASTRAL_MAP: 'geo/get-cadastral-map',
  },
  LAND: {
    GET_LAND_DATA: 'land/get-land-data',
    GET_LAND_PREDICTED_PRICE: 'land/get-land-predicted-price',
    GET_LAND_REPORT: 'land/get-land-report',
  },
  LISTING: {
    GET_LISTING_DATA: 'listing/get-listing',
    GET_LISTING_MARKER: 'listing/get-marker',
    REG_LISTING: 'listing/register-listing',
    RMV_LISTING: 'listing/remove-listing',
  },
};
