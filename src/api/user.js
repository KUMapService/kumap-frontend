import { kyInstance, authKy } from '@api/ky';
import { API } from '@constants/route';

export const fetchResetPassword = async ({ email }) => {
  const response = await kyInstance.post(API.USER.RESET_PASSWORD, {
    json: { email },
  });

  const data = await response.json();
  return { ...data, status: response.status };
};

export const patchUserInfo = async ({ image, name, nickname, phone, isImageDeleted }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('nickname', nickname);
  formData.append('phone', phone);
  formData.append('is_image_deleted', isImageDeleted ? 'true' : 'false');

  if (image) {
    formData.append('image', image);
  }

  try {
    const response = await authKy.post(API.USER.MODIFY_USER_INFO, {
      body: formData,
    });

    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    const detail = await error.response?.json();
    throw new Error(detail?.message || '응답 실패');
  }
};

export const patchUserPassword = async ({ currentPassword, changePassword }) => {
  try {
    const response = await authKy.post(API.USER.CHANGE_PASSWORD, {
      json: {
        current_password: currentPassword,
        change_password: changePassword,
      },
    });

    const data = await response.json();
    return { ...data };
  } catch (error) {
    const detail = await error.response?.json();
    throw new Error(detail?.message || '응답 실패');
  }
};

export const patchLikeStatus = async ({ pnu }) => {
  try {
    const response = await authKy.post(API.USER.LAND_LIKE, {
      json: { pnu },
    });
    const data = await response.json();
    return { ...data };
  } catch (error) {
    const detail = await error.response?.json();
    throw new Error(detail?.message || '응답 실패');
  }
};

export const getFavoriteLand = async () => {
  try {
    const response = await authKy.get(API.USER.GET_FAVORITE_LAND);
    const data = await response.json();
    return { ...data };
  } catch (error) {
    const detail = await error.response?.json();
    throw new Error(detail?.message || '응답 실패');
  }
};

export const getUserListingList = async () => {
  try {
    const response = await authKy.get(API.USER.GET_LISTINGS);
    const data = await response.json();
    return { ...data };
  } catch (error) {
    const detail = await error.response?.json();
    throw new Error(detail?.message || '응답 실패');
  }
};
