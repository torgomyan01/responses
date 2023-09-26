import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import UserInfo from '../redux/user-info';

const reducers = combineReducers({
  UserInfo
});

export default configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.config.transformRequest']
    }
  })
});
