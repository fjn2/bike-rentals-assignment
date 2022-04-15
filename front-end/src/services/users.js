import { getUsers, updateUser } from "../api/users"

export const getFirstPage = (filters) => {
  return getUsers(filters)
}

export const update = (user) => {
  return updateUser(user)
}
