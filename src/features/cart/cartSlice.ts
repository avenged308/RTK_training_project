import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "../products/productsSlice"

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(p => p.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(p => p.id !== action.payload)
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(p => p.id === action.payload)

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter(p => p.id !== action.payload)
        }
      }
    },
  },
})

export const { addToCart, removeFromCart, decreaseQuantity } = cartSlice.actions
export default cartSlice