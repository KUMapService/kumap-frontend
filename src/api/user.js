import { instance, authInstance } from '@api/axios';
import { API } from '@constants/route';

export const fetchResetPassword = async ({ email }) => {
  const { data, status } = await instance.post(API.USER.RESET_PASSWORD, {
    email,
  });
  return { ...data, status };
};

export const patchUserInfo = async ({ image, name, nickname, phone, isImageDeleted }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('nickname', nickname);
  formData.append('phone', phone);
  formData.append('is_image_deleted', isImageDeleted);

  if (image) {
    formData.append('image', image);
  }

  try {
    const { data, status } = await authInstance.post(API.USER.MODIFY_USER_INFO, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { ...data, status };
  } catch (error) {
    throw new Error(error.response?.data.detail || '응답 실패');
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
    throw new Error(error.response?.data.detail || '응답 실패');
  }
};

export const patchLikeStatus = async ({ pnu }) => {
  try {
    const { data, status } = await authInstance.post(API.USER.LAND_LIKE, {
      pnu: pnu,
    });
    return { ...data, status };
  } catch (error) {
    throw new Error(error.response?.data.detail || '응답 실패');
  }
};

export const getFavoriteLand = async () => {
  try {
    const { data, status } = await authInstance.get(API.USER.GET_FAVORITE_LAND, {});
    return { ...data, status };
  } catch (error) {
    throw new Error(error.response?.data.detail || '응답 실패');
  }
};
