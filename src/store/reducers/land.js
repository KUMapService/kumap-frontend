const initialState = {
  centerAddress: null,
  currentLandAddress: null,
  currentLandData: null,
  listingListData: null,
  auctionListData: null,
};

const landReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CENTER_ADDRESS':
      return {
        ...state,
        centerAddress: action.payload,
      };
    case 'SET_CURRENT_LAND_ADDRESS':
      return {
        ...state,
        currentLandAddress: action.payload,
      };
    case 'SET_CURRENT_LAND_DATA':
      return {
        ...state,
        currentLandData: action.payload,
      };
    case 'SET_LISTING_LIST_DATA':
      return {
        ...state,
        listingListData: action.payload,
      };
    case 'SET_AUCTION_LIST_DATA':
      return {
        ...state,
        auctionListData: action.payload,
      };
    default:
      return state;
  }
};

export default landReducer;
