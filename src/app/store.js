import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import UserInfo from '../redux/user-info';
import ConfigurationResponse from '../redux/project-settings';
import AlertSite from '../redux/alert-site';

const reducers = combineReducers({
  UserInfo,
  ConfigurationResponse,
  AlertSite
});

export default configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.config.transformRequest']
    }
  })
});
