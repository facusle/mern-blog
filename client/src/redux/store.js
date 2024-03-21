import { configureStore, combineReducers } from '@reduxjs/toolkit';
import useReducer from './user/userSlice';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

const rootReducers = combineReducers({
     user: useReducer,
});

const persistConfig = {
     key: 'root',
     storage,
     version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
     reducer: persistedReducer,
     middleware: (GetDefaultMiddleware) => GetDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
