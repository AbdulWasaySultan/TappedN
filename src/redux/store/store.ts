import userSliceReducer from '../slices/userData/userSlice';
import serviceProviderReducer from '../slices/vendorData/serviceProviderSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        serviceProviders: serviceProviderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;

export default store;