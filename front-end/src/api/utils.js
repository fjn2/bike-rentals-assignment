const GENERIC_ERROR_MESSAGE = 'There was a problem during the previous action'

export const ApiResponseHandler = async (response) => {
  if (response.status > 399 && response.status < 600) {
    // error
    const errorObj = new Error(response.message || GENERIC_ERROR_MESSAGE)
    const resp = await response.json()
    errorObj.data = resp.errors
    throw errorObj
  }

  return response.json()
}

export const getUserToken = () => {
  return localStorage.token.replace(/"/gi, '')
}