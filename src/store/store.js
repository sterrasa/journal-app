import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authSlice } from './auth'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  }, 
})

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})