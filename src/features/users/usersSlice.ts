import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"

export type User = {
  id: number
  email: string
  username: string
  name: {
    firstname: string
    lastname: string
  }
  phone: string
  address: {
    city: string
    street: string
    number: number
    zipcode: string
  }
}

type UsersState = {
  list: User[]
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://fakestoreapi.com/users")
    if (!res.ok) {
      return rejectWithValue(`Ошибка сервера: ${String(res.status)}`)
    }
    const data = (await res.json()) as User[]
    return data
  } catch (err) {
    return rejectWithValue("Ошибка сети: " + (err as Error).message)
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true
        state.error = null // сброс ошибки при новом запросе
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? "Неизвестная ошибка"
      })
  },
})

export const selectUsers = (state: RootState) => state.users.list
export const selectLoading = (state: RootState) => state.users.loading
export const selectError = (state: RootState) => state.users.error

export default usersSlice
