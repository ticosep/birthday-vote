import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get } from 'firebase/database';

export interface CandidatesState {
    value: Record<string, string>;
    isLoading: boolean;
}

const initialState: CandidatesState = {
    value: {},
    isLoading: true,
};

export const fetchCandidates = createAsyncThunk(
    'addCandidates',
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
    },
    extraReducers(builder) {
        builder.addCase(fetchCandidates.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});

export const { setIsLoading } = candidatesSlice.actions;

export default candidatesSlice.reducer;
