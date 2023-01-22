import { configureStore } from '@reduxjs/toolkit'
// import pageReducer from "./pageSlice.js"
import users from './userReducer'
import pets from './petReducer'
export const store = configureStore({
  reducer: {
    users,
    pets,
  },
})