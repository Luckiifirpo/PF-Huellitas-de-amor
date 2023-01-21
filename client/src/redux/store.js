import { configureStore } from '@reduxjs/toolkit'
import users from './userReducer'
import animals from './animalsReducer'

export const store = configureStore({
  reducer: {
    users,
    animals,
  },
})