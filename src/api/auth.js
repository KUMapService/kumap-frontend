import { instance } from '@api/axios';
import { API } from '@constants/route';
import { setCurrentUser, setIsUserLogin } from '@store/actions/auth';

export const fetchLogin = async ({ email, password }) => {
  const { data, status } = await instance.post(API.AUTH.LOGIN, {
    email,
    password,
  });
  return { ...data, status };
};

export const fetchDupCheck = async ({ email, nickname }) => {
  const { data, status } = await instance.post(API.AUTH.DUP_CHECK, {
    email,
    nickname,
  });
  return { ...data, status };
};

export const fetchResetPassword = async ({ email }) => {
  const { data, status } = await instance.post(API.AUTH.RESET_PASSWORD, {
    email,
  });
  return { ...data, status };
};

export const fetchRegister = async ({ name, nickname, email, password }) => {
  const { data, status } = await instance.post(API.AUTH.REGISTER, {
    name,
    nickname,
    email,
    password,
  });
  return { ...data, status };
};

export const verifyToken = async (dispatch) => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  try {
    const { data } = await instance.get(API.AUTH.VERIFY_TOKEN, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(
      setCurrentUser({
        user: data.user,
        name: data.name,
        email: data.email,
      }),
    );
    dispatch(setIsUserLogin(true));
  } catch (error) {
    dispatch(setIsUserLogin(false));
    throw new Error(error.response?.data?.message || 'Token verification failed');
  }
};
