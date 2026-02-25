import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

import { WeatherResponse } from "./types/types"
import { RootState } from "../../app/store"

// Это форма куска состояния (state) для погоды в Redux:
interface WeatherState {
  // data: либо данные о погоде, либо null, если ещё ничего не запросили/сбросили
  data: WeatherResponse | null

  // loading: показывает, что запрос в процессе
  loading: boolean

  // error: строка с ошибкой или null, если ошибок нет
  error: string | null
}

// Начальное состояние стора по погоде
const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
}

// API key для OpenWeather
// (в реальных проектах лучше прятать в env, а не держать в коде)
const apiKey = "b05523bc07d6045b08596830798efda0"

// createAsyncThunk — это фабрика асинхронных экшенов.
// Она автоматически создаёт 3 экшена:
// 1) fetchWeather.pending   — запрос начался
// 2) fetchWeather.fulfilled — запрос успешно завершился, есть данные
// 3) fetchWeather.rejected  — запрос упал с ошибкой
export const fetchWeather = createAsyncThunk<
  WeatherResponse, // тип данных при успехе (action.payload в fulfilled)
  string, // тип аргумента: city
  { rejectValue: string } // тип payload при ошибке (rejected)
>("weather/fetchWeather", async (city, { rejectWithValue }) => {
  try {
    // Собираем URL запроса
    // q=city — город
    // appid=apiKey — ключ
    // units=metric — градусы в °C
    // lang=ru — описание погоды на русском
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`

    // Делаем запрос
    // axios.get<WeatherResponse> говорит TS: "в ответе ожидаю WeatherResponse"
    const response = await axios.get<WeatherResponse>(url)

    // Возвращаем данные — это станет action.payload в fulfilled
    return response.data
  } catch {
    // Если ошибка (город не найден/нет сети/и т.д.)
    // возвращаем "управляемую" ошибку через rejectWithValue
    // это попадёт в action.payload в rejected
    return rejectWithValue("Город не найден")
  }
})

// createSlice — создаёт reducers + actions + reducer под капотом.
// reducers тут пустые, потому что всё управление идёт через extraReducers (thunk lifecycle)
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  // extraReducers — реакции на экшены, созданные где-то снаружи (в нашем случае thunk)
  extraReducers: builder => {
    builder
      // pending: запрос стартовал
      .addCase(fetchWeather.pending, state => {
        state.loading = true // включаем загрузку
        state.error = null // чистим ошибку
        state.data = null // сбрасываем прошлые данные (по твоей логике)
      })

      // fulfilled: запрос успешно вернул данные
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false // выключаем загрузку
        state.data = action.payload // сохраняем данные о погоде
      })

      // rejected: запрос упал
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false // выключаем загрузку

        // action.payload может быть undefined (например если ошибка не через rejectWithValue)
        // поэтому подстраховка: если payload пустой → ставим "Ошибка"
        state.error = action.payload ?? "Ошибка"
      })
  },
})

// Селектор — функция, которая достаёт нужный кусок state.
// В компоненте useAppSelector(selectWeather) вернёт WeatherState
export const selectWeather = (state: RootState) => state.weather

// Экспортируем reducer (ВАЖНО: именно reducer, а не весь slice)
// Обычно делают: export default weatherSlice.reducer
// Если экспортировать weatherSlice целиком — store его не примет как reducer.
export default weatherSlice
