import { createSlice } from '@reduxjs/toolkit';

export type stateSliceType = {
    country: null | string;
};
export const stateSlice = createSlice({
    name: 'stateSlice',
    initialState: {
        country: null,
    } as stateSliceType,
    reducers: {
        setCountry: (state, { payload }) => {
            state.country = payload;
        },
        deleteCountry: (state, { payload }) => {
            state.country = null;
        },
    },
});

export const { setCountry, deleteCountry } = stateSlice.actions;
export default stateSlice.reducer;
