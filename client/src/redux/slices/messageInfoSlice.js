import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: null
}

export const messageInfoSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        resetMessage: (state) => {
            state.message = null
        }
    }
});

export const { setMessage, resetMessage } = messageInfoSlice.actions;
export default messageInfoSlice.reducer