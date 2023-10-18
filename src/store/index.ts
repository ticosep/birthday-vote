import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth';
import candidatesReducer from '../features/candidates';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        candidates: candidatesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
