// Описываем структуру данных, которые придут от OpenWeather.
// TypeScript будет проверять, что мы обращаемся к полям правильно.
export interface WeatherResponse {
  // Название города
  name: string

  // Блок "sys" — системная инфа
  sys: {
    // Код страны (например "DE")
    country: string
  }

  // Блок "main" — основные параметры погоды
  main: {
    // Температура (у тебя units=metric, значит °C)
    temp: number
    // Влажность в %
    humidity: number
  }

  // Массив погодных описаний (обычно нас интересует первый элемент)
  weather: {
    // Текстовое описание (у тебя lang=ru, значит по-русски)
    description: string
  }[]

  // Ветер
  wind: {
    // Скорость ветра (м/с у OpenWeather)
    speed: number
  }
}
