import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import ErrorManager from "../../resources/ErrorManager";

const initialState = {
  contactUsList: [],
  error: null,
  message: null,
  isBusy: false
};

export const contactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {
    _postContactUs(state, action) {
      const obtainedContactUs = action.payload;
      const reformedContactUs = {
        id: obtainedContactUs.id,
        name: obtainedContactUs.name,
        email: obtainedContactUs.email,
        description: obtainedContactUs.description,
      };
      state.contactUsList.push(reformedContactUs);
    },
    _getAllContactUs(state, action) {
      state.contactUsList = action.payload.map((contactUsData) => {
        const obtainedContactUs = contactUsData;
        const reformedContactUs = {
          id: obtainedContactUs.id,
          name: obtainedContactUs.name,
          email: obtainedContactUs.email,
          description: obtainedContactUs.description,
        };

        return reformedContactUs;
      });
    },
    setContactUsError: (state, action) => {
      state.error = action.payload;
    },
    resetContactUsError: (state) => {
      state.error = null;
    },
    setContactUsMessage: (state, action) => {
      state.message = action.payload;
    },
    resetContactUsMessage: (state) => {
      state.message = null;
    },
    setContactUsBusyMode: (state, action) => {
      state.isBusy = action.payload;
    }
  },
});

const { _postContactUs, _getAllContactUs } =
  contactUsSlice.actions;
export const { setContactUsError, resetContactUsError, setContactUsMessage, resetContactUsMessage, setContactUsBusyMode } = contactUsSlice.actions;

export default contactUsSlice.reducer;

export const postContactUs = (obj) => async (dispatch) => {
  try {
    dispatch(setContactUsBusyMode(true));
    const response = await api.post("/contactus", obj);
    dispatch(setContactUsBusyMode(false));
    dispatch(_postContactUs(response.data));
    dispatch(setContactUsMessage({
      title: "Datos enviados correctamente",
      message: "Hemos Recibido tu mensaje",
      details: []
    }))
  } catch (error) {
    dispatch(setContactUsBusyMode(false));
    dispatch(
      setContactUsError(
        ErrorManager.CreateErrorInfoObject(error, [
          { code: error.code },
          { request: "POST: http://localhost:3001/contactus" },
        ])
      )
    );
  }
};

export const getAllContactUs = (obj) => async (dispatch) => {
  try {
    dispatch(setContactUsBusyMode(true));
    const response = await api.get("/contactus", obj);
    dispatch(setContactUsBusyMode(false));
    dispatch(_getAllContactUs(response.data));
  } catch (error) {
    dispatch(setContactUsBusyMode(false));
    dispatch(
      setContactUsError(
        ErrorManager.CreateErrorInfoObject(error, [
          { code: error.code },
          { request: "GET: http://localhost:3001/contactus" },
        ])
      )
    );
  }
};
