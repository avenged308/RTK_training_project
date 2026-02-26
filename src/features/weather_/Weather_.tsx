import { useState, useEffect } from "react";

import { useGetWeatherQuery } from "./weatherApi_";

import styles from "./Weather_.module.css";


const Weather = () => {


  // Берём город из localStorage при первом рендере

  const [city, setCity] = useState(() => {

    return localStorage.getItem("city") ?? "";

  });


  // Сохраняем город при каждом изменении

  useEffect(() => {

    localStorage.setItem("city", city);

  }, [city]);



  const {

    data,

    error,

    isFetching,

    refetch,

  } = useGetWeatherQuery(city, {

    skip: !city, // не отправляем запрос пока нет города

  });


// | Поведение | Что писать |

// | --------------------------------- | -------------------------- |

// | Авто-запрос при изменении city | `skip: false` |

// | Запрос только по кнопке | `skip: true` + `refetch()` |

// | Запрос только если city не пустой | `skip: !city` |



// const { data, error, isFetching, refetch } =

// Делаем деструктуризацию результата работы хука.


// useGetWeatherQuery(city, {

// Вызываем запрос с аргументом city.

// Второй аргумент — объект настроек.


// skip: !city,

// Если city пустая строка → !city === true → запрос не выполняется.

// То есть, пока пользователь ничего не ввёл, запрос не уйдёт.


// });

// Закрываем вызов хука.


// В итоге у нас есть:


// data — результат запроса (ответ от API)


// error — ошибка, если запрос не удался


// isFetching — флаг загрузки


// refetch — функция, чтобы можно было вручную перезапустить запрос



  const handleSearch = () => {

    if (!city.trim()) {

      alert("Введите город");

      return;

    }

    refetch(); // вручную запускаем запрос

  };


// const handleSearch = () => {

// Обработчик клика по кнопке "Получить погоду".


// if (!city) {

// Если город не введён…


// alert("Введите город");

// Показываем пользователю предупреждение.


// return;

// Прерываем выполнение функции.


// }

// Конец проверки.


// refetch();

// Если город введён — вручную запускаем запрос.

// Хотя хук уже «подписан» на city, мы используем refetch,

// чтобы показать явный вызов.


// };

// Конец функции handleSearch.


  return (

    <div className={styles.container}>

      <div className={styles.card}>

        <h1 className={styles.title}>Прогноз погоды (RTK Query)</h1>


        <input

          type="text"

          placeholder="Введите город"

          value={city}

          className={styles.input}

          onChange={(e) => setCity(e.target.value)}

        />


        <button className={styles.button} onClick={handleSearch}>

          Получить погоду

        </button>


        {isFetching && <p>Загрузка...</p>}

        {error && <p>Ошибка: город не найден</p>}


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

  );

};


export default Weather;