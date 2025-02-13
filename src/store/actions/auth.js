export const setIsUserLogin = (isUserLogin) => ({
  type: 'SET_IS_USER_LOGIN',
  payload: isUserLogin,
});

export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  payload: user,
});
