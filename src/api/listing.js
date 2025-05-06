import { authKy } from '@api/ky';
import { API } from '@constants/route';

export const getListingList = async ({ pnu_prefix, page, size }) => {
  try {
    const { data } = await authKy
      .get(API.LISTING.GET_LISTING_DATA, {
        searchParams: { pnu_prefix, page, size },
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

export const getListingMarkerList = async ({ min_lat, min_lng, max_lat, max_lng }) => {
  try {
    const { data } = await authKy
      .get(API.LISTING.GET_LISTING_MARKER, {
        searchParams: { min_lat, min_lng, max_lat, max_lng },
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

export const fetchRegisterListing = async ({ pnu, lat, lng, area, price, summary }) => {
  try {
    const { message } = await authKy
      .get(API.LISTING.REG_LISTING, {
        searchParams: { pnu, lat, lng, area, price, summary },
      })
      .json();

    return { message };
  } catch (error) {
    const message = await error.response
      ?.json()
      .then((res) => res?.message)
      .catch(() => null);
    throw new Error(message || '응답 실패');
  }
};
