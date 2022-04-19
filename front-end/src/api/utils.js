const GENERIC_ERROR_MESSAGE = 'There was a problem during the previous action'

export const ApiResponseHandler = async (response) => {
  if (response.status > 399 && response.status < 600) {
    // error
    const resp = await response.json()
    const errorObj = new Error((resp.errors || [])[0] || GENERIC_ERROR_MESSAGE)
    errorObj.data = resp.errors
    throw errorObj
  }

  return response.json()
}

export const getUserToken = () => {
  return localStorage.token.replace(/"/gi, '')
}