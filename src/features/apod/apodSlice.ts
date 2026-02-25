import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ApodItem } from "./apodTypes"

const API_KEY = "QqmbSG8GPpG2HZorpyjrq2OoGpPq7jnm9B5qwFY6"

interface ApodState {
  items: ApodItem[]
  loading: boolean
  error: string | null
}

const initialState: ApodState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchApod = createAsyncThunk<ApodItem[]>(
  "apod/fetchApod",
  async () => {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=3`,
    )
    if (!res.ok) {
      return new Error(`HTTP error : ${res.status}`)
    }
    return await res.json()
  },
)

const apodSlice = createSlice({
  name: "apod",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchApod.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchApod.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchApod.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Ошибка загрузки данных APOD"
      })
  },
})

export default apodSlice
