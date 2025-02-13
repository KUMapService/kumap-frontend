const initialState = {
  isUserLogin: false,
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_USER_LOGIN':
      return {
        ...state,
        isUserLogin: action.payload,
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
