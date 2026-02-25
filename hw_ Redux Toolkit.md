Redux Toolkit – Weather (createSlice + createAsyncThunk)

📝 Block 1. Understanding Architecture
Task 1
Explain what responsibilities are handled in:
weatherSlice.ts
Weather.tsx
store.ts

weatherSlice.ts – Contains Redux logic: state structure, reducers, async logic (createAsyncThunk), and actions related to weather.
Weather.tsx – React UI component. It dispatches actions, reads state using selectors, and renders UI.
store.ts – Configures and creates the Redux store, combines reducers, and applies middleware.
weatherSlice.ts – Содержит логику Redux: состояние, редьюсеры, асинхронную логику и экшены.
Weather.tsx – UI-компонент React. Отправляет dispatch и отображает данные из store.
store.ts – Создаёт и настраивает Redux store, объединяет редьюсеры и подключает middleware.

Task 2
What is stored inside WeatherState and why is data allowed to be null?
WeatherState usually stores:
data (weather response)
loading status
error message
Data is allowed to be null because initially no request has been made, so there is no weather information yet.
В WeatherState обычно хранится:
данные погоды
статус загрузки
ошибка
data может быть null, потому что при первом рендере запрос ещё не выполнен и данных просто нет.

Task 3
What is createAsyncThunk used for in this project? Describe its role in one paragraph.
createAsyncThunk is used to handle asynchronous API requests. It automatically generates pending, fulfilled, and rejected actions and allows centralized async logic outside the component.
createAsyncThunk используется для выполнения асинхронного запроса к API. Он автоматически создаёт pending, fulfilled и rejected экшены и выносит async-логику из компонента.

✅ Block 2. Multiple Choice

Task 4
Which states are typically used in async requests in Redux?
A) pending
B) fulfilled
C) rejected

Task 5
What does dispatch(fetchWeather(city)) do?
B) Starts an async request and dispatches lifecycle actions
It triggers the async thunk and automatically dispatches pending, fulfilled, or rejected actions.
Он запускает thunk и автоматически отправляет pending, fulfilled или rejected.

🧩 Block 3. Slice and Reducers Logic

Task 6
In extraReducers, what happens in each case:
fetchWeather.pending
fetchWeather.fulfilled
fetchWeather.rejected
fetchWeather.pending → sets loading = true, clears error
fetchWeather.fulfilled → sets loading = false, saves data
fetchWeather.rejected → sets loading = false, saves error

Task 7
Why is state.error = action.payload ?? "Ошибка" used in rejected?
Because action.payload may be undefined. The nullish coalescing operator ensures that a default error message is set if no payload exists.
Потому что action.payload может быть undefined. Оператор ?? гарантирует, что будет установлено сообщение по умолчанию.

Task 8
What is the purpose of the selector:
export const selectWeather = (state: RootState) => state.weather;
Explain what it returns and why it is useful.
It returns the weather slice from the global Redux state. It simplifies access to state.weather and keeps components independent from store structure.
Он возвращает weather-часть глобального состояния. Упрощает доступ к state.weather и изолирует компонент от структуры store.

🛠 Block 4. Practical Thinking (No Big Refactor)

Task 9
Add a requirement (conceptually, no need to code fully):
When user searches the same city again, the app should NOT send a request if data is already loaded and there is no error.
Explain:
What information you would compare
Where you would implement this check (component or thunk) and why

I would compare:
The requested city
The city already stored in state
Whether there is an error
Best place: inside the thunk using getState().
Reason: business logic should live in Redux layer, not in UI.

Я бы сравнил:
город из нового запроса
город, уже сохранённый в состоянии
наличие ошибки
Проверку лучше делать в thunk через getState(), потому что бизнес-логика должна находиться в Redux, а не в UI.

⭐ Block 5. Challenge Question
Task 10
In weatherSlice.ts the API key is stored in code:
const apiKey = "..."

Why is this a bad practice?
Give at least 2 reasons and suggest 1 better approach.

Reasons:
Security risk — anyone can see the key in repository.
Hard to change across environments (dev, prod).
Better approach:
Use environment variables (.env file) and access it via import.meta.env or process.env.

Причины:
Риск безопасности — ключ видно в репозитории.
Нельзя гибко менять для разных окружений.
Лучший способ:
Использовать переменные окружения (.env) и получать ключ через import.meta.env или process.env.