import { PaginatedObject, User, ApiOperation } from "./types"
import { ApiResponseHandler, getUserToken } from "./utils"
import qs from 'qs'

const URL = `${process.env.REACT_APP_BACKEND_URL}/users`

// @ts-ignore
export const getUsers = async (filters, pagination = { count: 1000 }) : Promise<PaginatedObject<User>> => {
  return fetch(`${URL}?${qs.stringify({ ...filters, ...pagination })}`, {
    headers: {
      authentication: getUserToken(),
    }
  })
    .then(ApiResponseHandler)
}

export const updateUser = async (user: User) => {
  return fetch(`${URL}`, {
    method: 'PUT',
    headers: {
      authentication: getUserToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
}

export const createUserApi = async (user: User) => {
  return fetch(`${URL}`, {
    method: 'POST',
    headers: {
      authentication: getUserToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
}

export const deleteUserApi = async (userId : string) => {
  return fetch(`${URL}/${userId}`, {
    method: 'DELETE',
    headers: {
      authentication: getUserToken()
    }
  })
}

export const login = async ({
  username,
  password
}: { username: string, password: string }) : Promise<ApiOperation> => {
  return fetch(`${URL}/login?`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(ApiResponseHandler)
}

export const logout = async (token: string) : Promise<ApiOperation> => {
  return fetch(`${URL}/logout?`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token
    })
  })
  .then(ApiResponseHandler)
}

export const register = async (username : string) : Promise<ApiOperation> => {
  return fetch(`${URL}/register?`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username
    })
  })
  .then(ApiResponseHandler)
}