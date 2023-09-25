import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const reducers = combineReducers({});

export default configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.config.transformRequest']
    }
  })
});
