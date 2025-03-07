export const API = {
  SERVER_STATUS: '/',
  AUTH: {
    LOGIN: '/auth/login',
    DUP_CHECK: '/auth/dup-check',
    REGISTER: '/auth/sign-up',
    VERIFY_TOKEN: '/auth/protected',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  USER: {
    RESET_PASSWORD: '/user/reset-password',
    MODIFY_USER_INFO: '/user/modify-user-info',
    CHANGE_PASSWORD: '/user/change-password',
    LAND_LIKE: '/user/change-land-like',
    GET_FAVORITE_LAND: '/user/get-favorite-lands-by-user',
  },
  GEO: {
    GET_PNU: '/geo/get-pnu',
    AUTO_COMPLETE_ADDRESS: '/geo/auto-complete-address',
    GET_CADASTRAL_MAP: '/geo/get-cadastral-map',
  },
  LAND: {
    GET_LAND_DATA: '/land/get-land-data',
  },
};
