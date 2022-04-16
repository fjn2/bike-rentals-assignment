import { PaginatedObject, Rol, User, ApiOperation, OperationResult } from "./types"
import { ApiResponseHandler } from "./utils"

const URL = `${process.env.REACT_APP_BACKEND_URL}/users`

export const getUsers = async () : Promise<PaginatedObject<User>> => {
  return new Promise((resolve) => {
    resolve({
      data: [{
        id: '1',
        username: 'pepelin',
        rol: Rol.MANAGER
      }, {
        id: '2',
        username: 'pepelin',
        rol: Rol.MANAGER
      }],
      meta: {
        total: 1,
        offset: 0
      }
    })
  }) 
}

export const updateUser = async (user: User) : Promise<ApiOperation> => {
  console.log('Updating with', user)
  return new Promise((resolve) => {
    resolve({
      result: OperationResult.SUCESS,
      messages:[]
    })
  }) 
}

export const login = async ({
  username,
  password
}: { username: string, password: string }) : Promise<any> => {
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

export const logout = async (token: string) : Promise<any> => {
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