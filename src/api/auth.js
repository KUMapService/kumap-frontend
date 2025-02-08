import { instance } from '@api/axios';
import { API } from '@constants/route';

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
