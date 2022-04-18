import { getUsers, updateUser, createUserApi, deleteUserApi } from "../api/users"

export const getFirstPage = (filters, pagination) => {
  return getUsers(filters, pagination)
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
