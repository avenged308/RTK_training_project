import { JSX, useState } from "react"
import "./App.css"
import ApodRandomImg from "./features/apod/ApodRandomImg"
import Cart from "./features/cart/Cart"
import CartIcon from "./features/CartIcon/CartIcon"
import { Counter_new } from "./features/Counter_new/Counter_new"
import Products from "./features/products/Products"
import { UsersList } from "./features/users/UsersList"
import Weather from "./features/weather/Weather"

function App(): JSX.Element {
  const [showCart, setShowCart] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Учебный проект на React + TypeScript + Redux Toolkit</h1>
      </header>
      <Counter_new />
      <ApodRandomImg />
      <Products />
      <CartIcon onClick={() => setShowCart(prev => !prev)} />
      {showCart && <Cart />}
      <Weather />
      <UsersList />
    </div>
  )
}

export default App
