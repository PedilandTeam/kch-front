import { configureStore } from '@reduxjs/toolkit';
import stateSlice, { stateSliceType } from './stateSlice';

export type storeType = {
    stateSlice: stateSliceType;
};
const store = configureStore({
    reducer: {
        stateSlice,
    },
});

export default store;
