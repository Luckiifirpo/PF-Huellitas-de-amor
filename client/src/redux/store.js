import { configureStore } from '@reduxjs/toolkit'
import pageReducer from "./pageSlice.js"

export const store = configureStore({
  reducer: {
    page:pageReducer
  },
})