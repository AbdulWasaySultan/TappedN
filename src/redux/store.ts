import userSliceReducer from './counterSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        counter: userSliceReducer,
    },
});

export default store;