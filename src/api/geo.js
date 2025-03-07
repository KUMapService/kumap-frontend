import qs from 'qs';
import { instance } from '@api/axios';
import { API } from '@constants/route';
import { setCurrentLandAddress } from 'store/actions/land';

export const getPNU = async (dispatch, { lat, lng }) => {
  try {
    const { data } = await instance.get(API.GEO.GET_PNU, {
      params: { lat, lng },
    });
    dispatch(
      setCurrentLandAddress({
        pnu: data.pnu,
        address: data.address,
        lat: lat,
        lng: lng,
      }),
    );
  } catch (error) {
    throw new Error(error.response?.data.detail || '응답 실패');
  }
};

export const fetchAutoCompleteAddress = async ({ query }) => {
  const { data, status } = await instance.get(API.GEO.AUTO_COMPLETE_ADDRESS, {
    params: { query },
  });
  return { ...data, status };
};

export const getCadastralMap = async ({ pnu }) => {
  try {
    const { data, status } = await instance.get(API.GEO.GET_CADASTRAL_MAP, {
      params: { pnu: Array.isArray(pnu) ? pnu : [pnu] },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    return { ...data, status };
  } catch (error) {
    throw new Error(error.response?.data.detail || '응답 실패');
  }
};
