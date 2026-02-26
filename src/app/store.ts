import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { counterSlice } from "../features/counter/counterSlice"
import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
import { counter_newSlice } from "../features/Counter_new/counter_newSlice"
import usersSlice from "../features/users/usersSlice"
import weatherSlice from "../features/weather/weatherSlice"
import productsSlice from "../features/products/productsSlice"
import apodSlice from "../features/apod/apodSlice"
import { weatherApi_ } from "../features/weather_/weatherApi_" // ✅ добавь
import cartSlice from "../features/cart/cartSlice"

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.

const rootReducer = combineSlices(
  counterSlice,
  quotesApiSlice,
  counter_newSlice,
  usersSlice,
  weatherSlice,
  productsSlice,
  apodSlice,
  weatherApi_,
  cartSlice,
)

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.

    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(quotesApiSlice.middleware)

        .concat(weatherApi_.middleware),

    preloadedState,
  })

  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch)

  return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

// 🧠 Что вообще такое middleware в Redux?
// Middleware — это "перехватчик" действий (actions).
// Схема Redux без middleware:
// dispatch → reducer → новый state
// С middleware:
// dispatch → middleware → reducer → state
// Middleware может:
// делать async-запросы
// логировать
// отменять действия
// запускать побочные эффекты
// 🟦 Что делает middleware RTK Query?
// Когда ты пишешь:
// .concat(weatherApi_.middleware)
// ты подключаешь движок RTK Query.
// Без этого:
// ❌ не будет запросов
// ❌ не будет кеширования
// ❌ не будет refetch
// ❌ не будет polling
// ❌ не будет invalidateTags
// 🔥 Что происходит внутри
// Когда ты вызываешь:
// useGetWeatherQuery("Berlin")
// RTK Query делает примерно так:
// 1️⃣ dispatch action типа:
// weatherApi/executeQuery
// 2️⃣ middleware ловит этот action
// 3️⃣ middleware делает fetch
// 4️⃣ dispatch success или error
// 5️⃣ reducer сохраняет результат в state
