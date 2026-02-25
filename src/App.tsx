import "./App.css"
import ApodRandomImg from "./features/apod/ApodRandomImg"
import { Counter_new } from "./features/Counter_new/Counter_new"
import Products from "./features/products/Products"
import { UsersList } from "./features/users/UsersList"
import Weather from "./features/weather/Weather"

export const App = () => (
  <div className="App">
    <header className="App-header">
      <h1>Учебный проект на React + TypeScript + Redux Toolkit</h1>
    </header>
    <Counter_new />
    <ApodRandomImg />
    <Products />
    <Weather />
    <UsersList />
  </div>
)
