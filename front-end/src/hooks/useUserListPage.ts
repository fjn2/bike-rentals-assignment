import { useState, useEffect } from "react"
import { getFirstPage, update } from "../services/users"
import { User, Metadata } from "../api/types"

const useUserListPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [meta, setMeta] = useState<Metadata>()

  const updateUser = (user: User) => {
    return update(user)
  }

  useEffect(() => {
    getFirstPage().then(({ data, meta }) => {
      setUsers(data)
      setMeta(meta)
    })
  }, [])

  return [{
    users,
    meta
  }, {
    updateUser
  }]
}

export default useUserListPage
