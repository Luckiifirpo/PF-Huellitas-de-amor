import { createSlice } from "@reduxjs/toolkit";
import lang from "../../lang/langPackage.json";

const initialState = {
    currentLang: "es",
    currentLangData: lang["es"]
}

export const languageSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.currentLang = action.payload;
            state.currentLangData = lang[action.payload];
        }
    }
});

export const {setLanguage} = languageSlice.actions;
export default languageSlice.reducer;