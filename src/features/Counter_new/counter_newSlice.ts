import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"

type CounterState = {
  value: number
}
const initialState: CounterState = {
  value: 0,
}

export const counter_newSlice = createSlice({
  name: "counter_new", // имя кусочка/срез состояния,
  // Redux Toolkit сам создаёт типы action на основе этого имени.
  initialState, //→ Подключаем начальное состояние.
  reducers: {
    //→ Раздел, где мы описываем функции, которые изменяют состояние.
    // Каждый reducer автоматически создаёт action.
    increment(state) {
      state.value += 1
    },
    decrement(state) {
      state.value -= 1
    },
    // → Пример reducer с параметром.
    // action.payload — это число, которое передаётся в action.
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload - 471
    },
  },
});

export const {increment, decrement, incrementByAmount} = counter_newSlice.actions;
// → Отсюда приходят готовые action creators, которые можно сразу диспатчить.
export default counter_newSlice.reducer;
// → Экспортируем reducer, чтобы подключить его в store.
// 1. counterSlice.ts
// 2. store.ts (подключаем reducer)
// 3. hooks.ts (если используем typed hooks)
// 4. Counter.tsx
// 5. App.tsx