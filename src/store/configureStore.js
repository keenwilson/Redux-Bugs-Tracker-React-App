import { configureStore } from '@reduxjs/toolkit'
import reducer from './bugs'

// High order function, take function as an argument

// Export function to create a store
export default function configureAppStore() {
    return configureStore({reducer}) 
}