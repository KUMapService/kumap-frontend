import qs from 'qs';
import { kyInstance } from '@api/ky';
import { API } from '@constants/route';
import { setCurrentLandAddress } from 'store/actions/land';

export const getPNU = async (dispatch, { lat, lng }) => {
  try {
    const {
      data: { pnu, address },
    } = await kyInstance.get(API.GEO.GET_PNU, { searchParams: { lat, lng } }).json();

    dispatch(setCurrentLandAddress({ pnu, address, lat, lng }));
  } catch (error) {
    const message = await error.response
      ?.json()
      .then((res) => res?.message)
      .catch(() => null);
    throw new Error(message || '응답 실패');
  }
};

export const fetchAutoCompleteAddress = async ({ query }) => {
  try {
    const { data } = await kyInstance
      .get(API.GEO.AUTO_COMPLETE_ADDRESS, {
        searchParams: { query },
      })
      .json();

    return data;
  } catch (error) {
    const message = await error.response
      ?.json()
      .then((res) => res?.message)
      .catch(() => null);
    throw new Error(message || '응답 실패');
  }
};

export const getCadastralMap = async ({ pnu }) => {
  try {
    const { data } = await kyInstance
      .get(API.GEO.GET_CADASTRAL_MAP, {
        searchParams: qs.parse(qs.stringify({ pnu: Array.isArray(pnu) ? pnu : [pnu] }, { arrayFormat: 'repeat' })),
      })
      .json();

    return data;
  } catch (error) {
    const message = await error.response
      ?.json()
      .then((res) => res?.message)
      .catch(() => null);
    throw new Error(message || '응답 실패');
  }
};
