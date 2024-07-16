import { combineReducers, configureStore } from '@reduxjs/toolkit';
import petReducer from '../redux/Slice/petSlice';
import userReducer from '../redux/Slice/userSlice'; // Corrected import for the userReducer
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import PaymentReducer from '../redux/Slice/PaymentSlice';

const rootReducer = combineReducers({
    user: userReducer,
    pets: petReducer,
    PaymentSlice: PaymentReducer,
    
    
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and middleware
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

// Create a persistor for the store
export const persistor = persistStore(store);
