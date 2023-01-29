import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null
}

export const errorsSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetError: (state) => {
            state.error = null
        }
    }
});

export const {setError, resetError} = errorsSlice.actions;
export default errorsSlice.reducer