import { createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const petReducer = createSlice({
  name: "pets",
  initialState: {
    createPet: {},
  },
  reducers: {
    postPets(state, action) {
      state.createPet = action.payload;
    },
  },
});
const { postPets } = petReducer.actions;

export default petReducer.reducer;

export const createPet = (obj) => async (dispatch) => {
  try {
    const response = await api.post("/animals", obj);
    console.log(response);
    dispatch(postPets(response.data));
  } catch (error) {
    console.log(error);
  }
};
