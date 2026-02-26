import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import styles from "./Products.module.css"
import { fetchProducts, removeProduct } from "./productsSlice"
import { addToCart } from "../cart/cartSlice"

export const Products = () => {
  const dispatch = useAppDispatch()
  const { items, error, loading } = useAppSelector(
    (state: RootState) => state.products,
  );
  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) return <p className={styles.status}></p>

  if (error)
    return (
      <p className={styles.status} style={{ color: "red" }}>
        {error}
      </p>
    )

  return (
    <div className={styles.grid}>
      {items.map(product => (
        <div key={product.id} className={styles.card}>
          <button
            className={styles.deleteBtn}
            onClick={() => dispatch(removeProduct(product.id))}
          >
            X
          </button>

          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
          />

          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.price}>${product.price}</p>
          <button
            className={styles.addBtn}
            onClick={() => dispatch(addToCart(product))}
          >
            Добавить в корзину
          </button>
        </div>
      ))}
    </div>
  )
}

export default Products;