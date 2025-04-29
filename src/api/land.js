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

    const response = await authKy.get(API.LAND.GET_LAND_DATA, {
      searchParams: { pnu },
      signal: landAbortController.signal,
    });

    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    console.log(error);
    const detail = await error.response?.json();
    throw new Error(detail?.message || '응답 실패');
  }
};

export const getLandPredictPrice = async ({ pnu }) => {
  try {
    if (landPredictPriceAbortController) {
      landPredictPriceAbortController.abort();
    }
    landPredictPriceAbortController = new AbortController();

    const response = await kyInstance.get(API.LAND.GET_LAND_PREDICTED_PRICE, {
      searchParams: { pnu },
      signal: landPredictPriceAbortController.signal,
    });

    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    console.log(error);
    const detail = await error.response?.json();
    throw new Error(detail?.message || '응답 실패');
  }
};

export const getLandReport = async ({ pnu }) => {
  try {
    if (landReportAbortController) {
      landReportAbortController.abort();
    }
    landReportAbortController = new AbortController();

    const response = await kyInstance.get(API.LAND.GET_LAND_REPORT, {
      searchParams: { pnu },
      signal: landReportAbortController.signal,
    });

    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    console.log(error);
    const detail = await error.response?.json();
    throw new Error(detail?.message || '응답 실패');
  }
};
