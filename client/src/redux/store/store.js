import { configureStore } from '@reduxjs/toolkit'
import petsReducer from "../slices/petsSlice"
import adoptionsReducer from "../slices/adoptionSlice"
import userReducers from '../slices/userSlice'

export const store = configureStore({
  reducer: {
    pets: petsReducer,
    adoptions: adoptionsReducer,
    users: userReducers
  },
})