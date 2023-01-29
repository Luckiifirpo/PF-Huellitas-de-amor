import { configureStore } from '@reduxjs/toolkit';
import petsReducer from "../slices/petsSlice";
import adoptionsReducer from "../slices/adoptionSlice";
import errorsReducer from '../slices/errorsSlice';
import userReducer from '../slices/userSlice';
import navigationReducer from '../slices/navigationSlice';
import messagesReducer from "../slices/messageInfoSlice";
import contactUsReducer from '../slices/contactUsSlice';
import aboutUsReducer from '../slices/aboutUsSlice';
import languageReducer from '../slices/languageSlice';

export const store = configureStore({
  reducer: {
    pets: petsReducer,
    aboutUs: aboutUsReducer,
    adoptions: adoptionsReducer,
    users: userReducer,
    errors: errorsReducer,
    messages: messagesReducer,
    navigation: navigationReducer,
    contactUs: contactUsReducer,
    lang: languageReducer
  },
})