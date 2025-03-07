const initialState = {
  currentLandAddress: null,
  currentLandData: null,
};

const landReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default landReducer;
