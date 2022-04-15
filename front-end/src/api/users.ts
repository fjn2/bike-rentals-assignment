import { PaginatedObject, Rol, User, ApiOperation, OperationResult } from "./types"

export const getUsers = async () : Promise<PaginatedObject<User>> => {
  return new Promise((resolve) => {
    resolve({
      resp: [{
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