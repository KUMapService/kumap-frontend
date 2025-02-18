import { instance } from '@api/axios';
import { API } from '@constants/route';
import { setCurrentUser, setIsUserLogin } from '@store/actions/auth';
import { authInstance } from './axios';

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
  try {
    const { data } = await authInstance.get(API.AUTH.VERIFY_TOKEN);

    dispatch(
      setCurrentUser({
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        phone: data.phone,
        image: data.image,
      }),
    );
    dispatch(setIsUserLogin(true));
  } catch (error) {
    dispatch(setIsUserLogin(false));
    throw new Error(error.message);
  }
};
