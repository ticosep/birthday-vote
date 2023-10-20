import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

interface DecodeToken {
    name: string;
    email: string;
}

export interface AuthState {
    name?: string;
    email?: string;
    uid: string;
    token?: string;
}

const storeToken = localStorage.getItem('token');

const decodedToken = storeToken
    ? jwtDecode<DecodeToken>(storeToken ?? '')
    : { name: undefined, email: undefined };

const initialState: AuthState = {
    name: decodedToken.name,
    email: decodedToken.email,
    uid: '',
    token: storeToken ?? undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            const decode = jwtDecode<DecodeToken>(action.payload);
            state.email = decode.email;
            state.name = decode.name;
        },
        setUid: (state, action: PayloadAction<string>) => {
            state.uid = action.payload;
        },
        logout: (state) => {
            state.token = undefined;
            localStorage.removeItem('token');
            state.name = undefined;
            state.email = undefined;
        },
    },
});

export const { setUser, setUid, logout } = authSlice.actions;

export default authSlice.reducer;
