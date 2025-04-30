import { kyInstance, authKy } from '@api/ky';
import { API } from '@constants/route';

let landAbortController = null;
let landPredictPriceAbortController = null;
let landReportAbortController = null;

export const getLandData = async ({ pnu }) => {
  try {
    if (landAbortController) {
      landAbortController.abort();
    }
    landAbortController = new AbortController();

    const { data } = await authKy
      .get(API.LAND.GET_LAND_DATA, {
        searchParams: { pnu },
        signal: landAbortController.signal,
      })
      .json();

    return { ...data };
  } catch (error) {
    const message = await error.response
      ?.json()
      .then((res) => res?.message)
      .catch(() => null);
    throw new Error(message || '응답 실패');
  }
};

export const getLandPredictPrice = async ({ pnu }) => {
  try {
    if (landPredictPriceAbortController) {
      landPredictPriceAbortController.abort();
    }
    landPredictPriceAbortController = new AbortController();

    const { data } = await kyInstance
      .get(API.LAND.GET_LAND_PREDICTED_PRICE, {
        searchParams: { pnu },
        signal: landPredictPriceAbortController.signal,
      })
      .json();

    return { ...data };
  } catch (error) {
    const message = await error.response
      ?.json()
      .then((res) => res?.message)
      .catch(() => null);
    throw new Error(message || '응답 실패');
  }
};

export const getLandReport = async ({ pnu }) => {
  try {
    if (landReportAbortController) {
      landReportAbortController.abort();
    }
    landReportAbortController = new AbortController();

    const { data } = await kyInstance
      .get(API.LAND.GET_LAND_REPORT, {
        searchParams: { pnu },
        signal: landReportAbortController.signal,
      })
      .json();

    return { ...data };
  } catch (error) {
    const message = await error.response
      ?.json()
      .then((res) => res?.message)
      .catch(() => null);
    throw new Error(message || '응답 실패');
  }
};
