import qs from 'qs';

import { kyInstance } from '@api/ky';
import { API } from '@constants/route';
import { setCurrentLandAddress } from '@store/actions/land';
import { setCenterAddress } from '@store/actions/land';

export const getPNU = async (dispatch, { lat, lng }, zoomLevel = null) => {
  try {
    const {
      data: { pnu, address },
    } = await kyInstance.get(API.GEO.GET_PNU, { searchParams: { lat, lng } }).json();
    // zoomLevel이 없다면 카카오맵 클릭 이벤트
    if (zoomLevel === null) {
      dispatch(setCurrentLandAddress({ pnu, address, lat, lng }));
    }
    // zoomLevel이 있다면 카카오맵 타일 로드 이벤트
    else {
      // 1~4일 때
      if (zoomLevel >= 1 && zoomLevel <= 4) {
        dispatch(setCenterAddress({ pnu: pnu.slice(0, 8), address: address?.eupmyeondong }));
      }
      // 5~8일 때
      else if (zoomLevel >= 5 && zoomLevel <= 8) {
        dispatch(setCenterAddress({ pnu: pnu.slice(0, 5), address: address?.sigungu }));
      }
      // 9 이상일 때
      else if (zoomLevel >= 9) {
        dispatch(setCenterAddress({ pnu: pnu.slice(0, 2), address: address?.sido }));
      }
    }
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
        searchParams: qs.stringify({ pnu: Array.isArray(pnu) ? pnu : [pnu] }, { arrayFormat: 'repeat' }),
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

export const getAddressData = async () => {
  try {
    const { data } = await kyInstance.get(API.GEO.GET_ADDRESS_DATA).json();
    return data;
  } catch (error) {
    const message = await error.response
      ?.json()
      .then((res) => res?.message)
      .catch(() => null);
    throw new Error(message || '응답 실패');
  }
};
