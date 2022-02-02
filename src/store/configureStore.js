import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import api from './middleware/api'
import toast from './middleware/toast'

// High order function, take function as an argument

// Export function to create a store
export default function configureAppStore() {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), toast, api]
  })
}
