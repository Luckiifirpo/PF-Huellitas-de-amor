import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toGoAfterLogin: null
}

export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setToGoAfterLogin: (state, action) => {
            state.toGoAfterLogin = action.payload;
        }
    }
});

export const { setToGoAfterLogin } = navigationSlice.actions
export default navigationSlice.reducer