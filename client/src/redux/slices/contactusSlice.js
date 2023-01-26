import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import ErrorManager from "../../resources/ErrorManager";

const initialState = {
  contactusList: [],
  errors: null,
};

export const contactusSlice = createSlice({
  name: "contactus",
  initialState,
  reducers: {
    _postContactus(state, action) {
      const obtainedContactus = action.payload;
      const reformedContactus = {
        id: obtainedContactus.id,
        name: obtainedContactus.name,
        email: obtainedContactus.email,
        description: obtainedContactus.description,
      };
      state.contactusList.push(reformedContactus);
    },
    _getAllContactUs(state, action) {
      state.contactusList = action.payload.map((petData) => {
        const obtainedContactus = petData;
        const reformedContactus = {
          id: obtainedContactus.id,
          name: obtainedContactus.name,
          email: obtainedContactus.email,
          description: obtainedContactus.description,
        };

        return reformedContactus;
      });
    },
    setContactusError: (state, action) => {
      state.errors = action.payload;
    },
    resetContactusError: (state) => {
      state.errors = null;
    },
  },
});

const { _postContactus, _getAllContactUs, setContactusError } =
  contactusSlice.actions;
export const { resetContactusError } = contactusSlice.actions;

export default contactusSlice.reducer;

export const postContactus = (obj) => async (dispatch) => {
  try {
    const response = await api.post("/contactus", obj);
    dispatch(_postContactus(response.data));
  } catch (error) {
    dispatch(
      setContactusError(
        ErrorManager.CreateErrorInfoObject(error, [
          { code: error.code },
          { request: "POST: http://localhost:3001/contactus" },
        ])
      )
    );
  }
};

export const getAllPets = (obj) => async (dispatch) => {
  try {
    const response = await api.get("/contactus", obj);
    dispatch(_getAllContactUs(response.data));
  } catch (error) {
    dispatch(
      setContactusError(
        ErrorManager.CreateErrorInfoObject(error, [
          { code: error.code },
          { request: "GET: http://localhost:3001/contactus" },
        ])
      )
    );
  }
};
