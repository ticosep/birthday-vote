import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get } from 'firebase/database';

export interface CandidatesState {
    value: string[];
    isLoading: boolean;
}

const initialState: CandidatesState = {
    value: [],
    isLoading: true,
};

export const fetchCandidates = createAsyncThunk('', async () => {
    const dbRef = ref(getDatabase());
    try {
        const snapshot = await get(child(dbRef, '/candidates'));

        if (snapshot.exists()) {
            console.log(snapshot.val());
            return snapshot.val();
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error(error);
    }
});

const candidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        receiveCandidates: (state, action: PayloadAction<string[]>) => {
            state.value = action.payload;
            state.isLoading = false;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchCandidates.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const { receiveCandidates } = candidatesSlice.actions;

export default candidatesSlice.reducer;
