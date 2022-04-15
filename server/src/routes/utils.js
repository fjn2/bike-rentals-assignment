const apiResponseSucess = ({
  data,
  errors,
  meta,
  status
}) => {
  return {
    data,
    errors,
    meta,
    status
  }
}

const apiResponseError = ({
  errors,
  status
}) => {
  return {
    errors,
    status
  }
}

module.exports = {
  apiResponseSucess,
  apiResponseError
}