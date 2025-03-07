import axios from 'axios';
//import { instance } from '@api/axios';
import { API } from '@constants/route';
import { authInstance } from '@api/axios';

let landCancelTokenSource = null;

export const getLandData = async ({ pnu }) => {
  try {
    if (landCancelTokenSource) {
      landCancelTokenSource.cancel('새로운 요청으로 인해 이전 요청을 취소합니다.');
    }
    landCancelTokenSource = axios.CancelToken.source();

    const { data, status } = await authInstance.get(API.LAND.GET_LAND_DATA, {
      params: { pnu },
      cancelToken: landCancelTokenSource.token,
    });
    return { ...data, status };
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.detail || '응답 실패');
  }
};
