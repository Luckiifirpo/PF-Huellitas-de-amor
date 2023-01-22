import { configureStore } from '@reduxjs/toolkit'
import users from './userReducer'
export const store = configureStore({
  reducer: {
    users,
  },
})