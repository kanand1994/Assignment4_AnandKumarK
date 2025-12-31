import { configureStore } from '@reduxjs/toolkit'
import productReducer from './Slices/ProductSlice'
import cartReducer from './Slices/CartSlice'
import authReducer from './Slices/AuthSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
})
