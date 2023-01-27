import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1
}

export const aboutUsSlice = createSlice({
    name: "aboutUs",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
});

export const {setCurrentPage} = aboutUsSlice.actions;
export default aboutUsSlice.reducer