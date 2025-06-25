import { kyInstance } from '@api/ky';
import { API } from '@constants/route';

let regionAbortController = null;

export const getRegionMarkerData = async ({ min_lat, min_lng, max_lat, max_lng, zoom }) => {
  try {
    if (regionAbortController) {
      regionAbortController.abort();
    }
    regionAbortController = new AbortController();

    const { data } = await kyInstance
      .get(API.REGION.GET_REGION_MARKERS, {
        searchParams: { min_lat, min_lng, max_lat, max_lng, zoom },
        signal: regionAbortController.signal,
      })
      .json();

    return { ...data };
  } catch (error) {
    console.log(error);
    const message = await error.response
      ?.json()
      .then((res) => res?.message)
      .catch(() => null);
    throw new Error(message || '응답 실패');
  }
};
