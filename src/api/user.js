import { authInstance } from '@api/axios';
import { API } from '@constants/route';
//import { setCurrentUser, setIsUserLogin } from '@store/actions/auth';

export const patchUserInfo = async ({ image, name, nickname, phone }) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('name', name);
  formData.append('nickname', nickname);
  formData.append('phone', phone);
  try {
    const { data, status } = await authInstance.post(API.USER.MODIFY_USER_INFO, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { ...data, status };
  } catch (error) {
    throw new Error(error.response?.data.message || '응답 실패');
  }
};

export const patchUserPassword = async ({ currentPassword, changePassword }) => {
  try {
    const { data, status } = await authInstance.post(API.USER.CHANGE_PASSWORD, {
      current_password: currentPassword,
      change_password: changePassword,
    });
    return { ...data, status };
  } catch (error) {
    throw new Error(error.response?.data.message || '응답 실패');
  }
};
