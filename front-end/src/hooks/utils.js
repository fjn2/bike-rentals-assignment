export const ApplicationErrorHandling = (errorObj) => {
  // Redirect to login if there is a 401
  if (errorObj.message === "Access not allowed") {
    window.location.hash = '/login'
    return
  }

  throw errorObj
}