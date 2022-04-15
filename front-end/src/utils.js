export const debounce = (fn, delay) => {
  let timeoutId
  return function _debounce(...args) {
    clearInterval(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}