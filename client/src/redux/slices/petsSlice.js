import {createSlice} from "@reduxjs/toolkit";
import testingData from "../../petList.json";

const initialState = {
    petsList: testingData
}

export const petsSlice = createSlice({
    name: "pets",
    initialState,
    reducers: {}
});

export default petsSlice.reducer