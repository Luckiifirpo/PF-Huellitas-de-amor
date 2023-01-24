import { configureStore } from '@reduxjs/toolkit'
import petsReducer from "../slices/petsSlice"
import adoptionsReducer from "../slices/adoptionSlice"
import errorsReducer from '../slices/errorsSlice'
import userReducer from '../slices/userSlice'

export const store = configureStore({
  reducer: {
    pets: petsReducer,
    adoptions: adoptionsReducer,
    users: userReducer,
    errors: errorsReducer
  },
})