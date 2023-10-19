import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get } from 'firebase/database';
import { Candidate } from '../types';

export interface CandidatesState {
    value: Record<string, Candidate>;
    isLoading: boolean;
}

const initialState: CandidatesState = {
    value: {},
    isLoading: true,
};

export const fetchCandidates = createAsyncThunk(
    'getCandidates',
    async (_, { dispatch }) => {
        dispatch(setIsLoading(true));

        const dbRef = ref(getDatabase());
        try {
            const snapshot = await get(child(dbRef, '/candidates'));

            if (snapshot.exists()) {
                dispatch(setIsLoading(false));
                return snapshot.val();
            } else {
                console.log('No data available');
            }

            dispatch(setIsLoading(false));
        } catch (error) {
            console.error(error);
            dispatch(setIsLoading(false));
        }
    },
);

const candidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUserImage: (
            state,
            action: PayloadAction<{ imageUrl: string; userEmail: string }>,
        ) => {
            const [id, values] =
                Object.entries(state.value).find(
                    ([_, candidate]) =>
                        candidate.email === action.payload.userEmail,
                ) ?? [];

            if (id && values) {
                state.value = {
                    ...state.value,
                    [id]: { ...values, image: action.payload.imageUrl },
                };
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchCandidates.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});

export const { setIsLoading, setUserImage } = candidatesSlice.actions;

export default candidatesSlice.reducer;
