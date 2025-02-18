export const API = {
  SERVER_STATUS: '/',
  AUTH: {
    LOGIN: '/auth/login',
    DUP_CHECK: '/auth/dup-check',
    REGISTER: '/auth/register',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_TOKEN: '/auth/protected',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  USER: {
    RESET_PASSWORD: '/user/reset-password',
    MODIFY_USER_INFO: '/user/modify-user-info',
    CHANGE_PASSWORD: '/user/change-password',
  },
};
