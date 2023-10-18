import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CandidatesState {
    value: string[];
    isLoading: boolean;
}

const initialState: CandidatesState = {
    value: [],
    isLoading: true,
};

export const candidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        receiveCandidates: (state, action: PayloadAction<string[]>) => {
            state.value = action.payload;
            state.isLoading = false;
        },
    },
});
