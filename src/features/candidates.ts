import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get, push, update } from 'firebase/database';
import { Candidate } from '../types';
import { RootState } from '../store';
import { setUid } from './auth';

export interface CandidatesState {
    value: Record<string, Candidate>;
    isLoading: boolean;
}

const initialState: CandidatesState = {
    value: {},
    isLoading: true,
};

export const fetchCandidates = createAsyncThunk<
    CandidatesState['value'],
    void,
    { state: RootState }
>('getCandidates', async (_, { dispatch, getState }) => {
    dispatch(setIsLoading(true));

    const dbRef = ref(getDatabase());
    const state = getState();
    const userEmail = state.auth.email;

    try {
        const snapshot = await get(child(dbRef, '/candidates'));

        if (snapshot.exists()) {
            const candidates: CandidatesState['value'] = snapshot.val() ?? {};
            const user = Object.values(candidates).find(
                (c) => c.email === userEmail,
            );

            if (!user) {
                const response = await push(child(dbRef, '/candidates'), {
                    ...state.auth,
                });

                const uid = response.key ?? '';

                const updates = {
                    [`candidates/${uid}`]: {
                        ...state.auth,
                        uid,
                    },
                };

                await update(dbRef, updates);

                dispatch(setUid(uid));

                dispatch(setIsLoading(false));

                return { ...snapshot.val(), [uid]: { ...state.auth } };
            }

            dispatch(setUid(user.uid));

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
});

const candidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUserImage: (
            state,
            action: PayloadAction<{ imageUrl: string; uid: string }>,
        ) => {
            const candidate = state.value[action.payload.uid];

            state.value = {
                ...state.value,
                [action.payload.uid]: {
                    ...candidate,
                    image: action.payload.imageUrl,
                },
            };
        },
        setUserVoted: (state, action: PayloadAction<{ uid: string }>) => {
            const candidate = state.value[action.payload.uid];

            state.value = {
                ...state.value,
                [action.payload.uid]: { ...candidate, voted: true },
            };
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchCandidates.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});

export const { setIsLoading, setUserImage, setUserVoted } =
    candidatesSlice.actions;

export default candidatesSlice.reducer;
