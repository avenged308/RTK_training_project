import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { AppDispatch, RootState } from "../../app/store"
import { fetchApod } from "./apodSlice"
import styles from "./ApodRandomImg.module.css"
import ImageModalWindow from "./ImageModalWindow"
import { useDispatch } from "react-redux"

export const ApodRandomImg = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, error, loading } = useAppSelector(
    (state: RootState) => state.apod,
  )

  const [modalImage, setModalImage] = useState<string | null>(null)
  const [modalTitle, setModaltitle] = useState<string>("")

  useEffect(() => {
    dispatch(fetchApod())
  }, [dispatch])

  if (loading) return <h2 className={styles.status}>Загрузка...</h2>
  if (error) return <h3 className={styles.status}>{error}</h3>

  const openModal = (url: string, title: string) => {
    setModalImage(url)
    setModaltitle(title)
  }

  const closeModal = () => setModalImage(null)

  return (
    <>
      {modalImage && (
        <ImageModalWindow
          url={modalImage}
          title={modalTitle}
          onClose={closeModal}
        />
      )}

      <h1 className={styles.apodTitle}>NASA APOD Gallery</h1>
      <div className={styles.grid}>
        {items.map(item => {
          // Используем HD-качество, если доступно
          const imageUrl = item.hdurl ?? item.url
          return (
            <div
              key={item.date}
              className={styles.card}
              onClick={() => openModal(imageUrl, item.title)}
              onMouseEnter={e =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img src={imageUrl} alt={item.title} className={styles.img} />

              <h3 className={styles.imgTitle}>{item.title}</h3>

              <p className={styles.date}>{item.date}</p>
            </div>
          )
        })}
      </div>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Oleksii Shapovalov. All rights reserved.
      </footer>
    </>
  )
}

export default ApodRandomImg
