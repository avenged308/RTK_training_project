import { useState } from "react"
import styles from "./Weather.module.css"

// useAppDispatch/useAppSelector — твои типизированные обёртки над useDispatch/useSelector
import { useAppDispatch, useAppSelector } from "../../app/hooks"

// thunk и селектор
import { fetchWeather, selectWeather } from "./weatherSlice"

const Weather = () => {
  // Локальный state компонента — просто текст в инпуте (город)
  // Это НЕ Redux, потому что это мелочь, которая нужна только здесь.
  const [city, setCity] = useState<string>("")

  // dispatch — чтобы отправлять экшены в Redux
  const dispatch = useAppDispatch()

  // Берём данные из Redux:
  // data — погода
  // loading — идёт запрос или нет
  // error — есть ошибка или нет
  const { data, loading, error } = useAppSelector(selectWeather)

  // Нажали кнопку "Получить погоду"
  const handleSearch = () => {
    // Валидация: если пусто — не стреляем запросом
    if (!city) {
      alert("Введите город")
      return
    }

    // Запускаем thunk:
    // Redux сам разрулит pending/fulfilled/rejected
    dispatch(fetchWeather(city))
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Прогноз погоды</h1>

        <input
          type="text"
          placeholder="Введите город"
          value={city} // показываем текущее значение state
          className={styles.input}
          onChange={e => setCity(e.target.value)} // обновляем локальный state при вводе
        />

        <button className={styles.button} onClick={handleSearch}>
          Получить погоду
        </button>

        {/* Если loading=true — показываем загрузку */}
        {loading && <p className={styles.loading}>Загрузка...</p>}

        {/* Если есть error — показываем ошибку */}
        {error && <p className={styles.error}>Ошибка: {error}</p>}

        {/* Если есть data — рисуем блок погоды */}
        {data && (
          <div className={styles.weatherBox}>
            <h2>
              {data.name}, {data.sys.country}
            </h2>
            <p>Температура: {data.main.temp}°C</p>
            <p>Погода: {data.weather[0].description}</p>
            <p>Влажность: {data.main.humidity}%</p>
            <p>Ветер: {data.wind.speed} м/с</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Weather
