import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  fetchUsers,
  selectError,
  selectLoading,
  selectUsers,
} from "./usersSlice"
import styles from "./UsersList.module.css"

export const UsersList = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (loading) return <p className={styles.loading}> Загрузка...</p>
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.grid}>
      {users.map((user: { id: Key | null | undefined; name: { firstname: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; lastname: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; username: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; phone: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; address: { street: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; number: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; zipcode: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined } }) => (
        <div key={user.id} className={styles.card}>
          <h2 className={styles.name}>
            {user.name.firstname} {user.name.lastname}
          </h2>
          <p className={styles.field}>
            <span>Email:</span>
            {user.email}
          </p>
          <p className={styles.field}>
            <span>Username:</span>
            {user.username}
          </p>
          <p className={styles.field}>
            <span>Phone:</span>
            {user.phone}
          </p>
          <p className={styles.field}>
            <span>Address:</span>
            {user.address.street}, {user.address.number}
          </p>
          <p>ZIP:{user.address.zipcode}</p>
        </div>
      ))}
    </div>
  )
}
