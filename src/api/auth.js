import { kyInstance, authKy } from '@api/ky';
import { API } from '@constants/route';
import { setCurrentUser, setIsUserLogin } from '@store/actions/auth';

export const fetchLogin = async ({ email, password }) => {
  const response = await kyInstance.post(API.AUTH.LOGIN, {
    json: { email, password },
  });

  const data = await response.json();
  return { ...data, status: response.status };
};

export const fetchDupCheck = async ({ email, nickname }) => {
  const response = await kyInstance.post(API.AUTH.DUP_CHECK, {
    json: { email, nickname },
  });

  const data = await response.json();
  return { ...data, status: response.status };
};

export const fetchRegister = async ({ name, nickname, email, password }) => {
  const response = await kyInstance.post(API.AUTH.REGISTER, {
    json: { name, nickname, email, password },
  });

  const data = await response.json();
  return { ...data, status: response.status };
};

export const verifyToken = async (dispatch) => {
  try {
    const data = await authKy.get(API.AUTH.VERIFY_TOKEN).json();

    dispatch(
      setCurrentUser({
        name: data.data.name,
        nickname: data.data.nickname,
        email: data.data.email,
        phone: data.data.phone,
        phoneVerified: data.data.phone_verified,
        image: data.data.image,
      }),
    );
    dispatch(setIsUserLogin(true));
  } catch (error) {
    dispatch(setIsUserLogin(false));
    const detail = await error.response?.json();
    throw new Error(detail?.message || '응답 실패');
  }
};
