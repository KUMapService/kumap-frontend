export const setCenterAddress = (address) => ({
  type: 'SET_CENTER_ADDRESS',
  payload: address,
});

export const setCurrentLandAddress = (address) => ({
  type: 'SET_CURRENT_LAND_ADDRESS',
  payload: address,
});

export const setCurrentLandData = (data) => ({
  type: 'SET_CURRENT_LAND_DATA',
  payload: data,
});

export const setListingListData = (data) => ({
  type: 'SET_LISTING_LIST_DATA',
  payload: data,
});

export const setAuctionListData = (data) => ({
  type: 'SET_AUCTION_LIST_DATA',
  payload: data,
});
