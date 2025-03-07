import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/reducers/auth';
import landReducer from './reducers/land';

const store = configureStore({
  reducer: {
    auth: authReducer,
    land: landReducer,
  },
});

export default store;
