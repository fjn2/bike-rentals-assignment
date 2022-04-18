import { useState, useEffect } from "react"
import { getFirstPage, update, create, remove } from "../services/users"
import { User, Metadata } from "../api/types"

const useUserListPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [meta, setMeta] = useState<Metadata>()

  const updateUser = (user: User) => {
    return update(user).then(() => {
      loadFirstPage()
    })
  }

  const createUser = (user: User) => {
    return create(user).then(() => {
      loadFirstPage()
    })
  }
  
  const deleteUser = (userId: string) => {
    return remove(userId).then(() => {
      loadFirstPage()
    })
  }

  const loadFirstPage = () => {
    getFirstPage().then(({ data, meta }) => {
      setUsers(data)
      setMeta(meta)
    })
  }

  useEffect(() => {
    loadFirstPage()
  }, [])

  return [{
    users,
    meta
  }, {
    updateUser,
    createUser,
    deleteUser
  }]
}

export default useUserListPage
