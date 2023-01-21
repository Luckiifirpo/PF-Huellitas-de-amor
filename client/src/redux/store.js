import { configureStore } from '@reduxjs/toolkit'
import pageReducer from "./pageSlice.js"
import users from './userReducer'
export const store = configureStore({
  reducer: {
    users,
  },
})