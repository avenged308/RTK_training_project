import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { decrement, increment, incrementByAmount } from "./counter_newSlice"

export const Counter_new = () => {
  const value = useAppSelector(state => state.counter_new.value)
  //useAppSelector — это типизированная версия useSelector из react-redux.
  // → Получаем текущий счётчик из Redux.
  const dispatch = useAppDispatch()
  // → Берем типизированный dispatch
  return (
    <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px"}}>
      <h1>Счётчик: {value}</h1>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(incrementByAmount(0))}>-471</button>
      </div>
    </div>
  )
}
