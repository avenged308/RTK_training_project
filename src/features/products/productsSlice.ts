import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products")
    if (!res.ok) {
      return new Error(`HTTP error : ${res.status}`)
    }
    return await res.json()
  },
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(p => p.id !== action.payload)
      //синхронный код в блоке reducers
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true
        state.error = null // сброс ошибки при новом запросе
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Ошибка загрузки продуктов"
      })
  },
})

export const { removeProduct } = productsSlice.actions
export default productsSlice