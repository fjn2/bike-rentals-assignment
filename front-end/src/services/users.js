import { getUsers, updateUser, createUserApi, deleteUserApi } from "../api/users"

export const getFirstPage = (filters) => {
  return getUsers(filters)
}

export const update = (user) => {
  return updateUser(user)
}

export const create = (user) => {
  return createUserApi(user)
}

export const remove = (userId) => {
  return deleteUserApi(userId)
}
