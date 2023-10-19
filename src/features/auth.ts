import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { getDatabase, ref, child, push, get } from 'firebase/database';
import { Candidate } from '../types';

interface DecodeToken {
    name: string;
    email: string;
}

export interface AuthState {
    name?: string;
    email?: string;
    token?: string;
    isAddingToDB?: boolean;
}

const storeToken = localStorage.getItem('token');

const decodedToken = storeToken
    ? jwtDecode<DecodeToken>(storeToken ?? '')
    : { name: undefined, email: undefined };

const initialState: AuthState = {
    name: decodedToken.name,
    email: decodedToken.email,
    token: storeToken ?? undefined,
    isAddingToDB: false,
};

export const checkUserAndAdd = createAsyncThunk(
    'checkUserAndAdd',
    async (token: string, { dispatch }) => {
        dispatch(setIsAddingToDB(true));
        const basicInfo = jwtDecode<DecodeToken>(token ?? '');
        const dbRef = ref(getDatabase());
        try {
            const snapshot = await get(child(dbRef, '/candidates'));

            if (snapshot.exists()) {
                dispatch(setIsAddingToDB(false));
                const values: Record<string, Candidate> = snapshot.val();
                if (
                    !Object.values(values).some(
                        (v) => v.email === basicInfo.email,
                    )
                ) {
                    await push(child(dbRef, '/candidates'), {
                        ...basicInfo,
                    });
                }
            } else {
                console.log('No data available');
            }

            dispatch(setIsAddingToDB(false));
        } catch (error) {
            console.error(error);
            dispatch(setIsAddingToDB(false));
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            const decode = jwtDecode<DecodeToken>(action.payload);
            state.email = decode.email;
            state.name = decode.name;
        },
        setUser: (
            state,
            action: PayloadAction<{ name: string; email: string }>,
        ) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        setIsAddingToDB: (state, action: PayloadAction<boolean>) => {
            state.isAddingToDB = action.payload;
        },
    },
});

export const { setToken, setUser, setIsAddingToDB } = authSlice.actions;

export default authSlice.reducer;
