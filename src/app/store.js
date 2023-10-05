import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import UserInfo from '../redux/user-info';
import ConfigurationResponse from '../redux/project-settings';

const reducers = combineReducers({
  UserInfo,
  ConfigurationResponse
});

export default configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.config.transformRequest']
    }
  })
});
