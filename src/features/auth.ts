import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    name?: string;
    email?: string;
    token?: string;
    isAuth?: boolean;
}

const initialState: AuthState = {
    name: undefined,
    email: undefined,
    token: undefined,
    isAuth: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (
            state,
            action: PayloadAction<{ name: string; email: string }>,
        ) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});
